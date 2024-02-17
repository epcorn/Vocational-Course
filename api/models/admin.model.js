import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        prospectus: {
            type: String,
            default:
                'https://res.cloudinary.com/epcorn/image/upload/v1701693934/signature/Final_Prospectus_suqeg2.pdf',
        },
        meritList: {
            type: [String],
            default: ["https://www.google.com"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;