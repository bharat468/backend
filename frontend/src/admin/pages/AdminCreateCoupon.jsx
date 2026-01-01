import { useState } from "react";
import instance from "../../axiosConfig";
import "../admin.css";

const AdminCreateCoupon = () => {
  const [data, setData] = useState({ code: "", discountPercent: "", expiresAt: "" });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await instance.post("/coupon/create", data, { withCredentials: true });
    alert("Coupon created!");
  }

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">Create Coupon</h2>

      <form className="admin-form"
        onSubmit={handleSubmit}>

        <input className="admin-input"
          name="code"
          placeholder="NEW10"
          onChange={handleChange} />

        <input className="admin-input"
          name="discountPercent"
          type="number"
          placeholder="10"
          onChange={handleChange} />

        <input className="admin-input"
          name="expiresAt"
          type="date"
          onChange={handleChange} />


        <button className="admin-btn">Create Coupon</button>
      </form>
    </div>
  );
};

export default AdminCreateCoupon;
