import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) return;
    // ✅ phone → only numbers
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (
      !data.name ||
      !data.phone ||
      !data.username ||
      !data.email ||
      !data.password
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (data.phone.length !== 10) {
      toast.warning("Enter a valid 10 digit phone number");
      return;
    }

    // 🔐 PASSWORD VALIDATION
    if (!passwordRegex.test(data.password)) {
      toast.warning(
        "Password must be at least 8 characters and include 1 capital letter, 1 number, and 1 special character"
      );
      return;
    }

    try {
      setLoading(true);
      await instance.post("/user/register", data);
      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

        <h2 className="text-center text-3xl font-bold text-slate-800">
          Create Account
        </h2>
        <p className="text-center text-slate-500 mt-1 mb-8">
          Join us and start shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-slate-800"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={data.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-slate-800"
              required
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-slate-800"
              required
            />
          </div>

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
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-slate-800"
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
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-slate-100
                focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* PASSWORD HINT */}
            <p className="text-xs text-slate-500 mt-1">
              Must contain 1 capital letter, 1 number, 1 special character & minimum 8 characters
            </p>
          </div>

          <Link
            to="/login"
            className="block text-center text-sm text-slate-700 hover:underline"
          >
            Already have an account? Login
          </Link>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold
              bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
