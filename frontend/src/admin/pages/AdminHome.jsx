import React from "react";
import { Link } from "react-router-dom";
import "../admin.css";

function AdminHome() {
  return (
    <>
      <div className="admin-nav">
        <span>Admin Panel</span>
        <Link to="/">Main Website</Link>
      </div>

      <div className="admin-wrapper">
        <div className="admin-card">
          <h2 className="admin-title">Quick Actions</h2>

          <Link to="/admin/product/add"><button className="admin-btn">Add Product</button></Link>
          <Link to="/admin/coupon/create"><button className="admin-btn admin-btn-secondary">Create Coupon</button></Link>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
