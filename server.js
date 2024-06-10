import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import cookeParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import connectDB from "./config/mongoose.js";
import {
  uploadDocument,
  generateFile,
  getLinks,
} from "./controllers/document.controller.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import Student from "./models/student.model.js";
import {
  reFillThePaymentForm,
  reminderEmail,
} from "./services/emailService.js";

dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookeParser());

//Routes
app.use("/api", rootRouter);
app.post("/api/documentUpload", uploadDocument);
app.get("/api/generateFile", generateFile);
app.get("/api/links", getLinks);

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

//Error handling middleware
app.use(errorMiddleware);

//funtion to
// (async () => {
//   try {
//     // Find all students whose worthy is true
//     const worthyStudents = await Student.find({ worthy: true });

//     // Set listNumber to 1 for worthy students
//     const updateWorthyPromises = worthyStudents.map(async (student) => {
//       student.listNumber = 1;
//       return student.save();
//     });

//     // Wait for all worthy student updates to complete
//     await Promise.all(updateWorthyPromises);

//     // Find all students whose worthy is false (or not set)
//     const nonWorthyStudents = await Student.find({ worthy: { $ne: true } });

//     // Set listNumber to 0 (default) for non-worthy students
//     const updateNonWorthyPromises = nonWorthyStudents.map(async (student) => {
//       student.listNumber = 0;
//       return student.save();
//     });

//     // Wait for all non-worthy student updates to complete
//     await Promise.all(updateNonWorthyPromises);

//     console.log("Student listNumbers updated successfully.");
//   } catch (err) {
//     console.error("Error updating student listNumbers:", err);
//   }
// });
//Funtion to add new filds to the existing Schema models
// (async function () {
//   console.log("Starting update!");
//   try {
//     const result = await Student.updateMany({}, { $set: { code: "" } });
//     console.log("Documents updated:", result.modifiedCount);
//   } catch (err) {
//     console.log("Error updating documents:", err);
//   }
//   console.log("Update finished!");
// });

//reminder funtion

// (async function () {
//   //console.log("Starting emailing process");
//   try {
//     const worthyStudents = await Student.find({
//       worthy: true,
//       listNumber: 2,
//       "details.donePayment": false,
//     });
//     if (worthyStudents.length > 0) {
//       for (const student of worthyStudents) {
//         const emailAddress = student.details.email;
//         const code = student.code; // Assuming the student document has a 'code' field
//         const id = student._id; // Assuming the student document has an '_id' field
//         let emailSent = await reminderEmail(emailAddress, code, id);

//         if (emailSent) {
//           console.log(`Email sent successfully to ${emailAddress}`);
//         } else {
//           console.log(`Failed to send email to ${emailAddress}`);
//         }
//         // console.log(`Email: ${emailAddress}  Code: ${code} Id: ${id}`);
//       }
//     } else {
//       console.log("No worthy students found");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
