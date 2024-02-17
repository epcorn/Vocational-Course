import express from "express";
import studentRoutes from "./student.route.js";
import adminRoutes from "./admin.route.js";
import visitorRoutes from "./visitor.route.js";

const router = express.Router();


router.use("/students", studentRoutes);
router.use("/admins", adminRoutes);
router.use("/visitors", visitorRoutes);

export default router;
