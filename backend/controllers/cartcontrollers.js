import Cart from "../models/cartmodel.js";

// Add product to cart
export async function addToCart(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Please login to add items to cart" });
    }

    const { productId, quantity = 1 } = req.body;
    const userId = req.userId;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Check if product already exists in user's cart
    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      // Update quantity instead of creating duplicate
      existing.quantity += quantity;
      await existing.save();
      
      return res.status(200).json({
        message: "Product quantity updated in cart",
        cart: existing,
        updated: true,
      });
    }

    // Create new cart item
    const cartItem = await Cart.create({ userId, productId, quantity });
    const populatedCart = await Cart.findById(cartItem._id).populate("productId");

    return res.status(201).json({ 
      message: "Product added to cart successfully",
      cart: populatedCart 
    });

  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Failed to add product to cart" });
  }
}

// Get user's cart
export async function getCart(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Please login to view cart" });
    }

    const cart = await Cart.find({ userId: req.userId })
      .populate("productId")
      .sort({ createdAt: -1 });

    // Filter out items where product no longer exists
    const validCart = cart.filter(item => item.productId);

    return res.status(200).json(validCart);
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
}

// Update cart item quantity
export async function updateCartQty(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Please login to update cart" });
    }

    const { cartId, quantity } = req.body;
    
    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Verify cart item belongs to user
    const cartItem = await Cart.findOne({ _id: cartId, userId: req.userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const updated = await Cart.findById(cartId).populate("productId");

    return res.status(200).json({ 
      message: "Quantity updated successfully", 
      cart: updated 
    });

  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Failed to update quantity" });
  }
}

// Remove item from cart
export async function removeCartItem(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Please login to remove items" });
    }

    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    // Verify cart item belongs to user before deleting
    const deleted = await Cart.findOneAndDelete({ 
      _id: cartId, 
      userId: req.userId 
    });

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ 
      message: "Item removed from cart successfully" 
    });

  } catch (error) {
    console.error("Remove cart item error:", error);
    return res.status(500).json({ message: "Failed to remove item" });
  }
}

// Clear entire cart for user
export async function clearCart(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Please login to clear cart" });
    }

    await Cart.deleteMany({ userId: req.userId });

    return res.status(200).json({ 
      message: "Cart cleared successfully" 
    });

  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({ message: "Failed to clear cart" });
  }
}

// Get cart count for user
export async function getCartCount(req, res) {
  try {
    if (!req.userId) {
      return res.status(200).json({ count: 0 });
    }

    const count = await Cart.countDocuments({ userId: req.userId });

    return res.status(200).json({ count });

  } catch (error) {
    console.error("Get cart count error:", error);
    return res.status(500).json({ message: "Failed to get cart count" });
  }
}
