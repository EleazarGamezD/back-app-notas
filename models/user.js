// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true }

  // Otros campos del usuario según tus necesidades
});

const User = mongoose.model("User", userSchema);

module.exports = User;
