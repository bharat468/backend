import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaTags,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

function AdminHome() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 page open hote hi loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    try {
      // ⚠️ agar tum user/logout use kar rahe ho to yaha change kar sakte ho
      await instance.post("/admin/logout", {}, { withCredentials: true });

      toast.success("Admin logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
            <div className="absolute -inset-4 border-2 border-dashed border-teal-400 rounded-full animate-spin"></div>
          </div>

          <p className="text-slate-500 text-sm tracking-wide">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage products and coupons
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            bg-red-600 text-white
            font-semibold
            hover:bg-red-700
            transition
          "
        >
          <IoMdLogOut />
          Logout
        </button>
      </div>

      {/* ================= CARDS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ADD PRODUCT */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <FaBoxOpen size={22} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Add Product
              </h3>
              <p className="text-slate-500 text-sm">
                Create and publish new products
              </p>
            </div>
          </div>

          <Link
            to="/admin/product/add"
            className="inline-flex items-center gap-2 px-5 py-2.5
              rounded-lg text-white font-semibold
              bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
              hover:-translate-y-0.5 transition shadow"
          >
            Add Now <FaArrowRight />
          </Link>
        </div>

        {/* CREATE COUPON */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <FaTags size={22} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Create Coupon
              </h3>
              <p className="text-slate-500 text-sm">
                Generate discount coupons
              </p>
            </div>
          </div>

          <Link
            to="/admin/coupon/create"
            className="inline-flex items-center gap-2 px-5 py-2.5
              rounded-lg text-white font-semibold
              bg-gradient-to-r from-teal-600 to-teal-700
              hover:-translate-y-0.5 transition shadow"
          >
            Create <FaArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AdminHome;
