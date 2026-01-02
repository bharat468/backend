import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    try {
      await instance.post("/user/logout");
      toast.success("Logged out successfully");
      navigate("/login");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold text-white tracking-wide hover:opacity-90 transition"
        >
          Ecommerce
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* NAV LINKS */}
        <nav
          className={`
            fixed md:static top-16 right-0
            w-64 md:w-auto
            h-screen md:h-auto
            bg-slate-900 md:bg-transparent
            shadow-2xl md:shadow-none
            flex flex-col md:flex-row
            gap-6 p-6 md:p-0
            transition-transform duration-300 ease-in-out
            ${menuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          {/* LOGIN */}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-slate-200 hover:text-white transition"
          >
            <FaUser /> Login
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-slate-200 hover:text-white transition"
          >
            <FaUser /> Register
          </Link>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-3 text-slate-200 hover:text-white transition"
          >
            <IoMdLogOut /> Logout
          </button>

          {/* CART */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center gap-3 text-slate-200 hover:text-white transition"
          >
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
