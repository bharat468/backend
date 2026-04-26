import instance from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaShoppingBag, FaPhone, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";

function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setLoading: setAuthLoading } = useAuth();
  const { fetchCartCount } = useCart();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Password strength indicator
  function getPasswordStrength(password) {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-orange-500" },
      { strength: 3, label: "Good", color: "bg-yellow-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" },
    ];

    return levels[strength];
  }

  // Real-time validation
  function validateField(name, value) {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name can only contain letters and spaces";
        }
        break;

      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (value.trim().length < 3) {
          error = "Username must be at least 3 characters";
        } else if (value.trim().length > 20) {
          error = "Username must be less than 20 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores";
        } else if (/^\d/.test(value)) {
          error = "Username cannot start with a number";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(value.replace(/\s/g, ''))) {
          error = "Phone number must be exactly 10 digits";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (value.length > 50) {
          error = "Password must be less than 50 characters";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== data.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    // Special handling for phone - only allow numbers
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setData({ ...data, [name]: numericValue });
    } else {
      setData({ ...data, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, name === "phone" ? value.replace(/\D/g, '') : value);
      setErrors({ ...errors, [name]: error });
    }

    // Also revalidate confirmPassword when password changes
    if (name === "password" && touched.confirmPassword) {
      const confirmError = data.confirmPassword !== value ? "Passwords do not match" : "";
      setErrors({ ...errors, password: "", confirmPassword: confirmError });
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate on blur
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  function validateForm() {
    const newErrors = {};

    // Validate all fields
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(data).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

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
      const { confirmPassword, ...registerData } = data;
      const res = await instance.post("/user/register", registerData);
      
      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful! Please login 🎉");
        
        // Clear form
        setData({
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setTouched({});
        
        // Redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      
      // Set specific field errors based on error message
      if (errorMessage.toLowerCase().includes("username")) {
        setErrors({ username: errorMessage });
        setTouched({ ...touched, username: true });
      } else if (errorMessage.toLowerCase().includes("email")) {
        setErrors({ email: errorMessage });
        setTouched({ ...touched, email: true });
      } else if (errorMessage.toLowerCase().includes("phone")) {
        setErrors({ phone: errorMessage });
        setTouched({ ...touched, phone: true });
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
      
      // Fetch cart count immediately
      await fetchCartCount();
      
      navigate("/");
    } catch (error) {
      console.error("Google registration error:", error);
      toast.error("Google registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = getPasswordStrength(data.password);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-3 xs:px-4 py-8 xs:py-12">
      <div className="w-full max-w-md">
        
        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl xs:rounded-2xl shadow-2xl border border-slate-700/50 p-6 xs:p-8 max-h-[90vh] overflow-y-auto"
        >
          
          {/* Header */}
          <div className="text-center mb-4 xs:mb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-3 xs:mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaShoppingBag className="text-2xl xs:text-3xl text-white" />
            </motion.div>
            <h2 className="text-2xl xs:text-3xl font-bold text-white mb-1 xs:mb-2">
              Join ShopHub Today
            </h2>
            <p className="text-xs xs:text-sm text-gray-400">
              Your premium shopping destination awaits
            </p>
          </div>

          {/* Google Login */}
          <div className="mb-4 xs:mb-5">
            <div className="flex justify-center">
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Registration Failed ❌")}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-5">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-gray-500 text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full pl-9 pr-3 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.name && touched.name && data.name
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                {!errors.name && touched.name && data.name && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
                )}
              </div>
              {errors.name && touched.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.name}
                </motion.p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Username <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Choose a username"
                  className={`w-full pl-9 pr-3 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.username && touched.username
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.username && touched.username && data.username
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                {!errors.username && touched.username && data.username && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
                )}
              </div>
              {errors.username && touched.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.username}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`w-full pl-9 pr-3 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.email && touched.email && data.email
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                {!errors.email && touched.email && data.email && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
                )}
              </div>
              {errors.email && touched.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  className={`w-full pl-9 pr-3 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.phone && touched.phone
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.phone && touched.phone && data.phone
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                {!errors.phone && touched.phone && data.phone && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
                )}
              </div>
              {errors.phone && touched.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a password"
                  className={`w-full pl-9 pr-9 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.password && touched.password && data.password
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {data.password && (
                <div className="mt-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Strength:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.strength <= 2 ? 'text-red-400' :
                      passwordStrength.strength === 3 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.password && touched.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className={`w-full pl-9 pr-9 py-2 xs:py-2.5 text-sm rounded-lg border-2 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : !errors.confirmPassword && touched.confirmPassword && data.confirmPassword
                      ? "border-green-500 focus:ring-green-500"
                      : "border-slate-600 focus:ring-purple-500"
                  } bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
                {!errors.confirmPassword && touched.confirmPassword && data.confirmPassword && (
                  <FaCheckCircle className="absolute right-9 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
                )}
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* Register Button */}
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-xs xs:text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
