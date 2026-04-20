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

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS for local and deployed frontends
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes); // Maps GET /api/profile
app.use("/api/crypto", cryptoRoutes);

// README compatibility aliases (non-/api paths)
app.use("/", authRoutes);         // POST /register, POST /login, GET /logout
app.use("/profile", userRoutes);  // GET /profile
app.use("/crypto", cryptoRoutes); // GET /crypto, /crypto/gainers, /crypto/new, POST /crypto

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
