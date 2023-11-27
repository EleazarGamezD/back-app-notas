// ./controllers/categoryController.js
const Category = require("../models/category");
const categoryService = require("../services/categoryService");

const categoryController = {
  createCategory: async (req, res) => {
    await categoryService.createCategory(req.body);
  }

  // Otras funciones del controlador de categorías...
};

module.exports = categoryController;
