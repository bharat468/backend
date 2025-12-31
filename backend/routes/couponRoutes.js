import express from "express";
import { createCoupon, verifyCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.post("/create", createCoupon);
router.post("/verify", verifyCoupon);

export default router;
