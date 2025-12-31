import Cart from "../models/cartmodel.js";

// ➕ ADD ITEM TO CART
export async function addToCart(req, res) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId, quantity = 1 } = req.body;
    const userId = req.userId;

    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      return res.status(200).json({
        message: "Product already in cart, update quantity from cart page!",
        alreadyInCart: true,
      });
    }

    await Cart.create({ userId, productId, quantity });

    return res.status(201).json({ message: "Product added to cart" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// 🧾 GET CART for logged user
export async function getCart(req, res) {
  try {
    const cart = await Cart.find({ userId: req.userId })
      .populate("productId");

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// 🔁 UPDATE QUANTITY
export async function updateCartQty(req, res) {
  try {
    const { cartId, quantity } = req.body;
    if (!cartId || quantity < 1)
      return res.status(400).json({ message: "Invalid quantity" });

    const updated = await Cart.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Cart item not found" });

    return res.status(200).json({ message: "Quantity updated", updated });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// ❌ REMOVE ITEM
export async function removeCartItem(req, res) {
  try {
    const { cartId } = req.params;
    const deleted = await Cart.findByIdAndDelete(cartId);

    if (!deleted)
      return res.status(404).json({ message: "Cart item not found" });

    return res.status(200).json({ message: "Item removed" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
