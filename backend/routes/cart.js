import { Router } from "express";
import { checkAuth } from "../middlewares/middlewaresAuth.js";
import {
  addToCart,
  getCart,
  updateCartQty,
  removeCartItem
} from "../controllers/cartcontrollers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);          // ✔ Fetch cart
cartRouter.post("/add", checkAuth, addToCart);    // ✔ Add item
cartRouter.put("/update", checkAuth, updateCartQty); // ✔ Update qty
cartRouter.delete("/remove/:cartId", checkAuth, removeCartItem); // ✔ Remove

export default cartRouter;
