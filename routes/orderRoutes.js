// orderRoutes.js – ORDER ROUTES with native MongoDB

const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");  

const router = express.Router();

/**
 * POST /order
 
 */
router.post("/order", async (req, res) => {
  try {
    const db = getDB();
    const orderData = req.body; // { name, phone, cart: [...] }

    const result = await db.collection("orders").insertOne(orderData);

    res.status(201).json({
      message: "Order created successfully",
      orderId: result.insertedId
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 POST /api/orders 
 */
router.post("/api/orders", async (req, res) => {
  try {
    const db = getDB();
    const orderData = req.body;

    const result = await db.collection("orders").insertOne(orderData);

    res.status(201).json({
      message: "Order created successfully",
      orderId: result.insertedId
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
