import { useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminCreateCoupon = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    code: "",
    discountPercent: "",
    startDate: "",
    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);

  // today date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  /* ---------------- BACK ---------------- */
  function handleBack() {
    navigate(-1);
  }

  /* ---------------- INPUT CHANGE ---------------- */
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

  /* ---------------- SUBMIT ---------------- */
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
      setLoading(true);

      await instance.post(
        "/coupon/create",
        {
          code: data.code,
          discountPercent: data.discountPercent,
          startDate: data.startDate,
          expiresAt: data.expiresAt,
        },
        { withCredentials: true }
      );

      toast.success("Coupon created successfully 🎉");

      setData({
        code: "",
        discountPercent: "",
        startDate: "",
        expiresAt: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create coupon ❌"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-xl mx-auto mb-6">
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

      {/* CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Create Coupon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* COUPON CODE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              name="code"
              value={data.code}
              onChange={handleChange}
              placeholder="COUPON2025"
              maxLength={20}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100 uppercase"
            />
            <p className="text-xs text-slate-400 mt-1">
              Only capital letters (A–Z) and numbers (0–9)
            </p>
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
              required
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
              min={today}
              required
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
              min={data.startDate || today}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-800
              flex items-center justify-center gap-3
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading && (
              <div className="relative">
                <FaShoppingBag className="text-xl text-teal-300 animate-bounce" />
                <div className="absolute -inset-2 border border-dashed border-teal-300 rounded-full animate-spin"></div>
              </div>
            )}
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateCoupon;
