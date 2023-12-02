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

router.get("/getNote/:noteId", isAuthenticated, noteController.getNoteById);

// Ruta comodín para manejar rutas no definidas
router.get("*", (req, res) => {
  res.status(404).send("Esta página no existe :(");
});

module.exports = router;
