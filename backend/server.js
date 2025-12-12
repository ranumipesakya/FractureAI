const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Standard Middleware
app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"] 
}));
app.use(express.json()); // Allows server to accept JSON data
app.use(express.urlencoded({ extended: false })); // Allows URL-encoded data

// 4. Routes
app.use("/api/auth", require("./routes/userRoutes"));

// Test Route
app.get("/", (req, res) => res.send("✅ Backend is running successfully"));

// ---------------------------------------------
// 5. Error Middleware (Included directly here)
// ---------------------------------------------
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message,
    // Only show stack trace if not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Register the error handler (Must be AFTER routes)
app.use(errorHandler);

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));