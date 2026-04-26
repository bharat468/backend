import React, { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedIn, loading } = useAuth();

  async function fetchCartCount() {
    if (!isLoggedIn) {
      setCartCount(0);
      localStorage.setItem("cartCount", "0");
      return;
    }

    try {
      const res = await instance.get("/cart");
      const cleanCart = res.data.filter(item => item.productId);
      const count = cleanCart.length;
      setCartCount(count);
      localStorage.setItem("cartCount", count.toString());
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartCount(0);
      localStorage.setItem("cartCount", "0");
    }
  }

  // Only fetch cart count AFTER auth loading is done
  useEffect(() => {
    // Don't do anything while auth is still loading
    if (loading) return;

    if (isLoggedIn) {
      fetchCartCount();
    } else {
      setCartCount(0);
      localStorage.setItem("cartCount", "0");
    }
  }, [isLoggedIn, loading]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
