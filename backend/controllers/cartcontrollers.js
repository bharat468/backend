import Cart from "../models/cartmodel.js";

export async function addToCart(req, res) {
    try {
        const data = req.body;
        data.userId = req.userId;
        const productInCart = new Cart(data);
        await productInCart.save();
        return res.status(201).json({ message: "product addedin cart", product: productInCart });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getCart(req, res) {
    try {
        const cart = await Cart.find({ userId: req.userId })
            .populate("productId");

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}