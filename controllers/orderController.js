// backend/controllers/orderController.js
const Order = require("../models/orderModel");

/**
 * Create a new order
 * POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      items,
      delivery,
      paymentMethod,
      totalPrice
    } = req.body;

    // Basic validation (extend if you want)
    if (!firstName || !lastName || !email || !phone || !address || !city || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const order = new Order({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      items,
      delivery: delivery || "door",
      paymentMethod: paymentMethod || "card",
      totalPrice
    });

    const saved = await order.save();
    return res.status(201).json({ message: "Order created", order: saved });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ message: "Server error creating order" });
  }
};

/**
 * Get all orders (admin)
 * GET /api/orders
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("getOrders error:", err);
    return res.status(500).json({ message: "Server error fetching orders" });
  }
};

/**
 * Get single order by id
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (err) {
    console.error("getOrderById error:", err);
    return res.status(500).json({ message: "Server error fetching order" });
  }
};
