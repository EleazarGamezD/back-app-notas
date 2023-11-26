// controllers/userController.js
const userService = require('../services/userService');

const userController = {
/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The user's data to be registered.
 * @param {Object} res - The response object.
 * @return {Promise} The result of registering the user.
 */
  registerUser: async (req, res) => {
    try {
      // Lógica para registrar un nuevo usuario
      const result = await userService.registerUser(req.body);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

    
    /**
     * Logs in a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @return {Promise} A promise that resolves with the result of the login operation.
     */
    loginUser: async (req, res) => {
    try {
      // Lógica para loguear un usuario
      const result = await userService.loginUser(req.body);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Otros métodos del controlador...
};

module.exports = userController;
