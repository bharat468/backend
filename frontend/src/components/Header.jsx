import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import "../App.css";

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await instance.post("/user/logout");
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <header className="header">

      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>Ecommerce</Link>
      </div>

      {/* MENU ICON MOBILE */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      {/* NAV LINKS */}
      <div className={`icons ${menuOpen ? "open" : ""}`}>

        <Link to="/login" className="icon" onClick={() => setMenuOpen(false)}>
          <FaUser /> <span>Login</span>
        </Link>

        <Link to="/register" className="icon" onClick={() => setMenuOpen(false)}>
          <FaUser /> <span>Register</span>
        </Link>

        <span className="icon" onClick={logout}>
          <IoMdLogOut /> <span>Logout</span>
        </span>

        <Link to="/cart" className="icon cart-icon" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

      </div>
    </header>
  );
}

export default Header;
