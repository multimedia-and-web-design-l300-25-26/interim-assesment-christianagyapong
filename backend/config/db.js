const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error("Will retry connection in 5s...");
    // Don't exit the process on initial failure in production hosts like Render.
    // Retry the connection after a short delay so the service can recover when
    // network or Atlas whitelist changes are applied.
    setTimeout(() => connectDB(), 5000);
  }
};

module.exports = connectDB;
