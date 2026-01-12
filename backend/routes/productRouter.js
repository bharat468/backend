import Router from "express";
import {
  addProduct,
  checkSlug,
  deleteProduct,
  getProduct,
  getSingleProduct,
  suggestRelated,
  updateProduct
} from "../controllers/product.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.slug + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const productRouter = Router();

productRouter.get("/", getProduct);
productRouter.get("/:slug", getSingleProduct);
productRouter.get("/checkslug/:slug", checkSlug);

productRouter.post("/", upload.single("image"), addProduct);
productRouter.put("/:slug", upload.single("image"), updateProduct);
productRouter.delete("/:slug", deleteProduct);
productRouter.post("/related", suggestRelated);


export default productRouter;
