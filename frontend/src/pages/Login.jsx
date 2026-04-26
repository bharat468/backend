import instance from "../axiosConfig";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() { 
  const { setIsLoggedIn, setLoading: setAuthLoading } = useAuth();
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  // Real-time validation
  function validateField(name, value) {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  function validateForm() {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const res = await instance.post("/user/login", data);
      
      if (res.status === 200) {
        toast.success("Login successful! Welcome back 🎉");
        setIsLoggedIn(true);
        setAuthLoading(false);
        localStorage.setItem("isLoggedIn", "true");
        
        await fetchCartCount();
        
        const nextPage = searchParams.get("nextPage");
        navigate(nextPage || "/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      
      if (errorMessage.toLowerCase().includes("email")) {
        setErrors({ ...errors, email: errorMessage });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ ...errors, password: errorMessage });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(res) {
    try {
      setLoading(true);
      await instance.post("/user/google-login", {
        token: res.credential,
      });
      
      toast.success("Google login successful 🔐");
      setIsLoggedIn(true);
      setAuthLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      
      await fetchCartCount();
      
      const nextPage = searchParams.get("nextPage");
      navigate(nextPage || "/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-3 xs:px-4 py-8 xs:py-12">
      <div className="w-full max-w-md">
        
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl xs:rounded-2xl shadow-2xl border border-slate-700/50 p-6 xs:p-8"
        >
          
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaShoppingBag className="text-2xl xs:text-3xl text-white" />
            </motion.div>
            <h2 className="text-2xl xs:text-3xl font-bold text-white mb-2">
              Welcome to ShopHub!
            </h2>
            <p className="text-sm xs:text-base text-gray-400">
              Login to continue shopping
            </p>
          </div>

          {/* Google Login */}
          <div className="mb-4 xs:mb-6">
            <div className="flex justify-center">
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Login Failed ❌")}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-6">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-gray-500 text-xs xs:text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">

            {/* Email Field */}
            <div>
              <label className="block text-xs xs:text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`w-full pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3 text-sm xs:text-base rounded-lg xs:rounded-xl border-2 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
              </div>
              {errors.email && touched.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs xs:text-sm text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs xs:text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className={`w-full pl-9 xs:pl-11 pr-9 xs:pr-11 py-2.5 xs:py-3 text-sm xs:text-base rounded-lg xs:rounded-xl border-2 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 xs:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs xs:text-sm text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.password}
                </motion.p>
              )}
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-2.5 xs:py-3 rounded-lg xs:rounded-xl text-white text-sm xs:text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-xs xs:text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Register Now
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
