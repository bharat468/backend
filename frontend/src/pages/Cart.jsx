import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { fetchCartCount } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      setLoading(true);
      const res = await instance.get("/cart", { withCredentials: true });
      setCart(res.data);
      fetchCartCount();
    } catch (error) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  async function updateQty(cartId, qty) {
    if (qty < 1) return;
    try {
      await instance.put(
        "/cart/update",
        { cartId, quantity: qty },
        { withCredentials: true }
      );
      getCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  }

  async function removeItem(cartId) {
    try {
      await instance.delete(`/cart/remove/${cartId}`, {
        withCredentials: true,
      });
      toast.success("Item removed from cart");
      getCart();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  }

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum +
      (item.productId.discountedPrice ||
        item.productId.originalPrice) *
        item.quantity,
    0
  );

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
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  }

  const finalAmount = totalAmount - discountAmount;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-40 mb-8"></div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl p-4 mb-4 flex gap-4"
          >
            <div className="w-24 h-24 bg-slate-200 rounded"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-8 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-slate-500 text-center py-20">
            Your cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4"
                >
                  <img
                    src={`${instance.defaults.baseURL}/${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-24 h-24 object-contain bg-slate-100 rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {item.productId.name}
                    </h3>

                    <p className="text-teal-600 font-bold mt-1">
                      ₹{" "}
                      {item.productId.discountedPrice ||
                        item.productId.originalPrice}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQty(item._id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item._id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <p className="flex justify-between">
                <span>Total</span>
                <span>₹ {totalAmount.toFixed(2)}</span>
              </p>

              {/* COUPON */}
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={applyCoupon}
                  className="bg-teal-600 text-white px-4 rounded hover:bg-teal-700"
                >
                  Apply
                </button>
              </div>

              {discountPercent > 0 && (
                <p className="text-green-600">
                  Discount ({discountPercent}%): -₹{" "}
                  {discountAmount.toFixed(2)}
                </p>
              )}

              <hr />

              <p className="flex justify-between font-bold text-lg">
                <span>Final Amount</span>
                <span>₹ {finalAmount.toFixed(2)}</span>
              </p>

              <button className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
