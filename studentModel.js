import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    details: { type: Object },
    documents: { type: Object },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
