// models/note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date }
});

const User = mongoose.model("Note", noteSchema);

module.exports = User;
