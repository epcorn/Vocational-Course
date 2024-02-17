import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";

export const studentRegister = async (req, res, next) => {
    try {
        const { form } = req.body;

        if (!req.cookies.access_token) {
            // Student registration process
            const newStudent = await Student.create({ details: form });
            const token = generateAuthToken(newStudent._id);

            setAccessTokenCookie(res, token);
            res.status(201).json({ message: "Student created successfully", student: newStudent });
        } else {
            // Student update process
            const token = req.cookies.access_token;

            if (!token) {
                errorHandler(401, "Unauthorized");
            }

            const studentId = verifyAuthToken(token);
            const updatedStudent = await updateStudentDetails(studentId, form);

            res.status(200).json({ message: "Student details updated successfully", student: updatedStudent });
        }
    } catch (error) {
        next(error);
    }
};

const generateAuthToken = (studentId) => {
    return jwt.sign({ id: studentId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setAccessTokenCookie = (res, token) => {
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res.cookie("access_token", token, { httpOnly: true, expires: expirationDate });
};

const verifyAuthToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.id;
    } catch (error) {
        errorHandler(401, "Unauthorized");
    }
};

const updateStudentDetails = async (studentId, form) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { details: form },
        { new: true, runValidators: true }
    );

    if (!updatedStudent) {
        errorHandler(404, "Student not found");
    }

    return updatedStudent;
};
