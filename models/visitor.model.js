import mongoose from "mongoose";

const visitorSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    prospectViewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Visitor = new mongoose.model("Visitor", visitorSchema);

export default Visitor;