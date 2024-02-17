import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Visitor from "../models/visitor.model.js";
import fs, { stat } from "fs";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newAdmin.save();
        res.status(201).json({ message: "SignUp successful" }); // HTTP status code for successful code for created
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
    }

    try {
        const validAdmin = await Admin.findOne({ email });
        if (!validAdmin) {
            return next(errorHandler(404, "User not found")); // HTTP status code for Not Found
        }

        const validPassword = bcryptjs.compareSync(password, validAdmin.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid credentials")); // HTTP status code for Bad Request
        }

        const token = jwt.sign(
            {
                id: validAdmin._id,
                isAdmin: validAdmin.isAdmin,
            },
            process.env.JWT_SECRET
        );
        const { password: pass, ...rest } = validAdmin._doc;

        res
            .status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("User have been signed out");
    } catch (error) {
        next(error);
    }
};

export const anylytics = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(401, "Unauthorized"));
        }
        const Total_Visitors = await Visitor.find();
        const Total_Applicants = await Student.find();
        // Example aggregation pipeline
        const finishedApplicants = await Student.aggregate([{ $match: { "details.donePayment": true } },]);
        // Student.aggregate([
        //     // Match documents where donePersonal is true
        //     { $match: { "details.donePersonal": true } },
        //     // Other pipeline stages...
        // ]).then((result) => {
        //     res.status(200).json(`totalResult: ${result.length}`)
        // }).catch((err) => {
        //     console.log(err);
        // });
        res.status(200).json([{ "Prospect_Views": 5 }, { "Total_Visitors": Total_Visitors.length, "list": Total_Visitors }, { "Total_Applicants": Total_Applicants.length, "list": Total_Applicants }, { "Finished_Applicants": finishedApplicants.length, "list": finishedApplicants },]);
    } catch (error) {
        next(error);
    }
};

export const demography = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(401, "Unauthorized"));
        }
        const only10Passed = await Student.aggregate([
            {
                $match: {
                    "details.percentage10": { $exists: true, $ne: "" },
                    "details.percentage12": { $exists: true, $eq: "" },
                    "details.graduationPercentage": { $exists: true, $eq: "" },
                }
            },

        ]);
        const till12Passed = await Student.aggregate([
            {
                $match: {
                    "details.percentage10": { $exists: true, $ne: "" },
                    "details.percentage12": { $exists: true, $ne: "" },
                    "details.graduationPercentage": { $exists: true, $eq: "" },
                }

            },

        ]);
        let graduate = await Student.aggregate([
            {
                $match: {
                    "details.percentage10": { $exists: true, $ne: "" },
                    "details.percentage12": { $exists: true, $ne: "" },
                    "details.graduationPercentage": { $exists: true, $ne: "" },
                }

            },
        ]);
        res.status(200).json([{ "Only_10_Passed": only10Passed.length, "list": only10Passed }, { "Till_12_Passed": till12Passed.length, "list": till12Passed }, { "Graduate": graduate.length, "list": graduate }, { Male: 5 }, { Female: 10 }]);
    } catch (error) {
        next(error);
    }
};

export const documentUpload = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(401, "Unauthorized"));
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const image = req.files.image; // Assuming there is only one file
        const eventId = (req.body.eventId);
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            use_filename: true,
            folder: "IPM",
            quality: 50,
            resource_type: "auto",
        });

        const imageLink = result.secure_url;

        fs.unlinkSync(image.tempFilePath);
        let updatedAdmin = null;
        if (eventId === "prospectus") {
            updatedAdmin = await Admin.findByIdAndUpdate(req.user.id, { "prospectus": imageLink }, { new: true });
        }
        if (eventId === "meritList") {
            updatedAdmin = await Admin.findByIdAndUpdate(
                req.user.id,
                { $push: { meritList: imageLink } },
                { new: true }
            );
        }
        const { password, ...rest } = updatedAdmin._doc;
        return res.status(200).json({ rest });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};