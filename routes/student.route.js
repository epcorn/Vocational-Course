import express from "express";
import { studentRegister, finalRegister, sendOtp, verifyOtp, login, signout } from "../controllers/student.controller.js";
const router = express.Router();

router.post("/studentRegister", studentRegister);
router.post("/finalRegister", finalRegister);
router.post("/login", login);
router.post("/signout", signout);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);

export default router;