import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../axiosConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function fetchCartCount() {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      setCartCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
