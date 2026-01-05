import express from "express";
import {
  createCoupon,
  verifyCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/create", createCoupon);
router.post("/verify", verifyCoupon);

// ✅ NEW ROUTES
router.get("/", getAllCoupons);
router.get("/:id", getSingleCoupon);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);

export default router;
