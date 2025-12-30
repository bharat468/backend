import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import "../App.css";
import axios from "axios";
import instance from "../axiosConfig";

function Header() {
  const navigate = useNavigate();

  async function logout() {
    // let response = await instance.post("/admin/logout"); 
    let response = await instance.post("/user/logout");
    console.log(response);
    console.log(response.data.message);
    navigate("/login");
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Ecommerce</Link>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search for products..." />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="icons">
        <Link to="/login" className="icon">
          <FaUser /> <span>Login</span>
        </Link>

        <Link to="/register" className="icon">
          <FaUser /> <span>Register</span>
        </Link>

        <Link to="/admin/login" className="icon">
          <FaUser /> <span>Admin Login</span>
        </Link>
        <Link to="/logout" className="icon">
          <span onClick={logout}>
            <IoMdLogOut />
          </span>
        </Link>
        <Link to="/cart" className="icon">
          <FaShoppingCart /> <span>Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;