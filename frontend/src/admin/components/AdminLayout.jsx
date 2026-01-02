import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
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
            to="/"
            className="mt-4 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            Main Website
          </Link>
        </nav>
      </aside>

      {/* ===== RIGHT CONTENT ===== */}
      <main className="flex-1 p-6">
        <Outlet /> {/* yahin page change hoga */}
      </main>

    </div>
  );
}

export default AdminLayout;
