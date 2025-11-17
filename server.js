const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const courseRoutes = require('./routes/courseRoutes');
const orderRoutes = require('./routes/orderRoutes');   // ✅ MUST be here at the top

const app = express();

// Middleware
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Serve frontend files
app.use(express.static("frontend"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);    // ✅ MUST be here BEFORE app.listen()

// Default route
app.get('/', (req, res) => {
  res.send('SmartClass Backend API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
