// models/note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

const User = mongoose.model("Note", noteSchema);

module.exports = User;
