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

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setData({ ...data, [name]: value });
  }

  async function sendOTP() {
    try {
      if (!data.email || !data.username || !data.phone) {
        return toast.warning("Fill email, phone & username first");
      }

      await instance.post("/user/send-otp", {
        email: data.email,
        username: data.username,
        phone: data.phone,
      });

      toast.success("OTP sent ✉️");
      setOtpSent(true);

      setTimer(30);
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) clearInterval(interval);
          return t - 1;
        });
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  }

  async function verifyOTP() {
    try {
      await instance.post("/user/verify-otp", {
        email: data.email,
        otp,
      });

      setVerified(true);
      toast.success("Verified 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Wrong OTP ❌");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!verified) return toast.warning("Please verify OTP first ❌");

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (
      !data.name ||
      !data.phone ||
      !data.username ||
      !data.email ||
      !data.password
    ) return toast.warning("Fill all fields");

    if (data.phone.length !== 10)
      return toast.warning("Enter valid 10-digit phone");

    if (!passwordRegex.test(data.password))
      return toast.warning(
        "Password must include 1 capital letter, 1 number, 1 special character"
      );

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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

        <h2 className="text-center text-3xl font-bold text-slate-800">
          Create Account
        </h2>
        <p className="text-center text-slate-500 mt-1 mb-8">
          Join us and start shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
            required
          />

          <input
            type="tel"
            name="phone"
            maxLength={10}
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
            required
          />

          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
              required
            />
            <button
              type="button"
              disabled={timer > 0}
              onClick={sendOTP}
              className={`px-3 rounded-lg text-white bg-blue-600 ${
                timer > 0 ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {timer > 0 ? `Wait ${timer}s` : "OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={verifyOTP}
                className="px-3 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Verify
              </button>
            </div>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-slate-100 focus:outline-none"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 cursor-pointer text-slate-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Link to="/login" className="block text-center text-sm text-slate-700 hover:underline">
            Already have an account? Login
          </Link>

          <button
            type="submit"
            disabled={!verified || loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              verified ? "bg-slate-900" : "bg-slate-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
