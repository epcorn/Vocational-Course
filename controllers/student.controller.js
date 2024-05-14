import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";
import RegisteredStudent from "../models/registerd.student.model.js";
import {
  sendEmailForRegistration,
  sendEmailWithOtp,
} from "../services/emailService.js";
import Payment from "../models/payment.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const studentRegister = async (req, res, next) => {
  try {
    const { form } = req.body;
    const { access_token } = req.cookies;
    if (!access_token) {
      const newStudent = await Student.create({ details: form });
      const token = generateAuthToken(newStudent._id);
      setAccessTokenCookie(res, token);
      res.status(201).json({ message: "Student created", student: newStudent });
    } else {
      const token = access_token;
      const studentId = verifyAuthToken(token);

      if (form.paymentSS !== "") {
        try {
          await sendEmailForRegistration(
            form.email,
            form.firstName,
            form.lastName,
            form.phone
          );
        } catch (error) {
          // Handle email sending error
          console.error("Error sending email:", error);
        }
      }
      const updatedStudent = await updateStudentDetails(studentId, form);

      if (!updatedStudent) {
        res.clearCookie("access_token");
        return res
          .status(404)
          .json({ message: "Registration failed, please try again" });
      }

      res.status(200).json({
        message: "Student details updated successfully",
        student: updatedStudent,
      });
    }
  } catch (error) {
    // General error handling
    console.error("Error in studentRegister:", error);
    next(error);
  }
};

export const finalRegister = async (req, res, next) => {
  try {
    const { form } = req.body;
    const { access_token } = req.cookies;
    if (!access_token) {
      const newStudent = await Student.create({ details: form });
      const token = generateAuthToken(newStudent._id);
      setAccessTokenCookie(res, token);
      res.status(201).json({ message: "Student created", student: newStudent });
    } else {
      const token = access_token;
      const studentId = verifyAuthToken(token);

      const updatedStudent = await updateStudentDetails(studentId, form);

      if (!updatedStudent) {
        res.clearCookie("access_token");
        return res
          .status(404)
          .json({ message: "Registration failed, please try again" });
      }
      await sendEmailForRegistration(
        form.email,
        form.firstName,
        form.lastName,
        form.phone
      );

      res.status(200).json({
        message: "Student details updated successfully",
        student: updatedStudent,
      });
    }
  } catch (error) {
    // General error handling
    console.error("Error in studentRegister:", error);
    next(error);
  }
};

export const getStud = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ourStudent = await Student.findOne({ _id: id });
    res.status(200).json({ message: "ok", data: ourStudent });
  } catch (error) {
    next(error);
  }
};
export const paymentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ourStudent = await Student.findOne({ _id: id });
    if (!ourStudent) {
      return res
        .status(404)
        .json({ message: "Not Found: Student does not exist." });
    }
    const { accountName, bankName, paymentType, utr } = req.body;
    let fileLink = null;
    if (req.files && req.files.file) {
      fileLink = await uploadSingleFile(req.files.file);
    }
    const payment = await Payment.create({
      accountName,
      bankName,
      paymentType,
      utr,
      file: fileLink ? fileLink : "",
      studentId: id,
    });
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          "details.donePayment": true,
          "details.paymentSS": fileLink ? fileLink : "",
        },
      },
      { new: true }
    );
    console.log(updatedStudent);
    res
      .status(200)
      .json({ message: "Your payment details has been registered!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
  }

  try {
    const validStudent = await RegisteredStudent.findOne({ email });
    if (!validStudent) {
      return next(errorHandler(404, "User not found")); // HTTP status code for Not Found
    }

    const validPassword = await bcryptjs.compare(
      password,
      validStudent.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials")); // HTTP status code for Bad Request
    }

    const token = jwt.sign(
      {
        id: validStudent._id,
        email: validStudent.email,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validStudent._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User have been signed out");
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  if (
    !email ||
    !newPassword ||
    !password ||
    email === "" ||
    password === "" ||
    newPassword === ""
  ) {
    return next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
  }
  try {
    const isRegistered = await RegisteredStudent.findOne({
      email: { $eq: email },
    });
    if (!isRegistered) {
      return res.status(404).json({ message: "Student not exist" });
    }
    const validPassword = await bcryptjs.compare(
      password,
      isRegistered.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials")); // HTTP status code for Bad Request
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    const updated = await RegisteredStudent.findOneAndUpdate(
      { email: email },
      { $set: { "passwordReset.otpSend": otp } },
      { new: true }
    );

    const respond = await sendEmailWithOtp(email, otp);
    res.status(200).json({ message: "Check email for otp ", respond });
  } catch (error) {
    next(error);
  }
};
export const verifyOtp = async (req, res, next) => {
  const { otp, email, newPassword } = req.body;
  if (
    !email ||
    !newPassword ||
    !otp ||
    email === "" ||
    newPassword === "" ||
    otp === ""
  ) {
    return next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
  }
  try {
    const registeredStudent = await RegisteredStudent.findOne({
      email: { $eq: email },
    });
    if (!registeredStudent) {
      return res.status(404).json({ message: "Student not exist" });
    }
    if (otp != registeredStudent.passwordReset.otpSend) {
      return res.status(404).json({ message: "Wrong otp" });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const updated = await RegisteredStudent.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "passwordReset.otpSend": Infinity,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Password changed", updated });
  } catch (error) {
    next(error);
  }
};

const generateAuthToken = (studentId) => {
  return jwt.sign({ id: studentId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const setAccessTokenCookie = (res, token) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);
  res.cookie("access_token", token, { httpOnly: true });
};

const verifyAuthToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    errorHandler(401, "Unauthorized");
  }
};

const updateStudentDetails = async (studentId, form) => {
  const stud = await Student.findById(studentId);

  if (!stud) {
    return null;
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    { details: form },
    { new: true, runValidators: true }
  );

  return updatedStudent;
};

const uploadSingleFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: "IPM",
      quality: 50,
      resource_type: "auto",
    });

    fs.unlinkSync(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
