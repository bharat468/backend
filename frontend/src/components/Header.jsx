import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiContactsBook3Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const { cartCount, fetchCartCount } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fetch cart count when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartCount();
    }
  }, [isLoggedIn]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function logout() {
    try {
      await instance.post("/user/logout");
      toast.success("Logged out successfully");
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("cartCount", "0");
      setMenuOpen(false);
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-slate-700/50"
          : "bg-slate-900 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* LOGO */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-base sm:text-lg md:text-xl">
                ShopHub
              </div>
            </motion.div>
            <span className="hidden sm:block text-slate-300 font-medium text-sm md:text-base">Your Premium Shopping Destination</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            
            {/* About Link */}
            <Link
              to="/about"
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm lg:text-base"
            >
              <RiContactsBook3Fill className="text-lg" />
              <span>About</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm lg:text-base"
            >
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Login/Logout — no skeleton, trust localStorage instantly */}
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 lg:px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all text-sm lg:text-base"
                  >
                    <FaUser />
                    <span>Login</span>
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 lg:px-5 py-2 rounded-lg border-2 border-purple-600 text-purple-400 font-semibold hover:bg-purple-600/10 transition-all text-sm lg:text-base"
                  >
                    <FaUser />
                    <span>Register</span>
                  </motion.button>
                </Link>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-4 lg:px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm lg:text-base"
              >
                <IoMdLogOut className="text-lg" />
                <span>Logout</span>
              </motion.button>
            )}
          </nav>

          {/* MOBILE: Cart icon + Menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile cart icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              <FaShoppingCart className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop - covers entire viewport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
              style={{ position: 'fixed' }}
            />
            
            {/* Menu Panel - slides from right side of viewport */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 h-screen w-[75vw] max-w-[320px] bg-slate-900 border-l border-slate-700 shadow-2xl z-[110] md:hidden overflow-y-auto"
              style={{ position: 'fixed' }}
            >
              <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
                
                {/* Close Button */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Menu
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    <RiContactsBook3Fill className="text-lg" />
                    <span>About</span>
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    <div className="flex items-center space-x-3">
                      <FaShoppingCart className="text-lg" />
                      <span>Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-slate-700/50 my-2"></div>

                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all text-sm sm:text-base"
                      >
                        <FaUser className="text-lg" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-purple-600 text-purple-400 hover:bg-purple-600/10 transition-all text-sm sm:text-base"
                      >
                        <FaUser className="text-lg" />
                        <span>Register</span>
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base"
                    >
                      <IoMdLogOut className="text-lg" />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
