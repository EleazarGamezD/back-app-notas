// ./controllers/noteController.js
const noteService = require("../services/noteService");

const noteController = {
  // Obtener todas las notas del usuario
  getAllNotes: async (req, res) => {
    await noteService.getAllNotes(req, res);
  },

  // Agregar una nueva nota
  addNote: async (req, res) => {
    await noteService.addNote(req, res);
  },

  // Actualizar una nota existente
  updateNote: async (req, res) => {
    await noteService.updateNote(req, res);
  },

  // Eliminar una nota
  deleteNote: async (req, res) => {
    await noteService.deleteNote(req, res);
  }
};

module.exports = noteController;
