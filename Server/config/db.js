const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/students");

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

 module.exports  =  connectDB;