import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Student from "../models/student.model.js";
import { sendEmailWithAttachment } from "../services/emailService.js";
import { generateExcelFile } from "../utils/excelUtils.js";
import Admin from "../models/admin.model.js";
import Visitor from '../models/visitor.model.js';

const uploadDocument = async (req, res, next) => {
    try {
        const imageLinks = [];
        if (req.files) {
            let images = [];
            if (req.files.images.length > 0) images = req.files.images;
            else images.push(req.files.images);

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(
                    images[i].tempFilePath,
                    {
                        use_filename: true,
                        folder: "IPM",
                        quality: 50,
                        resource_type: "auto",
                    }
                );
                imageLinks.push(result.secure_url);
                fs.unlinkSync(images[i].tempFilePath);
            }
        }
        return res.status(200).json({ imageLinks });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const generateFile = async (req, res, next) => {
    try {
       // return res.json({ msg: "Dummy Report Generated" });
        const students = await Student.find();
        const visitors = await Visitor.find();
        const filePath = await generateExcelFile(students, visitors);
        const result = await cloudinary.uploader.upload(filePath, {
            use_filename: true,
            folder: "IPM",
            quality: 50,
            resource_type: "auto",
        });

        fs.unlinkSync(filePath);
        const status = await sendEmailWithAttachment(result.secure_url);
        if (status) {
            return res.status(200).json({ msg: "File Generated" });
        } else {
            return res.json({ msg: "file generation failed" });
        }
    } catch (error) {
        next(error);
    }
};

const getLinks = async (req, res, next) => {
    try {
        const admin = await Admin.find();
        const { meritList, prospectus, resources } = admin[0];
        const latestMeritList = meritList.slice(-3);
        res.status(200).json({ meritList: latestMeritList, prospectus, resources });
    } catch (error) {
        next(error);
    }
};

export { uploadDocument, generateFile, getLinks };
