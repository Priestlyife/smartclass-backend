const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Course = require("../models/course");   // <-- Make sure this path is correct

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Order:", req.body);

    // 1️⃣ Save the order
    const order = new Order(req.body);
    await order.save();

    // 2️⃣ Update each course availability
    const items = req.body.items || [];

    for (let item of items) {
      if (!item._id) continue;

      await Course.findByIdAndUpdate(
        item._id,
        { $inc: { available: -item.quantity } }
      );
    }

    // 3️⃣ Return success
    res.status(201).json({
      message: "Order saved & availability updated",
      order
    });

  } catch (err) {
    console.error("❌ Order Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
