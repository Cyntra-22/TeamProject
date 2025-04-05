const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const MONGO_URI = dotenv.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Pao:Pao0899646599@cluster0.mfqxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

module.exports = connectDB;
