import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.warning("Please enter email & password");
      return;
    }

    try {
      setLoading(true);

      await instance.post(
        "/admin/login",
        data,
        { withCredentials: true }
      );

      toast.success("Admin login successful 🔐");
      navigate("/admin/home");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid admin credentials ❌"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        {/* TITLE */}
        <h2 className="text-center text-3xl font-bold text-slate-800">
          Admin Login
        </h2>
        <p className="text-center text-slate-500 mt-1 mb-8">
          Secure admin access
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              bg-slate-100 focus:outline-none focus:ring-2
              focus:ring-slate-800"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300
                bg-slate-100 focus:outline-none focus:ring-2
                focus:ring-slate-800"
                required
              />

              {/* SHOW / HIDE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2
                text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
              transition shadow-md flex items-center justify-center gap-2
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
