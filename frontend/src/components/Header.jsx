import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import "../App.css";

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  async function logout() {
    await instance.post("/user/logout");
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Ecommerce</Link>
      </div>

      {/* <div className="search-box">
        <input type="text" placeholder="Search for products..." />
        <button><FaSearch /></button>
      </div> */}

      <div className="icons">

        <Link to="/login" className="icon"><FaUser /> <span>Login</span></Link>
        <Link to="/register" className="icon"><FaUser /> <span>Register</span></Link>

        <span className="icon" onClick={logout}><IoMdLogOut /> <span>Logout</span></span>

        <Link to="/cart" className="icon cart-icon">
          <FaShoppingCart /> <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
