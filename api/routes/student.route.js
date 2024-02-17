import express from "express";
import { studentRegister } from "../controllers/student.controller.js";
const router = express.Router();

router.post("/studentRegister", studentRegister);

export default router;