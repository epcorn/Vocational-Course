import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import Student from "./studentModel.js";
import fs from "fs";
import cors from "cors";
import path from "path";
import brevo from "@getbrevo/brevo";
import exceljs from "exceljs";

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.post("/api/documentUpload", async (req, res) => {
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
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/studentRegister", async (req, res) => {
  try {
    await Student.create({ details: req.body });

    res.status(201).json({ msg: "Registration completed" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/generateFile", async (req, res) => {
  try {
    const students = await Student.find();

    const workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = [
      { header: "First Name", key: "firstName" },
      { header: "Middle Name", key: "middleName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Alternate Phone", key: "alternatePhone" },
      { header: "Date Of Birth", key: "dob" },
      { header: "Gender", key: "gender" },
      { header: "Blood Group", key: "blood" },
      { header: "Disability", key: "disability" },
      { header: "Nationality", key: "nationality" },
      { header: "Religion", key: "religion" },
      { header: "Caste", key: "caste" },
      { header: "Father Name", key: "fatherName" },
      { header: "Mother Name", key: "motherName" },
      { header: "Income", key: "income" },
      { header: "Guardian Name", key: "guardianName" },
      { header: "Relation Guardian", key: "relationGuardian" },
      { header: "Income Guardian", key: "incomeGuardian" },
      { header: "Address", key: "address" },
      { header: "City", key: "city" },
      { header: "Pincode", key: "pincode" },
      { header: "10th Percentage", key: "percentage10" },
      { header: "10th board", key: "board10" },
      { header: "12th Percentage", key: "percentage12" },
      { header: "12th board", key: "board12" },
      { header: "Last University", key: "lastUniversity" },
      { header: "Passing Year", key: "passingYear" },
      { header: "Roll No", key: "rollNo" },
      { header: "Reg No", key: "regNo" },
      { header: "Best Of 4", key: "best4" },
      { header: "Extra Course", key: "extraCourse" },
      { header: "Passport Size Images", key: "passportPics" },
      { header: "Aadhar Card", key: "aadharCard" },
      { header: "Cast Certificate", key: "castCertificate" },
      { header: "10th marksheet", key: "marksheet10" },
      { header: "12th marksheet", key: "marksheet12" },
      { header: "Vocational Certification", key: "vocationalCerti" },
    ];

    for (let student of students) {
      worksheet.addRow({
        firstName: student.details.firstName,
        middleName: student.details.middleName,
        lastName: student.details.lastName,
        email: student.details.email,
        phone: student.details.phone,
        alternatePhone: student.details.alternatePhone,
        dob: student.details.dob,
        gender: student.details.gender,
        blood: student.details.blood,
        disability: student.details.disability,
        nationality: student.details.nationality,
        religion: student.details.religion,
        caste: student.details.caste,
        fatherName: student.details.fatherName,
        motherName: student.details.motherName,
        income: student.details.income,
        guardianName: student.details.guardianName,
        relationGuardian: student.details.relationGuardian,
        incomeGuardian: student.details.incomeGuardian,
        address: student.details.address,
        city: student.details.city,
        pincode: student.details.pincode,
        percentage10: student.details.percentage10,
        percentage12: student.details.percentage12,
        board12: student.details.board12,
        lastUniversity: student.details.lastUniversity,
        passingYear: student.details.passingYear,
        rollNo: student.details.rollNo,
        regNo: student.details.regNo,
        best4: student.details.best4,
        extraCourse: student.details.extraCourse,
        passportPics: student.details.passportPics,
        aadharCard: student.details.aadharCard,
        castCertificate: student.details.castCertificate,
        marksheet10: student.details.marksheet10,
        marksheet12: student.details.marksheet12,
        vocationalCerti: student.details.vocationalCerti,
      });
    }

    const filePath = "./tmp/Registration.xlsx";
    await workbook.xlsx.writeFile(filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      folder: "IPM",
      quality: 50,
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);

    let defaultClient = brevo.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_KEY;
    let apiInstance = new brevo.TransactionalEmailsApi();
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "EPCORN",
      email: process.env.NO_REPLY_EMAIL,
    };
    sendSmtpEmail.to = [
      { email: process.env.STQ_EMAIL },
      { email: process.env.EA_EMAIL },
      { email: process.env.SALES_EMAIL },
      { email: process.env.COLLEGE_EMAIL },
    ];
    sendSmtpEmail.templateId = 9;
    sendSmtpEmail.attachment = [
      { url: result.secure_url, name: "Registration of IPM Smark Course.xlsx" },
    ];
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ msg: "File Generated" });
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log("Server is listing"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
