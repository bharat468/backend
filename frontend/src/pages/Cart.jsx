import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      setCart(res.data);
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
      sum + item.productId.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={`http://localhost:3000/${item.productId.image}`}
                  alt={item.productId.name}
                />

                <div className="cart-details">
                  <h3>{item.productId.name}</h3>
                  <p>₹ {item.productId.discountedPrice}</p>

                  <div className="qty-box">
                    <button
                      onClick={() =>
                        updateQty(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
