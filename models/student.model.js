import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    worthy: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: "",
    },
    listNumber: {
      type: Number,
      default: 0,
    },
    details: { type: Object },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
