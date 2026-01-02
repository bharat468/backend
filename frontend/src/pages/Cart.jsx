import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useCart } from "../contexts/CartContext";
import "../App.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { fetchCartCount } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      setCart(res.data);
      fetchCartCount();
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  async function removeItem(cartId) {
    try {
      await instance.delete(`/cart/remove/${cartId}`, {
        withCredentials: true,
      });
      getCart();
    } catch (error) {
      console.log(error);
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
        setDiscountPercent(percent);
        const calc = (totalAmount * percent) / 100;
        setDiscountAmount(calc);
        alert(`Coupon Applied! You saved ₹${calc}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid coupon");
    }
  }

  const finalAmount = totalAmount - discountAmount;

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  className="cart-img"
                  src={`${instance.defaults.baseURL}/${item.productId.image}`}
                  alt={item.productId.name}
                />

                <div className="cart-details">
                  <h3>{item.productId.name}</h3>

                  <p className="cart-price">
                    ₹{" "}
                    {item.productId.discountedPrice ||
                      item.productId.originalPrice}
                  </p>

                  <div className="qty-box">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQty(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQty(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹ {totalAmount}</h2>

            <div className="coupon-box">
              <input
                className="coupon-input"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="coupon-btn" onClick={applyCoupon}>
                Apply
              </button>
            </div>

            {discountPercent > 0 && (
              <p className="discount-text">
                Discount ({discountPercent}%): -₹{" "}
                {discountAmount.toFixed(2)}
              </p>
            )}

            <h2 className="final-amount">
              Final Amount: ₹ {finalAmount.toFixed(2)}
            </h2>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
