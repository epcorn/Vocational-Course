import Student from "../models/student.model.js";
import jwt from "jsonwebtoken";


export const studentRegister = async (req, res) => {
    try {
        await Student.create({ details: req.body });

        res.status(201).json({ msg: "Registration completed" });
    } catch (error) {
        next(error);
    }
};

export const personalInfo = async (req, res, next) => {
    try {
        if (!req.cookies.access_token) {
            const newStudent = await Student.create({ details: req.body.form });

            const token = jwt.sign(
                {
                    id: newStudent._id,
                },
                process.env.JWT_SECRET
            );
            // Calculate the expiration time (e.g., 7 days from now)
            const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            res
                .status(200)
                .cookie("access_token", token, { httpOnly: true, expires: expirationDate })
                .json({ message: "created successfully" });
        } else {
            const token = req.cookies.access_token;
            if (!token) {
                return next(errorHandler(401, "Unauthorized")); // HTTP status code for Unauthorized
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, student) => {
                if (err) {
                    return next(errorHandler(401, "Unauthorized"));
                }
                const id = student.id;

                try {
                    const updatedStudent = await Student.findOneAndUpdate(
                        { _id: id },
                        { $set: { "details": req.body.form } },
                        { new: true, runValidators: true }
                    );

                    if (!updatedStudent) {
                        return res.status(404).json({ message: "Student not found" });
                    }
                    res.status(200).json({ message: "Updated!" });
                } catch (error) {
                    console.error("Error in personalInfo:", error);
                    res.status(500).json({ message: "Internal server error" });
                    // Passing the error to the next middleware function if applicable
                    next(error);
                }
            });
        }
    } catch (error) {
        console.error("Error in personalInfo:", error);
        res.status(500).json({ message: "Internal server error" });
        // Passing the error to the next middleware function if applicable
        next(error);
    }
}


