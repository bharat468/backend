import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaShoppingCart, FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Spinner from "../components/ui/Spinner";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { fetchCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  async function getSingleData() {
    try {
      setLoading(true);
      const res = await instance.get(`/product/${slug}`);
      setProduct(res.data);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRelated(category, title) {
    try {
      const res = await instance.post("/product/related", { title, category });
      setRelated(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkCart(prodId) {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      const found = res.data.find((i) => i.productId._id === prodId);
      if (found) setAlreadyInCart(true);
    } catch (error) {
      console.log(error);
    }
  }

  // Add to cart - redirects to login if not logged in
  async function handleAddToCart() {
    if (!isLoggedIn) {
      toast.info("Please login to add items to cart");
      navigate(`/login?nextPage=${encodeURIComponent(`/product/${slug}`)}`);
      return;
    }

    try {
      setBtnLoading(true);
      await instance.post(
        "/cart/add",
        { productId: product._id, quantity: quantity },
        { withCredentials: true }
      );
      setAlreadyInCart(true);
      fetchCartCount();
      toast.success("Product added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
    // Reset states when slug changes
    setAlreadyInCart(false);
    setQuantity(1);
    setRelated([]);
  }, [slug]);

  useEffect(() => {
    if (product) {
      fetchRelated(product.category, product.name);
      if (isLoggedIn) checkCart(product._id);
    }
  }, [product, isLoggedIn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const imgSrc =
    product.image?.startsWith("http")
      ? product.image
      : `${import.meta.env.VITE_BASEURL}${product.image?.startsWith("/") ? "" : "/"}${product.image}`;

  const discountPercentage = product.discountedPrice
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm xs:text-base text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <FaArrowLeft className="text-sm xs:text-base" />
          <span className="font-medium">Back</span>
        </motion.button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pb-12 xs:pb-14 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-6 xs:gap-8 lg:gap-12">
          
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl xs:rounded-2xl shadow-xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-200"
          >
            {discountPercentage > 0 && (
              <div className="mb-3 xs:mb-4">
                <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-bold">
                  {discountPercentage}% OFF
                </span>
              </div>
            )}
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-auto max-h-[300px] xs:max-h-[400px] md:max-h-[500px] object-contain bg-white"
            />
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 xs:space-y-5 sm:space-y-6"
          >
            {/* Category */}
            <div>
              <span
                onClick={() => navigate(`/category/${product.category}`)}
                className="inline-block text-xs xs:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer uppercase tracking-wide"
              >
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm xs:text-base" />
                ))}
              </div>
              <span className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">(4.5 / 5)</span>
              <span className="text-xs xs:text-sm text-gray-500 dark:text-gray-500">• 128 reviews</span>
            </div>

            {/* Price */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 xs:p-5 sm:p-6 border border-purple-100 dark:border-purple-800">
              <div className="flex flex-wrap items-center gap-3 xs:gap-4">
                {product.discountedPrice ? (
                  <>
                    <div className="flex items-center text-3xl xs:text-4xl font-bold text-purple-600 dark:text-purple-400">
                      <PiCurrencyInrLight className="text-3xl xs:text-4xl" />
                      <span>{product.discountedPrice}</span>
                    </div>
                    <div className="flex items-center text-lg xs:text-xl text-gray-400 line-through">
                      <PiCurrencyInrLight />
                      <span>{product.originalPrice}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-3xl xs:text-4xl font-bold text-gray-900 dark:text-white">
                    <PiCurrencyInrLight className="text-3xl xs:text-4xl" />
                    <span>{product.originalPrice}</span>
                  </div>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-xs xs:text-sm text-green-600 dark:text-green-400 mt-2">
                  You save ₹{product.originalPrice - product.discountedPrice} ({discountPercentage}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description || "High-quality product with excellent features and durability. Perfect for everyday use."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white mb-2 xs:mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-3 xs:space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center font-bold text-sm xs:text-base text-gray-700 dark:text-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="text-lg xs:text-xl font-semibold text-gray-900 dark:text-white w-10 xs:w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center font-bold text-sm xs:text-base text-gray-700 dark:text-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={alreadyInCart || btnLoading}
              className={`w-full py-3 xs:py-3.5 sm:py-4 rounded-xl font-bold text-base xs:text-lg flex items-center justify-center space-x-2 shadow-lg transition-all ${
                alreadyInCart
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              }`}
            >
              <FaShoppingCart className="text-sm xs:text-base" />
              <span>
                {btnLoading ? "Adding..." : alreadyInCart ? "Already in Cart" : "Add to Cart"}
              </span>
            </motion.button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 xs:gap-4 pt-3 xs:pt-4">
              <div className="flex items-center space-x-2 xs:space-x-3 p-3 xs:p-4 bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl border border-gray-200 dark:border-slate-700">
                <FaTruck className="text-xl xs:text-2xl text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">Free Delivery</p>
                  <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 xs:space-x-3 p-3 xs:p-4 bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl border border-gray-200 dark:border-slate-700">
                <FaShieldAlt className="text-xl xs:text-2xl text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400">100% Protected</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12 xs:mt-14 sm:mt-16">
            <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 xs:mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 xs:gap-4 md:gap-6">
              {related.map((item) => {
                const img =
                  item.image?.startsWith("http")
                    ? item.image
                    : `${import.meta.env.VITE_BASEURL}${item.image?.startsWith("/") ? "" : "/"}${item.image}`;

                return (
                  <motion.div
                    key={item._id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/product/${item.slug}`)}
                    className="cursor-pointer bg-slate-800 rounded-lg xs:rounded-xl shadow-md hover:shadow-xl p-3 xs:p-4 transition-all border border-slate-700"
                  >
                    <div className="bg-white rounded-lg mb-2 xs:mb-3 p-2">
                      <img
                        src={img}
                        className="h-32 xs:h-36 sm:h-40 w-full object-contain"
                        alt={item.name}
                      />
                    </div>
                    <p className="font-medium line-clamp-2 text-xs xs:text-sm text-white mb-1 xs:mb-2">
                      {item.name}
                    </p>
                    <p className="text-purple-400 font-bold flex items-center text-xs xs:text-sm">
                      <PiCurrencyInrLight size={14} className="xs:w-4 xs:h-4" />
                      {item.discountedPrice || item.originalPrice}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
