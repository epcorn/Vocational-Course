import express from "express";
import { registerVisitor, getVisitor } from "../controllers/visitor.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", registerVisitor);
router.get("/", verifyToken, getVisitor);

export default router;