import express from "express";
import { registerVisitor, getVisitor } from "../controllers/visitor.controller.js";
const router = express.Router();

router.post("/", registerVisitor);
router.get("/", getVisitor);

export default router;