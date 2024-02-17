import Student from "../models/student.model.js";
import Visitor from "../models/visitor.model.js";
import { errorHandler } from "../utils/error.js";

export const registerVisitor = async (req, res, next) => {
    const { email, phone } = req.body;

    if (!email || !phone || email === "" || phone === "") {
        return next(errorHandler(400, "All fields are requird")); // HTTP status code for Bad Request
    }
    try {
        const visitedUser = await Visitor.findOne({
            $or: [{ email: email }, { phone: phone }],
        });

        if (visitedUser) {
            return res.status(200).json({
                message: "visited",
            });
        } else {
            const newVisitor = new Visitor({
                email,
                phone
            });
            await newVisitor.save();
            res.status(201).json({ message: "User registered successfully" });
        }

    } catch (error) {
        next(error);
    }
}

export const  getVisitor = async (req, res, next) => {
    try{
        if(!req.user.isAdmin){
            return next(errorHandler(403, "You are not allowed to get meals "));
        }
        const visitors = await Visitor.find();
        const totalVisitor = await Visitor.countDocuments();

        res.status(200).json({
            visitors,
            totalVisitor,
        });
    }catch (error){
        next(error)
    }
};
