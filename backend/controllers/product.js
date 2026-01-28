import Product from "../models/productmodel.js";
import cloudinary from "../middlewares/cloudinary.js"
import groq from "../utils/geminiClient.js";




/* ================= ADD PRODUCT ================= */
export async function addProduct(req, res) {
  try {
    const newRecord = req.body;
    // console.log(req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "product", })
      newRecord.image = result.secure_url
    }

    const newProduct = new Product(newRecord);
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error) 
    return res.status(500).json({ message: error.message });
  }
}

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

export async function getProduct(req, res) {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "slug required" });
    }

    const updatedData = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "product", })
      updatedData.image = result.secure_url
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


export async function suggestRelated(req, res) {
  try {
    const { title, category } = req.body;

    // Just find same category products except itself
    const related = await Product.find({
      category,
      name: { $ne: title }
    }).limit(6);

    return res.status(200).json(related);
  } catch (error) {
    console.log("Related error:", error);
    return res.status(500).json({ message: "Suggestion failed" });
  }
}




