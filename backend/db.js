const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No extra options needed
    console.log('MongoDB connected ✅');
  } catch (error) {
    console.error('MongoDB connection failed ❌', error);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;
