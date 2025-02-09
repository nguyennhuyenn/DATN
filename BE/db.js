const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/datn2025");
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
