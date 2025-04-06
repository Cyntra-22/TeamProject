const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    phoneNo: { type: String, unique: true, sparse: true },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    role: { type: String, enum: ["user", "artist"], default: "user" },
    interests: { type: [String], default: [] }, 
    profileImage: { type: String, default: "" },
    createdWhen: { type: Date, default: Date.now },
    updatedWhen: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
