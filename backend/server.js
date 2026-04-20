const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS explicitly for frontend (assuming it runs on port 5500 or similar live server port, but allowing all for development)
app.use(cors({
  origin: true,
  credentials: true
}));

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes); // Maps GET /api/profile
app.use("/api/crypto", cryptoRoutes);

// Base route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
