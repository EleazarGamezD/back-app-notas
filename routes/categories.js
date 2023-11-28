// ./routes/category.js

const isAuthenticated = require("../middleware/authentication");
const categoryController = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

// Ruta para obtener todas las categorías del usuario
router.get("/all", isAuthenticated, categoryController.getAllCategories);

// Ruta para crear una nueva categoría
router.post("/create", isAuthenticated, categoryController.createCategory);

// Ruta comodín para manejar rutas no definidas
router.get("*", (req, res) => {
  res.status(404).send("Esta página no existe :(");
});

module.exports = router;
