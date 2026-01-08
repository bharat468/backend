import { Router } from "express";
import { checkAuth } from "../middlewares/middlewaresAuth.js";
import {
  addToCart,
  getCart,
  updateCartQty,
  removeCartItem
} from "../controllers/cartcontrollers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);         
cartRouter.post("/add", checkAuth, addToCart);   
cartRouter.put("/update", checkAuth, updateCartQty); 
cartRouter.delete("/remove/:cartId", checkAuth, removeCartItem); 

export default cartRouter;
