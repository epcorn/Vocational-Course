import mongoose from "mongoose";

export const resourceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: "https://img.freepik.com/premium-vector/agricultural-pest-control-insects-extermination_8071-31433.jpg"
    },
    pdfLink: {
        type: String,
        required: true,
    }
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;