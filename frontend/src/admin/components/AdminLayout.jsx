import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaPowerOff,
  FaBoxOpen,
  FaLayerGroup,
  FaTags,
  FaUsers,
  FaFolderPlus,
  FaHome,
} from "react-icons/fa";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    try {
      await instance.post("/admin/logout", {}, { withCredentials: true });
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  }

  /* ================= MENU LINKS ================= */
  const menuItems = [
    { to: "/admin/home", label: "Dashboard", icon: <FaHome /> },
    { to: "/admin/product/add", label: "Add Product", icon: <FaBoxOpen /> },
    { to: "/admin/products", label: "Product List", icon: <FaLayerGroup /> },
    { to: "/admin/category/add", label: "Add Category", icon: <FaFolderPlus /> },
    { to: "/admin/coupon/create", label: "Create Coupon", icon: <FaTags /> },
    { to: "/admin/coupons", label: "Coupon List", icon: <FaTags /> },
    { to: "/admin/users", label: "Users List", icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ========== MOBILE TOGGLE BUTTON ========== */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 bg-slate-900 p-2 rounded text-white shadow-md"
      >
        <FaBars />
      </button>

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen text-white
          bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300`}
      >
        {/* ========== HEADER ========== */}
        <div className="relative flex items-center justify-center border-b border-slate-700">
          <h2 className="text-2xl font-bold py-6 w-full text-center">
            Admin Panel
          </h2>

          {/* close button mobile */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute right-4 text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* ========== MENU ========== */}
        <nav className="flex flex-col gap-1 p-3 text-sm">
          {menuItems.map((item) => {
            const active = location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
                  ${
                    active
                      ? "bg-slate-700 text-white shadow"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <hr className="my-4 border-slate-700" />

          {/* ========== LOGOUT BUTTON ========== */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 
              rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            <FaPowerOff />
            Logout
          </button>

          {/* ========== MAIN SITE ========== */}
          <Link
            to="/"
            className="mt-3 flex items-center gap-3 px-4 py-2
              rounded-lg bg-teal-600 hover:bg-teal-700 transition font-semibold text-center"
          >
            🏠 Main Website
          </Link>
        </nav>
      </aside>

      {/* ========== CONTENT AREA ========== */}
      <main className="flex-1 p-4 lg:p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="relative">
              <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
              <div className="absolute -inset-4 border-2 border-dashed border-teal-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-500 text-sm">Loading admin page...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminLayout;
