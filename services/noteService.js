const Note = require("../models/note");
const Category = require("../models/category");

const noteService = {
  /**
   * Retrieves all notes for the user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {Promise<object>} The notes for the user.
  */
  getAllNotes: async (req, res) => {
    const userId = req.user._id;
    try {
      const userNotes = await Note.find({ userId: userId });

      // Mapear las notas para obtener la información necesaria
      const formattedNotes = await Promise.all(
        userNotes.map(async note => {
          // Buscar la categoría por su ID
          const category = await Category.findById(note.category);

          // Devolver la información formateada
          return {
            id: note._id,
            title: note.title,
            content: note.content,
            category: category ? category.name : null,
            isActive: note.isActive,
            cretaDate: note.createDate,
            updateDate: note.updateDate
          };
        })
      );

      res.status(200).json(formattedNotes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las notas del usuario");
    }
  },
  /**
   * Retrieves a note by its ID and returns the note details in the response.
   *
   * @param {Object} req - The request object containing the note ID in the params and the user ID in the user property.
   * @param {Object} res - The response object used to send the note details in the JSON response.
   * @return {Object} - The note details including ID, title, content, category, and isActive.
   */
  getNoteByID: async (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.user._id;
    try {
      let existingNote = await Note.findById({ _id: noteId, userId });
      const category = await Category.findById(existingNote.category);
      res.status(201).json({
        id: existingNote._id,
        title: existingNote.title,
        content: existingNote.content,
        category: category.name,
        isActive: existingNote.isActive,
        creationDate: existingNote.createDate
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`no se consigue la nota ID ${noteId}`);
    }
  },

  /**
   * Creates a new note.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} A promise that resolves with the created note.
   */
  addNote: async (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.user._id;

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
        userId: userId
      });

      res.status(201).json({
        id: newNote._id,
        title: newNote.title,
        content: newNote.content,
        category: existingCategory.name,
        isActive: newNote.isActive,
        createDate: newNote.createDate
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
    const id = req.params.noteId;
    const { title, content, isActive } = req.body;
    try {
      // Verifica si la nota existe
      const existingNote = await Note.findById(id);
      let udateAt = new Date();
      if (!existingNote) {
        return res.status(404).send(`Nota con ID ${id} no encontrada`);
      }
      if (title) {
        existingNote.title = title;
        existingNote.updateDate = udateAt;
      }
      if (content) {
        existingNote.content = content;
        existingNote.updateDate = udateAt;
      }
      if (isActive !== undefined) {
        existingNote.isActive = isActive;
      }
      const category = await Category.findById(existingNote.category);
      const updatedNote = await existingNote.save();
      res.json({
        id: updatedNote._id,
        title: updatedNote.title,
        content: updatedNote.content,
        category: category.name,
        isActive: updatedNote.isActive,
        createDate: updatedNote.createDate,
        updateDate: updatedNote.updateDate
      });
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
    const id = req.params.noteId;
    try {
      // Verifica si la nota existe
      const existingNote = await Note.findById(id);

      if (!existingNote) {
        return res.status(404).send(`Nota con ID ${id} no encontrada`);
      }
      // Si la nota existe, procede a eliminarla
      await Note.deleteOne({ _id: id });
      res.send(`Nota con ID ${id} eliminada exitosamente`);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar la nota con ID ${id}`);
    }
  }
};
module.exports = noteService;
