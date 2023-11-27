// ./routes/note.js
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const isAuthenticated = require("../middleware/authentication");

// Ruta para obtener todas las notas del usuario
router.get("/all", isAuthenticated, noteController.getAllNotes);

// Ruta para agregar una nueva nota
router.post("/add", isAuthenticated, noteController.addNote);

// Ruta para actualizar una nota existente
router.put("/update/:noteId", isAuthenticated, noteController.updateNote);

// Ruta para eliminar una nota
router.delete("/delete/:noteId", isAuthenticated, noteController.deleteNote);

module.exports = router;
