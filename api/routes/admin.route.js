import express from "express";
import { login, signout, signup, anylytics, demography, documentUpload } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/signout", signout);
router.post("/signup", signup); //Remove this route before movig this project to production.
router.get("/anylytics", verifyToken, anylytics);
router.get("/demography", verifyToken, demography);
router.post("/documentUpload", verifyToken, documentUpload);


export default router;