// ./routes/note.js

const express = require('express');
const router = express.Router();

// Ruta para obtener todas las notas del usuario
router.get('/', (req, res) => {
  // Lógica para obtener todas las notas del usuario
  res.send('Lista de todas las notas del usuario');
});

// Ruta para agregar una nueva nota
router.post('/add', (req, res) => {
  // Lógica para agregar una nueva nota
  res.send('Nota agregada exitosamente');
});

// Ruta para actualizar una nota existente
router.put('/update/:id', (req, res) => {
  // Lógica para actualizar una nota
  res.send(`Nota con ID ${req.params.id} actualizada`);
});

// Ruta para eliminar una nota
router.delete('/delete/:id', (req, res) => {
  // Lógica para eliminar una nota
  res.send(`Nota con ID ${req.params.id} eliminada`);
});

module.exports = router;
