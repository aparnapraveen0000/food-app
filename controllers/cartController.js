const cartModel = require("../model/cartModel.js");
const menuModel = require("../model/menuModel.js");
const { authUser } = require("../middlewares/authUser.js");

// Add item to cart
const addToCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const userId = req.user.id;
        const { foodId, quantity } = req.body;

        if (!foodId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid foodId or quantity" });
        }

        const foodItem = await menuModel.findById(foodId);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [], totalPrice: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ foodId, quantity, price: foodItem.price });
        }

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        await cart.save();

        res.status(200).json({ message: "Cart updated", data: cart });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Get user's cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({ userId }).populate("items.foodId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ data: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodId } = req.body;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        await cart.save();

        res.status(200).json({ message: "Item removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete entire cart
const deleteCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOneAndDelete({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart, deleteCart };
