// ./controllers/noteController.js
const noteService = require("../services/noteService");

const noteController = {
  // Obtener todas las notas del usuario
  /**
 * Retrieves all notes.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A promise that resolves with no value.
 */
  getAllNotes: async (req, res) => {
    console.log("Get All Notes function");
    await noteService.getAllNotes(req, res);
  },

  // Agregar una nueva nota
  /**
   * Add a note.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} A promise that resolves with no value.
   */
  addNote: async (req, res) => {
    console.log("Add Note function");
    await noteService.addNote(req, res);
  },

  // Actualizar una nota existente
  /**
   * Updates a note.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {Promise<void>} - A Promise that resolves with no value.
   */
  updateNote: async (req, res) => {
    console.log("Update Note function");
    await noteService.updateNote(req, res);
  },

  // Eliminar una nota
  /**
   * Deletes a note.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} A promise that resolves when the note is deleted.
   */
  deleteNote: async (req, res) => {
    console.log("Delete Note function");
    await noteService.deleteNote(req, res);
  },

  getNoteById: async (req, res) => {
    console.log("Get Note By ID function");
    await noteService.getNoteByID(req, res);
  }
};

module.exports = noteController;
