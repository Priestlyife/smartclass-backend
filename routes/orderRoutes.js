const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

router.post("/", async (req, res) => {
  console.log("📥 Incoming Order:", req.body);  // <--- ADD THIS
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// CREATE ORDER (POST)
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
