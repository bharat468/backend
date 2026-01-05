import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";

function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [data, setData] = useState({
    code: "",
    discountPercent: "",
    startDate: "",
    expiresAt: "",
  });

  /* ================= FETCH COUPON ================= */
  useEffect(() => {
    fetchCoupon();
  }, []);

  async function fetchCoupon() {
    try {
      const res = await instance.get(`/coupon/${id}`);
      const coupon = res.data;

      setData({
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        startDate: coupon.startDate.split("T")[0],
        expiresAt: coupon.expiresAt.split("T")[0],
      });
    } catch {
      toast.error("Failed to load coupon");
    } finally {
      setLoading(false);
    }
  }

  /* ================= INPUT CHANGE ================= */
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "code") {
      const filtered = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");
      setData({ ...data, code: filtered });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  /* ================= UPDATE ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !data.code ||
      !data.discountPercent ||
      !data.startDate ||
      !data.expiresAt
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (Number(data.discountPercent) < 1 || Number(data.discountPercent) > 100) {
      toast.error("Discount must be between 1 and 100");
      return;
    }

    if (new Date(data.expiresAt) <= new Date(data.startDate)) {
      toast.error("Expiry date must be after start date");
      return;
    }

    try {
      setBtnLoading(true);

      await instance.put(`/coupon/${id}`, data, {
        withCredentials: true,
      });

      toast.success("Coupon updated successfully 🎉");
      navigate("/admin/coupons");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update coupon ❌"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  /* ================= BACK ================= */
  function handleBack() {
    navigate(-1);
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-100">
        <div className="relative">
          <FaShoppingBag className="text-6xl text-teal-600 animate-bounce" />
          <div className="absolute -inset-4 border-2 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-3 text-slate-600">Loading coupon...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* 🔙 BACK BUTTON */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
        >
          <span className="p-2 rounded-full border border-slate-300 hover:bg-slate-200 transition">
            <FaArrowLeft className="text-sm" />
          </span>
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border p-8">

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Coupon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CODE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              name="code"
              value={data.code}
              onChange={handleChange}
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-slate-200 cursor-not-allowed uppercase"
            />
          </div>

          {/* DISCOUNT */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Discount Percent
            </label>
            <input
              type="number"
              name="discountPercent"
              value={data.discountPercent}
              onChange={handleChange}
              min={1}
              max={100}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* START DATE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* EXPIRY DATE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiresAt"
              value={data.expiresAt}
              onChange={handleChange}
              min={data.startDate}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-800
              flex items-center justify-center gap-3
              ${btnLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {btnLoading && (
              <div className="relative">
                <FaShoppingBag className="text-xl text-teal-300 animate-bounce" />
                <div className="absolute -inset-2 border border-dashed border-teal-300 rounded-full animate-spin"></div>
              </div>
            )}
            {btnLoading ? "Updating..." : "Update Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCoupon;
