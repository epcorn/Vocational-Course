import express from "express";
import {
  studentRegister,
  finalRegister,
  sendOtp,
  verifyOtp,
  login,
  signout,
  getStud,
  paymentDetails,
} from "../controllers/student.controller.js";
const router = express.Router();

router.post("/studentRegister", studentRegister);
router.post("/finalRegister", finalRegister);
router.post("/login", login);
router.post("/signout", signout);
router.get("/:id", getStud);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/:id", paymentDetails);

export default router;
