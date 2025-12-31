import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import "../admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/admin/login", data, { withCredentials: true });
      navigate("/admin/home");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">Admin Login</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input className="admin-input" name="email" value={data.email} onChange={handleChange} placeholder="Email" required />
        <input className="admin-input" type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" required />
        <button className="admin-btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
        