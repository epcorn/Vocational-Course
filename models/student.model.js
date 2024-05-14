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
    details: { type: Object },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
