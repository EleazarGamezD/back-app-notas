const Note = require("../models/note");
const Category = require("../models/category");

const noteService = {
  /**
   * Creates a new note.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} A promise that resolves with the created note.
   */
  addNote: async (req, res) => {
    const { title, content, category } = req.body;
    console.log(req.user);
    const userId = req.user._id;
    console.log(userId);
    try {
      // Verifica si la categoría ya existe para el usuario actual
      let existingCategory = await Category.findOne({ name: category, userId });

      // Si no existe, crea la nueva categoría
      if (!existingCategory) {
        existingCategory = await Category.create({ name: category, userId });
      }

      // Crea la nueva nota y la asocia a la categoría existente o recién creada
      const newNote = await Note.create({
        title,
        content,
        category: existingCategory._id,
        user: userId
      });

      res.status(201).json({
        _id: newNote._id,
        title: newNote.title,
        content: newNote.content,
        category: existingCategory.name,
        isActive: newNote.isActive
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al agregar la nueva nota");
    }
  },

  /**
   * Updates a note with the given ID.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {object} The updated note.
   */
  updateNote: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const updatedNote = await noteService.updateNote(
        id,
        req.user._id,
        title,
        content
      );
      res.json(updatedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al actualizar la nota con ID ${id}`);
    }
  },

  /**
   * Deletes a note by its ID.
   *
   * @param {string} id - The ID of the note to be deleted.
   * @return {Promise<void>} A promise that resolves when the note is deleted successfully.
   */
  deleteNote: async (req, res) => {
    const { id } = req.params;
    try {
      await noteService.deleteNote(id, req.params._id);
      res.send(`Nota con ID ${id} eliminada exitosamente`);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar la nota con ID ${id}`);
    }
  },

  /**
   * Retrieves all notes for the user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {Promise<object>} The notes for the user.
   */
  getAllNotes: async (req, res) => {
    const userId = req.user._id;

    console.log("Id de Usuario", userId);
    try {
      const userNotes = await Note.find({ userId: userId });

      // Mapear las notas para obtener la información necesaria
      const formattedNotes = await Promise.all(
        userNotes.map(async note => {
          // Buscar la categoría por su ID
          const category = await Category.findById(note.category);

          // Devolver la información formateada
          return {
            _id: note._id,
            title: note.title,
            content: note.content,
            category: category ? category.name : null, // Agregar el nombre de la categoría si existe
            isActive: note.isActive
          };
        })
      );

      res.status(200).json(formattedNotes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las notas del usuario");
    }
  }
};
module.exports = noteService;
