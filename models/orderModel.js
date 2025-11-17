const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },

  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
      image: String,
      category: String,
      instructor: String
    }
  ],

  delivery: { type: String, enum: ["standard", "express"], required: true },

  totalPrice: { type: Number, required: true },

  paymentMethod: { type: String, enum: ["card", "paypal"], required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
