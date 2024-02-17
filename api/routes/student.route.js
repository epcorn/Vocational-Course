import express from "express";
import { studentRegister, personalInfo } from "../controllers/student.controller.js";
const router = express.Router();

router.post("/studentRegister", studentRegister);
router.post("/personalInfo", personalInfo);


export default router;