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
  expiresIn: "1h" // Configura el tiempo de expiración a 1 hora
});

// Middleware para asignar el usuario al objeto req.user
const assignUser = async (req, res, next) => {
  try {
    if (req.auth._id) {
      const user = await User.findById(req.auth._id);
      if (!user) {
        return res.status(401).json({ error: "Token inválido" });
      }
      req.user = user;
      next();
    } else {
      // Puedes manejar el caso donde no hay información del usuario en el token
      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (e) {
    next(e);
    console.log(e);
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // Token expirado
    return res.status(401).json({ error: "Token expirado" });
  }

  // Otros casos de error
  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
};

// Middleware de autenticación completo
const isAuthenticated = [authenticateToken, assignUser, errorHandler];

module.exports = isAuthenticated;
