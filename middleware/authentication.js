// ./middleware/authentication.js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");

const SECRET = process.env.SECRET;

// Middleware para validar el token y asignar el usuario al objeto req.user
const authenticateToken = expressJwt.expressjwt({
  secret: SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false // Para manejar solicitudes sin token
});

// Middleware para asignar el usuario al objeto req.user
const assignUser = async (req, res, next) => {
  try {
    if (req.auth._id) {
      const user = await User.findById(req.auth._id);
      if (!user) {
        return res.status(401).end();
      }
      req.user = user;
      next();
    } else {
      // Puedes manejar el caso donde no hay información del usuario en el token
      return res.status(401).end();
    }
  } catch (e) {
    next(e);
    console.log(e);
    return res.status(401).end();
  }
};

// Middleware de autenticación completo
const isAuthenticated = [authenticateToken, assignUser];

module.exports = isAuthenticated;
