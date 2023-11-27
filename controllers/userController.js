// controllers/userController.js
const userService = require("../services/userService");

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
    await userService.registerUser(req, res);
  },

  /**
     * Logs in a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @return {"User, SignedToken"} A promise that resolves with the result of the login operation.
     */
  loginUser: async (req, res) => {
    await userService.loginUser(req, res);
  },

  /**
   * Retrieves all users.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<User>} - A promise that resolves with no value.
   */
  getAllUsers: async (req, res) => {
    await userService.getAllUsers(req, res);
  },

  /**
   * Retrieves a user by their ID.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @return {Promise} A promise that resolves to the retrieved user.
   */
  getUserById: async (req, res) => {
    await userService.getUserById(req, res);
  }
};

module.exports = userController;
