// models/note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    isActive: Boolean = { default: true },
    category: String,
  // Otros campos del usuario según tus necesidades
});

const User = mongoose.model('Note', noteSchema);

module.exports = User;
