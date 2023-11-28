const Category = require("../models/category");

const categoryService = {
  /**
 * Creates a new category for the current user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with a success message if the category is created successfully.
 */
  createCategory: async (req, res) => {
    const userId = req.user._id;
    const { name } = req.body;

    // Verificar si ya existe una categoría con el mismo nombre para el usuario actual
    const existingCategory = await Category.findOne({ name, userId });
    if (existingCategory) {
      return res.status(400).send("La categoría ya existe para este usuario.");
    }

    // Crear una nueva categoría
    const newCategory = new Category({ name, userId });
    await newCategory.save();

    res.send("Categoría creada exitosamente");
  },

  /**
   * Retrieves all categories for a given user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Object} The formatted categories for the user.
   */
  getAllCategories: async (req, res) => {
    const userId = req.user._id;

    try {
      const userCategories = await Category.find({ userId: userId });

      // Mapear las categorías para obtener la información necesaria
      const formattedCategories = await Promise.all(
        userCategories.map(async category => {
          return {
            _id: category._id,
            name: category.name
          };
        })
      );
      res.status(200).json(formattedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las categorias del usuario");
    }
  }
};
module.exports = categoryService;
