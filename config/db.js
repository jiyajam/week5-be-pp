// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Helpful error if MONGO_URI is missing
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

module.exports = connectDB;
