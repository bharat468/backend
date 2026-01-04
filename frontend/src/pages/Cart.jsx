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

  /* ================= FETCH CART ================= */
  async function getCart() {
    try {
      setLoading(true);
      const res = await instance.get("/cart", { withCredentials: true });

      // ✅ remove broken cart items (product deleted)
      const cleanCart = res.data.filter(item => item.productId);
      setCart(cleanCart);

      fetchCartCount();
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UPDATE QTY (NO PAGE RELOAD) ================= */
  async function updateQty(cartId, qty) {
    if (qty < 1) return;

    // ✅ instant UI update (optimistic)
    setCart(prev =>
      prev.map(item =>
        item._id === cartId
          ? { ...item, quantity: qty }
          : item
      )
    );

    try {
      await instance.put(
        "/cart/update",
        { cartId, quantity: qty },
        { withCredentials: true }
      );
    } catch {
      toast.error("Failed to update quantity");
      getCart(); // fallback
    }
  }

  /* ================= REMOVE ITEM ================= */
  async function removeItem(cartId) {
    // ✅ instant remove from UI
    setCart(prev => prev.filter(item => item._id !== cartId));

    try {
      await instance.delete(`/cart/remove/${cartId}`, {
        withCredentials: true,
      });
      toast.success("Item removed");
      fetchCartCount();
    } catch {
      toast.error("Failed to remove item");
      getCart();
    }
  }

  /* ================= TOTAL (100% SAFE) ================= */
  const totalAmount = cart.reduce((sum, item) => {
    if (!item.productId) return sum;

    const price =
      item.productId.discountedPrice ??
      item.productId.originalPrice ??
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
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  }

  const finalAmount = totalAmount - discountAmount;

  /* ================= LOADING ================= */
  if (loading) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-slate-500 py-20">
            Your cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4"
                >
                  <img
                    src={`${instance.defaults.baseURL}/${item.productId?.image}`}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-contain bg-slate-100 rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.productId?.name || "Product removed"}
                    </h3>

                    <p className="text-teal-600 font-bold mt-1">
                      ₹{" "}
                      {item.productId
                        ? item.productId.discountedPrice ??
                          item.productId.originalPrice
                        : 0}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQty(item._id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-slate-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQty(item._id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-slate-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <p className="flex justify-between">
                <span>Total</span>
                <span>₹ {totalAmount.toFixed(2)}</span>
              </p>

              <div className="flex gap-2">
                <input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="border px-3 py-2 rounded flex-1"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-teal-600 text-white px-4 rounded"
                >
                  Apply
                </button>
              </div>

              {discountPercent > 0 && (
                <p className="text-green-600">
                  Discount: -₹ {discountAmount.toFixed(2)}
                </p>
              )}

              <hr />

              <p className="flex justify-between font-bold text-lg">
                <span>Final</span>
                <span>₹ {finalAmount.toFixed(2)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
