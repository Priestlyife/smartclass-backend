const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  items: [
    {
      courseId: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  delivery: {
    type: String,
    required: true,
    enum: ["door", "pickup"]
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["card", "transfer", "cod"]
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
