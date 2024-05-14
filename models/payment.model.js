import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["bank", "upi"],
    default: "bank",
  },
  utr: {
    type: String,
  },
  file: {
    type: String,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
