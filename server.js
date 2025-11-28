const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { connectDB } = require("./db");
const courseRoutes = require("./courseRoutes");   // <- correct location
const orderRoutes = require("./orderRoutes");     // <- correct location

const app = express();

/* ---------------------------
   LOGGER MIDDLEWARE
---------------------------- */
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

/* ---------------------------
   CORS
---------------------------- */
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://priestlyife.github.io"
  ],
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* ---------------------------
   STATIC IMAGE MIDDLEWARE
---------------------------- */
app.use("/images", (req, res) => {
  const filePath = path.join(__dirname, "public", "images", req.path);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).json({ error: "Image not found" });
});

/* ---------------------------
   API ROUTES
---------------------------- */
app.use("/", courseRoutes);
app.use("/", orderRoutes);

/* ---------------------------
   DEFAULT ROUTE
---------------------------- */
app.get("/", (req, res) => {
  res.send("SmartClass Backend API is running...");
});

/* ---------------------------
   START SERVER AFTER DB CONNECTS
---------------------------- */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  });
