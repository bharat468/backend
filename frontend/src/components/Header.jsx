import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthProvider";
import { RiContactsBook3Fill } from "react-icons/ri";


function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // ✅ SINGLE SOURCE

  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    try {
      await instance.post("/user/logout");
      toast.success("Logged out successfully");
      setIsLoggedIn(false); // ✅ context update
      navigate("/login");
      setMenuOpen(false);
    } catch {
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
          className="text-2xl font-bold text-white tracking-wide"
        >
          LIMESTONE WATCH
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
            transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >

          {/* 🔓 NOT LOGGED IN */}
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-slate-200 hover:text-white"
          >
            <RiContactsBook3Fill />
            About
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-200 hover:text-white"
              >
                <FaUser /> Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-200 hover:text-white"
              >
                <FaUser /> Register
              </Link>
            </>
          )}

          {/* 🔐 LOGGED IN */}
          {isLoggedIn && (
            <button
              onClick={logout}
              className="flex items-center gap-3 text-slate-200 hover:text-white"
            >
              <IoMdLogOut /> Logout
            </button>
          )}

          {/* CART */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center gap-3 text-slate-200 hover:text-white"
          >
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
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
