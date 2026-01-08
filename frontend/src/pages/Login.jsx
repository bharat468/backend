import instance from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() { 
  const { checkIsLoggedIn, setIsLoggedIn } = useAuth();
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

    try {
      const res = await instance.post("/user/login", data);
      if (res.status === 200) {
        checkIsLoggedIn();

        const params = new URLSearchParams(window.location.search);
        const nextPage = params.get("nextPage");

        navigate(nextPage || "/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  }

  async function handleGoogleSuccess(res) {
    try {
      setLoading(true);
      await instance.post("/user/google-login", {
        token: res.credential,
      });
      setIsLoggedIn(true);
      toast.success("Google login successful 🔐");
      navigate("/");
    } catch {
      toast.error("Google login failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

        <h2 className="text-center text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>
        <p className="text-center text-slate-500 mt-1 mb-8">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              bg-slate-100 focus:outline-none focus:ring-2
              focus:ring-slate-800"
              required
            />
          </div>

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
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300
                bg-slate-100 focus:outline-none focus:ring-2
                focus:ring-slate-800"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <Link
            to="/register"
            className="block text-center text-sm font-medium text-slate-700 hover:underline"
          >
            Don’t have an account? Register
          </Link>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
              transition shadow-md
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed ❌")}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
