import Coupon from "../models/couponmodel.js";

export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercent, expiresAt } = req.body;

    const exists = await Coupon.findOne({ code });
    if (exists) return res.status(400).json({ message: "Coupon already exists" });

    const coupon = await Coupon.create({ code, discountPercent, expiresAt });
    res.json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// verify coupon
export const verifyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });

    // expiry check
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    res.json({ valid: true, discountPercent: coupon.discountPercent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
