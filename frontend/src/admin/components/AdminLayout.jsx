import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

function AdminLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 🔁 page change par loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl">
        <h2 className="text-2xl font-bold text-center py-6 border-b border-slate-700">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            to="/admin/home"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/product/add"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Add Product
          </Link>

          <Link
            to="/admin/coupon/create"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Create Coupon
          </Link>

          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Product Listings
          </Link>

          <Link
            to="/admin/users"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            User Listings
          </Link>

          <Link
            to="/"
            className="mt-4 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            Main Website
          </Link>
        </nav>
      </aside>

      {/* ===== RIGHT CONTENT ===== */}
      <main className="flex-1 p-6">

        {loading ? (
          // 🔥 SAME PRODUCT PAGE LOADER
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="relative">
              <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
              <div className="absolute -inset-4 border-2 border-dashed border-teal-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-500 text-sm">
              Loading admin page...
            </p>
          </div>
        ) : (
          <Outlet /> // 👈 yahin page change hoga
        )}

      </main>
    </div>
  );
}

export default AdminLayout;
