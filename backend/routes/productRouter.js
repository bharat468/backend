import Router from "express";
import { addProduct, checkSlug, deleteProduct, getProduct, getSingleProduct, updateProduct } from "../controllers/product.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, fill, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const filename = req.body.slug + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const productRouter = Router()

productRouter.get("/", getProduct)
productRouter.get("/:slug", getSingleProduct)
productRouter.post("/", upload.single("image"), addProduct)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)
productRouter.get("/checkslug/:slug", checkSlug)

export default productRouter
