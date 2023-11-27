// models/note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true }
  // Otros campos del usuario según tus necesidades
});

const User = mongoose.model("Note", noteSchema);

module.exports = User;
