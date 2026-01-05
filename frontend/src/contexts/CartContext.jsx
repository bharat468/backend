import React, { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedIn } = useAuth();

  async function fetchCartCount() {
    try {
      const res = await instance.get("/cart");

      const cleanCart = res.data.filter(item => item.productId);
      setCartCount(cleanCart.length);
    } catch {
      setCartCount(0);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
