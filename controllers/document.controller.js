import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Student from "../models/student.model.js";
import { sendEmailWithAttachment } from "../services/emailService.js";
import { generateExcelFile } from "../utils/excelUtils.js";
import Admin from "../models/admin.model.js";
import Visitor from "../models/visitor.model.js";

const uploadDocument = async (req, res, next) => {
  try {
    const imageLinks = [];
    if (req.files) {
      let images = [];
      if (req.files.images.length > 0) images = req.files.images;
      else images.push(req.files.images);

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(
          images[i].tempFilePath,
          {
            use_filename: true,
            folder: "IPM",
            quality: 50,
            resource_type: "auto",
          }
        );
        imageLinks.push(result.secure_url);
        fs.unlinkSync(images[i].tempFilePath);
      }
    }
    return res.status(200).json({ imageLinks });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const generateFile = async (req, res, next) => {
  try {
    const donePaymests = await Student.find({ "details.donePayment": true });
    console.log(donePaymests);
    const uniqueEmailIdStudents = await getAllStudents();
    const studentDoneTillUpload = uniqueEmailIdStudents.filter(
      (stud) => stud.details.doneUpload
    );
    const visitors = await Visitor.find();
    const filePath = await generateExcelFile(
      uniqueEmailIdStudents,
      studentDoneTillUpload,
      visitors
    );
    const result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      folder: "IPM",
      quality: 50,
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);
    const status = await sendEmailWithAttachment(result.secure_url);
    if (status) {
      return res.status(200).json({ msg: "File Generated" });
    } else {
      return res.json({ msg: "file generation failed" });
    }
  } catch (error) {
    next(error);
  }
};

const getLinks = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    const { meritList, prospectus, resources } = admin[0];
    const latestMeritList = await Student.find({ worthy: true }).limit(10);
    res.status(200).json({ meritList: latestMeritList, prospectus, resources });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async () => {
  try {
    const students = await Student.find({});
    const uniqueEmails = new Set();
    const uniqueStudents = [];

    for (const student of students) {
      const email = student.details.email;
      if (!uniqueEmails.has(email)) {
        uniqueEmails.add(email);
        uniqueStudents.push(student);
      } else {
        const index = uniqueStudents.findIndex(
          (s) => s.details.email === email
        );
        if (student.details.doneUpload) {
          if (!uniqueStudents[index].details.doneUpload) {
            uniqueStudents[index] = student;
          }
        }
      }
    }
    return uniqueStudents;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw err;
  }
};

export { uploadDocument, generateFile, getLinks };
