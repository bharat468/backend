import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    startDate: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
