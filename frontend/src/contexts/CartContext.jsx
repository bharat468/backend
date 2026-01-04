import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../axiosConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function fetchCartCount() {
    try {
      const res = await instance.get("/cart", {
        withCredentials: true,
      });

      // ✅ same clean logic as Cart page
      const cleanCart = res.data.filter(item => item.productId);

      // ✅ ONLY product length (NOT quantity)
      setCartCount(cleanCart.length);
    } catch (err) {
      console.log(err);
      setCartCount(0);
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
