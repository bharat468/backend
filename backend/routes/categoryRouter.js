import { Router } from "express";
import { addcategory, getcategory } from "../controllers/category.js";


const categoryRouter = Router()

categoryRouter.get("/", getcategory)
categoryRouter.post("/add", addcategory)

export default categoryRouter