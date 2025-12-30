import { Router } from "express";
import { checkAuth } from "../middlewares/middlewaresAuth.js";
import { addToCart, getCart } from "../controllers/cartcontrollers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);

export default cartRouter;