// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    
  // Otros campos del usuario según tus necesidades
});

const User = mongoose.model('User', userSchema);

module.exports = User;
