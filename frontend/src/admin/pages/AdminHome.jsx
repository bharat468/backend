import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <>
      <header className="admin-header">
        <h1>Dashboard</h1>
      </header>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Add Product</h3>
          <p>Create new product</p>
          <Link to="/admin/product/add">
            <button>Add Now</button>
          </Link>
        </div>

        <div className="admin-card">
          <h3>Create Coupon</h3>
          <p>Generate discount coupons</p>
          <Link to="/admin/coupon/create">
            <button className="secondary">Create</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
