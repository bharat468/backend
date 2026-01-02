import { useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const AdminCreateCoupon = () => {
  const [data, setData] = useState({
    code: "",
    discountPercent: "",
    startDate: "",
    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // coupon code always uppercase
    if (name === "code") {
      setData({ ...data, code: value.toUpperCase() });
    } else {
      setData({ ...data, [name]: value });
    }
  }

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

      // reset form
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
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Create Coupon
        </h2>

        {/* FORM */}
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
              placeholder="NEW10"
              maxLength={20}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100 uppercase"
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
              step="any"
              inputMode="numeric"
              placeholder="10"
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* START DATE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Session Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
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
              flex items-center justify-center gap-2 transition
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateCoupon;
