const mongoose = require('mongoose')
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    phoneNo: { type: String, unique: true, required: true },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    interests: { type: [String], default: [] }, // List of interests
    profileImage: { type: String, default: "" }, // Base64 encoded profile image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
