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
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, phone, username, email, password } = data;

    if (!name || !phone || !username || !email || !password) {
      return toast.warning("Please fill all fields");
    }

    if (phone.length !== 10) {
      return toast.warning("Enter valid 10-digit phone");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      return toast.warning(
        "Password must include 1 Capital, 1 Number & 1 Special Character"
      );
    }

    try {
      setLoading(true);
      await instance.post("/user/register", data);
      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
        <h2 className="text-center text-3xl font-bold text-slate-800">
          Create Account
        </h2>
        <p className="text-center text-slate-500 mt-1 mb-8">
          Simple & Secure Registration
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-slate-100"
          />

          <input
            type="tel"
            name="phone"
            maxLength={10}
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-slate-100"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-slate-100"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-slate-100"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 rounded-lg border bg-slate-100"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 cursor-pointer text-slate-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-slate-900 hover:bg-slate-800"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <Link
            to="/login"
            className="block text-center text-sm text-slate-700 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
