import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTag } from "react-icons/fa";
import Spinner from "../components/ui/Spinner";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { fetchCartCount } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      setLoading(true);
      const res = await instance.get("/cart");
      const cleanCart = res.data.filter(item => item.productId);
      setCart(cleanCart);
      fetchCartCount();
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UPDATE QTY ================= */
  async function updateQty(cartId, qty) {
    if (qty < 1) return;

    setCart(prev =>
      prev.map(item =>
        item._id === cartId ? { ...item, quantity: qty } : item
      )
    );

    try {
      await instance.put("/cart/update", { cartId, quantity: qty });
    } catch {
      toast.error("Failed to update quantity");
      getCart();
    }
  }

  /* ================= REMOVE ITEM ================= */
  async function removeItem(cartId) {
    setCart(prev => prev.filter(item => item._id !== cartId));

    try {
      await instance.delete(`/cart/remove/${cartId}`);
      toast.success("Item removed");
      fetchCartCount();
    } catch {
      toast.error("Failed to remove item");
      getCart();
    }
  }

  /* ================= TOTAL ================= */
  const totalAmount = cart.reduce((sum, item) => {
    const price =
      item.productId?.discountedPrice ??
      item.productId?.originalPrice ??
      0;

    return sum + price * item.quantity;
  }, 0);

  /* ================= APPLY COUPON ================= */
  async function applyCoupon() {
    try {
      const res = await instance.post("/coupon/verify", {
        code: couponCode,
      });

      if (res.data.valid) {
        const percent = res.data.discountPercent;
        const calc = (totalAmount * percent) / 100;

        setDiscountPercent(percent);
        setDiscountAmount(calc);
        toast.success(`Coupon applied! You saved ₹${calc.toFixed(2)}`);
      }
    } catch (error) {
      clearCoupon();
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  }

  function clearCoupon() {
    setCouponCode("");
    setDiscountPercent(0);
    setDiscountAmount(0);
    toast.info("Coupon cleared");
  }

  const finalAmount = totalAmount - discountAmount;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 xs:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 xs:mb-8"
        >
          Shopping Cart
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 xs:py-16 md:py-20"
          >
            <div className="w-24 h-24 xs:w-32 xs:h-32 mx-auto mb-4 xs:mb-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-4xl xs:text-5xl md:text-6xl text-white" />
            </div>
            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-4 px-4">
              Your cart is empty
            </h2>
            <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-6 xs:mb-8 px-4">
              Add some products to get started!
            </p>
            <a
              href="/"
              className="inline-block px-6 xs:px-8 py-2.5 xs:py-3 text-sm xs:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Continue Shopping
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 lg:gap-8">

            {/* LEFT - CART ITEMS */}
            <div className="lg:col-span-2 space-y-3 xs:space-y-4">
              {cart.map((item, index) => {
                
                const imgSrc = item.productId.image?.startsWith("http")
                  ? item.productId.image
                  : `${import.meta.env.VITE_BASEURL}${
                      item.productId.image?.startsWith("/") ? "" : "/"
                    }${item.productId.image}`;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-3 xs:p-4 md:p-6"
                  >
                    <div className="flex gap-3 xs:gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-lg xs:rounded-xl p-1 xs:p-2">
                        <img
                          src={imgSrc}
                          alt={item.productId?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="font-semibold text-sm xs:text-base md:text-lg text-gray-900 dark:text-white mb-1 xs:mb-2 line-clamp-2">
                          {item.productId?.name}
                        </h3>

                        <p className="text-lg xs:text-xl md:text-2xl font-bold gradient-text mb-2 xs:mb-3 md:mb-4">
                          ₹{" "}
                          {item.productId.discountedPrice ??
                            item.productId.originalPrice}
                        </p>

                        {/* Quantity & Delete */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 xs:gap-3 bg-gray-100 dark:bg-slate-700 rounded-lg xs:rounded-xl p-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQty(item._id, item.quantity - 1)
                              }
                              className="w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center bg-white dark:bg-slate-600 text-gray-700 dark:text-white rounded-md xs:rounded-lg hover:bg-purple-100 dark:hover:bg-purple-600 transition-colors"
                            >
                              <FaMinus className="text-xs xs:text-sm" />
                            </motion.button>

                            <span className="w-8 xs:w-10 md:w-12 text-center font-semibold text-sm xs:text-base text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQty(item._id, item.quantity + 1)
                              }
                              className="w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center bg-white dark:bg-slate-600 text-gray-700 dark:text-white rounded-md xs:rounded-lg hover:bg-purple-100 dark:hover:bg-purple-600 transition-colors"
                            >
                              <FaPlus className="text-xs xs:text-sm" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <FaTrash className="text-sm xs:text-base" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-4 xs:p-5 md:p-6 space-y-4 xs:space-y-5 md:space-y-6 lg:sticky lg:top-24"
              >
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                <div className="space-y-2 xs:space-y-3">
                  <div className="flex justify-between text-sm xs:text-base text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹ {totalAmount.toFixed(2)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-sm xs:text-base text-green-600 dark:text-green-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="font-semibold">-₹ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-3 xs:pt-4">
                  <div className="flex justify-between text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span className="gradient-text">₹ {finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="space-y-2 xs:space-y-3">
                  <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FaTag className="inline mr-2 text-sm" />
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 xs:px-4 py-2 xs:py-2.5 md:py-3 text-sm xs:text-base rounded-lg xs:rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={applyCoupon}
                      className="px-4 xs:px-5 md:px-6 py-2 xs:py-2.5 md:py-3 text-sm xs:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-lg transition-all"
                    >
                      Apply
                    </motion.button>
                  </div>

                  {discountPercent > 0 && (
                    <button
                      onClick={clearCoupon}
                      className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 underline transition-colors"
                    >
                      Remove coupon
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 xs:py-3.5 md:py-4 text-base xs:text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg xs:rounded-xl shadow-lg transition-all"
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-[10px] xs:text-xs text-center text-gray-500 dark:text-gray-400">
                  Secure checkout powered by ShopHub
                </p>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
