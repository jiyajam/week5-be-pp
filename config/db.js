// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use your own MongoDB URI here or put it in .env as MONGO_URI
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tours-db';

    await mongoose.connect(mongoURI, {
      // options are optional in newer Mongoose versions
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

module.exports = connectDB;
