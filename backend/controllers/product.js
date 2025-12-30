import Product from "../models/productmodel.js"
import multer from "multer";


export async function addProduct(req, res) {
    try {
        const newRecord = req.body;
        newRecord.image = req.file.path;
        const newProduct = new Product(newRecord);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getSingleProduct(req, res) {
  try {
    const { slug } = req.params;
    if (!slug) {
      res.status(400).json({ message: "slug required" });
      return;
    }
    const singleProduct = await Product.find({slug:slug});
    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getProduct(req, res) {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedRecord = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }
        if (!updatedRecord) {
            return res    
                .status(400)
                .json({ message: "Updated product schema is required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedRecord, {
            new: true,
        });
        if (!updatedProduct)
            return res.status(404).json({ message: "Could not update this product" });
        return res
            .status(200)
            .json({ message: "Product Updated", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "ID not found" });
        }
        return res
            .status(200)
            .json({ message: "Product with id " + id + " successfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function checkSlug(req, res) {
    try {
        const { slug } = req.params
        if (!slug) {
            res.status(400).json({ message: "slug required" })
        }

        const existing = await Product.findOne({ slug })

        if (existing) {
            return res.status(400).json({ message: "Slug already exists" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}