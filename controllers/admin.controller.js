import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Visitor from "../models/visitor.model.js";
import fs, { stat } from "fs";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import RegisteredStudent from "../models/registerd.student.model.js";
import {
  sendEmailWithCode,
  sendEmailWithLogin,
} from "../services/emailService.js";
import Resource from "../models/resource.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newAdmin = new Admin({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    res.status(201).json({ message: "SignUp successful" }); // HTTP status code for successful code for created
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
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return next(errorHandler(404, "User not found")); // HTTP status code for Not Found
    }

    const validPassword = await bcryptjs.compare(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials")); // HTTP status code for Bad Request
    }

    const token = jwt.sign(
      {
        id: validAdmin._id,
        isAdmin: validAdmin.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validAdmin._doc;

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

export const anylytics = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }
    const Total_Visitors = await Visitor.find();
    const Total_Applicants = await Student.find();
    const admin = await Admin.findById(req.user.id);
    // Example aggregation pipeline
    const finishedApplicants = await RegisteredStudent.find().populate(
      "student"
    );
    // const finishedApplicants = await RegisteredStudent.aggregate([
    //     { $match: { "enrolled": true } }, // Match only enrolled students
    //     {
    //         $lookup: {
    //             from: "students", // Assuming "students" is the name of the collection for students
    //             localField: "student",
    //             foreignField: "_id",
    //             as: "studentInfo" // You can change this to any name you prefer
    //         }
    //     },
    //     { $unwind: "$studentInfo" }, // Unwind the studentInfo array
    //     {
    //         $project: {
    //             email: 1,
    //             enrolled: 1,
    //             "studentInfo.details.firstName": 1, // Add specific fields from the studentInfo
    //             "studentInfo.details.email": 1,
    //             "studentInfo.details.phone": 1,
    //             // Add more fields as needed
    //             createdAt: 1,
    //             updatedAt: 1
    //         }
    //     }
    // ]);

    // Student.aggregate([
    //     // Match documents where donePersonal is true
    //     { $match: { "details.donePersonal": true } },
    //     // Other pipeline stages...
    // ]).then((result) => {
    //     res.status(200).json(`totalResult: ${result.length}`)
    // }).catch((err) => {
    //     console.log(err);
    // });
    res.status(200).json([
      { Prospect_Views: admin.prospectus.views },
      { Total_Visitors: Total_Visitors.length, list: Total_Visitors },
      { Total_Applicants: Total_Applicants.length, list: Total_Applicants },
      {
        Finished_Applicants: finishedApplicants.length,
        list: finishedApplicants,
      },
    ]);
  } catch (error) {
    next(error);
  }
};

export const demography = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }
    const maleStudents = await Student.find({ "details.gender": "Male" });
    const maleStudentCount = maleStudents.length;

    const femaleStudents = await Student.find({ "details.gender": "Female" });
    const femaleStudentsCount = femaleStudents.length;

    const only10Passed = await Student.aggregate([
      {
        $match: {
          "details.percentage10": { $exists: true, $ne: "" },
          "details.percentage12": { $exists: true, $eq: "" },
          "details.graduationPercentage": { $exists: true, $eq: "" },
        },
      },
    ]);
    const till12Passed = await Student.aggregate([
      {
        $match: {
          "details.percentage10": { $exists: true, $ne: "" },
          "details.percentage12": { $exists: true, $ne: "" },
          "details.graduationPercentage": { $exists: true, $eq: "" },
        },
      },
    ]);
    let graduate = await Student.aggregate([
      {
        $match: {
          "details.percentage10": { $exists: true, $ne: "" },
          "details.percentage12": { $exists: true, $ne: "" },
          "details.graduationPercentage": { $exists: true, $ne: "" },
        },
      },
    ]);

    res
      .status(200)
      .json([
        { Only_10_Passed: only10Passed.length, list: only10Passed },
        { Till_12_Passed: till12Passed.length, list: till12Passed },
        { Graduate: graduate.length, list: graduate },
        { Male: maleStudentCount },
        { Female: femaleStudentsCount },
      ]);
  } catch (error) {
    next(error);
  }
};

