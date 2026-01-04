import Product from "../models/productmodel.js";

/* ================= ADD PRODUCT ================= */
export async function addProduct(req, res) {
  try {
    const newRecord = req.body;

    if (req.file) {
      newRecord.image = req.file.path;
    }

    const newProduct = new Product(newRecord);
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET SINGLE PRODUCT (BY SLUG) ================= */
export async function getSingleProduct(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "slug required" });
    }

    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET ALL PRODUCTS ================= */
export async function getProduct(req, res) {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= UPDATE PRODUCT (BY SLUG) ================= */
export async function updateProduct(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "slug required" });
    }

    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= DELETE PRODUCT (BY SLUG) ================= */
export async function deleteProduct(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "slug required" });
    }

    const deletedProduct = await Product.findOneAndDelete({ slug });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= CHECK SLUG ================= */
export async function checkSlug(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "slug required" });
    }

    const existing = await Product.findOne({ slug });

    if (existing) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    return res.status(200).json({ message: "Slug available" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
