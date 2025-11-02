const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  instructor: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  available: { type: Number, default: 0 },
  location: { type: String },
  image: { type: String },
  details: [String]
});

module.exports = mongoose.model('Course', courseSchema);
