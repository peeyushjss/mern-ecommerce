import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    // Fetch cart items for the user
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
      const product = item.productId;
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      return {
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      };
    });

    for (let x of cart.items) {
      const product = await Product.findById(x.productId);
      if (product.stock < x.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }
    }

    // Reduce stock for each product
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    // Create new order
    const newOrder = new Order({
      userId,
      products: orderItems,
      totalAmount,
      addressId,
      paymentMethod: "cod" // Default to Cash on Delivery, can be updated based on user selection
    });

    await newOrder.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};