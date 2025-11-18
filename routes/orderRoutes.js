const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// CREATE ORDER (POST)
router.post("/", async (req, res) => {
  console.log("📥 Incoming Order:", req.body);

  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      message: "Order saved successfully",
      order
    });
  } catch (err) {
    console.error("❌ Order Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
