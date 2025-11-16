// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create order
router.post("/", orderController.createOrder);

// Get all orders (you can protect this with auth later)
router.get("/", orderController.getOrders);

// Get single order
router.get("/:id", orderController.getOrderById);

module.exports = router;
