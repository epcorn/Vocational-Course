import mongoose from "mongoose";
import { resourceSchema } from "./resource.model.js";
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
            link: {
                type: String,
                default:
                    'https://res.cloudinary.com/djc8opvcg/image/upload/v1708405304/IPM/tmp-1-1708405299928_wfvff5.pdf',
            },
            views: {
                type: Number,
                default: 0
            }
        },
        meritList: {
            type: [String],
            default: ["https://res.cloudinary.com/djc8opvcg/image/upload/v1708344134/IPM/tmp-1-1708344132111_fsnmhr.pdf"],
        },
        resources: {
            type: [resourceSchema],
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