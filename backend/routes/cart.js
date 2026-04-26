import { Router } from "express";
import { checkAuth } from "../middlewares/middlewaresAuth.js";
import {
  addToCart,
  getCart,
  updateCartQty,
  removeCartItem,
  clearCart,
  getCartCount
} from "../controllers/cartcontrollers.js";

const cartRouter = Router();

// Get user's cart
cartRouter.get("/", checkAuth, getCart);

// Get cart count
cartRouter.get("/count", checkAuth, getCartCount);

// Add product to cart
cartRouter.post("/add", checkAuth, addToCart);

// Update cart item quantity
cartRouter.put("/update", checkAuth, updateCartQty);

// Remove item from cart
cartRouter.delete("/remove/:cartId", checkAuth, removeCartItem);

// Clear entire cart
cartRouter.delete("/clear", checkAuth, clearCart);

export default cartRouter;
