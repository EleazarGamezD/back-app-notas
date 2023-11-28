// ./controllers/categoryController.js
const Category = require("../models/category");
const categoryService = require("../services/categoryService");

const categoryController = {
  createCategory: async (req, res) => {
    console.log("create Category Function");
    await categoryService.createCategory(req.body);
  },

  getAllCategories: async (req, res) => {
    console.log("getAllCategories Function");
    await categoryService.getAllCategories(req, res);
  }
  // Otras funciones del controlador de categorías...
};

module.exports = categoryController;
