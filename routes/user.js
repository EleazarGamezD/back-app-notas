// ./routes/user.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta para registrar un nuevo usuario
router.post("/register", userController.registerUser);

// Ruta para iniciar sesión
router.post("/login", userController.loginUser);

/*  Deprecados por el middleware de autenticación */
/* // Ruta para obtener un usuario por ID
router.get("/:id", userController.getUserById);

// Ruta para obtener todos los usuarios
router.get("/", userController.getAllUsers);
 */

// Ruta comodín para manejar rutas no definidas
router.get("*", (req, res) => {
  res.status(404).send("Esta página no existe :(");
});

module.exports = router;
