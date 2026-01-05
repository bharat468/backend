import Coupon from "../models/couponmodel.js";

/* ================= CREATE ================= */
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercent, startDate, expiresAt } = req.body;

    const exists = await Coupon.findOne({ code });
    if (exists)
      return res.status(400).json({ message: "Coupon already exists" });

    const coupon = await Coupon.create({
      code,
      discountPercent,
      startDate,
      expiresAt,
    });

    res.json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE ================= */
export const getSingleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon)
      return res.status(404).json({ message: "Coupon not found" });

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateCoupon = async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Coupon updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= VERIFY ================= */
export const verifyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code });
    if (!coupon)
      return res.status(404).json({ message: "Invalid coupon" });

    if (coupon.expiresAt < new Date())
      return res.status(400).json({ message: "Coupon expired" });

    res.json({
      valid: true,
      discountPercent: coupon.discountPercent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