export const documentUpload = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const image = req.files.image; // Assuming there is only one file
    const eventId = req.body.eventId;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: "IPM",
      quality: 50,
      resource_type: "auto",
    });

    const imageLink = result.secure_url;

    fs.unlinkSync(image.tempFilePath);
    let updatedAdmin = null;
    if (eventId === "prospectus") {
      updatedAdmin = await Admin.findByIdAndUpdate(
        req.user.id,
        { $set: { "prospectus.link": imageLink } },
        { new: true }
      );
    }
    if (eventId === "meritList") {
      updatedAdmin = await Admin.findByIdAndUpdate(
        req.user.id,
        { $push: { meritList: imageLink } },
        { new: true }
      );
    }
    if (eventId === "resource") {
      const { title } = req.body;
      const newResource = await Resource.create({
        title: title,
        pdfLink: imageLink,
      });
      updatedAdmin = await Admin.findByIdAndUpdate(
        req.user.id,
        { $push: { resources: newResource } },
        { new: true }
      );
    }
    const { password, ...rest } = updatedAdmin._doc;
    return res.status(200).json({ ...rest, message: "Document uploaded" });
  } catch (error) {
    next(error);
  }
};

export const incProspectusViews = async (req, res, next) => {
  try {
    const adminId = process.env.ADMIN_DOC_ID;
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: adminId },
      { $inc: { "prospectus.views": 1 } }
    );
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const admitStudent = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can admit students." });
    }

    const { studentId } = req.params;
    const student = await findStudentById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Not Found: Student does not exist." });
    }

    const { email, phone } = student.details;
    const isRegistered = await isStudentRegistered(email);

    if (isRegistered) {
      return res.status(200).json({ message: "Student already enrolled" });
    }

    const encryptedPhone = await encryptPhone(phone);
    await enrollStudent(email, encryptedPhone, studentId);
    await sendEnrollmentEmail(email, phone);

    return res.status(200).json({ message: "Student enrolled" });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.deleteOne({ _id: id });
    if (deleteStudent) {
      return res.status(200).json({ message: "Student Deleted" });
    } else {
      return res.status(400).json({ message: "Sudent deletion failure" });
    }
  } catch (error) {
    next(error);
  }
};

export const meritList = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can make a merit list" });
    }

    const { id } = req.params;
    const student = await findStudentById(id);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Not Found: Student does not exist." });
    }
    const aCode = generateRandomString(10);
    await sendCode(student.details.email, aCode, id);
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          worthy: true,
          "details.donePayment": false,
          "details.paymentSS": "",
          code: aCode,
          listNumber: 2,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "ok", student: updatedStudent });
  } catch (error) {
    next(error);
  }
};

const findStudentById = async (studentId) => {
  return await Student.findById(studentId);
};

const isStudentRegistered = async (email) => {
  return await RegisteredStudent.findOne({ email });
};

const encryptPhone = async (phone) => {
  return await bcryptjs.hash(phone, 10);
};

const enrollStudent = async (email, encryptedPhone, studentId) => {
  await RegisteredStudent.create({
    email,
    password: encryptedPhone,
    enrolled: true,
    student: studentId,
  });

  await Student.findByIdAndUpdate(studentId, {
    $set: { "details.enrolled": true },
  });
};

const sendEnrollmentEmail = async (email, phone) => {
  const emailSent = await sendEmailWithLogin({ email, phone });
  if (!emailSent) {
    throw new Error("Failed to send email with login details");
  }
};

const sendCode = async (email, code, id) => {
  const emailSent = await sendEmailWithCode(email, code, id);
  if (!emailSent) {
    throw new Error("Failed to send email with code details");
  }
};

function generateRandomString(length = 10) {
  const charset = "ABIJKLNOPQRSTUVWYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
