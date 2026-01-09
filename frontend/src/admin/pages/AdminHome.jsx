import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaArrowRight,
  FaUserFriends,
  FaLayerGroup,
  FaShoppingBag,
  FaFolderPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-slate-100">
        <div className="relative">
          <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
          <div className="absolute -inset-4 border-2 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
        <p className="ml-3 text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* HEAD */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-lg">
          Control products, coupons, categories & users
        </p>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Card
          title="Add Product"
          desc="Create and publish a new product"
          color="from-slate-700 to-slate-900"
          icon={<FaBoxOpen size={24} />}
          to="/admin/product/add"
        />

        <Card
          title="Product List"
          desc="View and manage all products"
          color="from-blue-500 to-blue-700"
          icon={<FaLayerGroup size={24} />}
          to="/admin/products"
        />

        <Card
          title="Add Category"
          desc="Create new categories"
          color="from-amber-500 to-orange-600"
          icon={<FaFolderPlus size={24} />}
          to="/admin/category/add"
        />

        <Card
          title="Create Coupon"
          desc="Generate discount offers"
          color="from-teal-500 to-teal-700"
          icon={<FaTags size={24} />}
          to="/admin/coupon/create"
        />

        <Card
          title="Coupon List"
          desc="Checkout all coupons"
          color="from-fuchsia-500 to-purple-700"
          icon={<FaTags size={24} />}
          to="/admin/coupons"
        />

        <Card
          title="User List"
          desc="Manage all users"
          color="from-rose-500 to-red-600"
          icon={<FaUserFriends size={24} />}
          to="/admin/users"
        />

      </div>
    </div>
  );
}

/* 🔥 CARD COMPONENT */
function Card({ title, desc, color, icon, to }) {
  return (
    <div className="bg-white shadow-md border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className={`h-14 w-14 rounded-xl text-white flex items-center justify-center bg-gradient-to-br ${color}`}>
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-slate-500 text-sm">{desc}</p>
        </div>
      </div>

      <Link
        to={to}
        className={`inline-flex items-center px-5 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition gap-2`}
      >
        Go <FaArrowRight />
      </Link>
    </div>
  );
}

export default AdminHome;
