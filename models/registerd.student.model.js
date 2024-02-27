import mongoose from "mongoose";
const registeredStudentSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    enrolled: {
        type: Boolean,
        default: false,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    passwordReset: {
        otpSend: {
            type: Number,
            default: Infinity
        },
    }


}, { timestamps: true });

const RegisteredStudent = mongoose.model("RegisteredStudent", registeredStudentSchema);
export default RegisteredStudent;