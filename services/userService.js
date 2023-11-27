// services/userService.js
const User = require("../models/user");
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const SECRET = process.env.SECRET;
// generando token
const signedToken = _id => {
  const token = jwt.sign({ _id }, SECRET, {
    expiresIn: 60 * 60 * 24
  });
  return token;
};

const userService = {
  /**
 * Registers a new user.
 *
 * @param {Body} req - The request object.
 * @param {Object} res - The response object.
 * @return {User,SignedToken} A promise that resolves to the registered user's signed token.
 */
  registerUser: async (req, res) => {
    const { body } = req;

    try {
      const isUser = await User.findOne({ email: body.email });
      if (isUser) {
        return res.status(403).send("usuario ya existe ");
      }
      //creacion de usuario y generacion de token con encriptacion
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(body.password, salt);
      const user = await User.create({
        email: body.email,
        password: hashed,
        userName: body.userName,
        salt
      });
      const newUser = {
        id: user._id,
        email: user.email,
        userName: user.userName
      };
      const signed = await signedToken(user._id);
      res.status(201).json({ user: newUser, token: signed });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  },

  /**
 * Authenticates a user by checking their email and password.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object for sending the result.
 * @return {Promise} A promise that resolves to the signed token if the user is authenticated, otherwise an error message.
 */
  loginUser: async (req, res) => {
    const { body } = req;
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        res.status(403).send("Usuario y/o contraseña invalida..");
      } else {
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (isMatch) {
          const newUser = {
            id: user._id,
            email: user.email,
            userName: user.userName
          };
          const signed = await signedToken(user._id);
          res.status(200).json({ user: newUser, token: signed });
        } else {
          res.status(403).send("Usuario y/o contraseña invalida.");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  },

  /**
 * Retrieves all users from the database and sends them as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Array} An array of user objects.
 */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      const allUsers = users.map(user => {
        return {
          id: user._id,
          email: user.email,
          userName: user.userName
        };
      });
      res.status(200).json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  /**
   * Retrieves a user by their ID.
   *
   * @param {string} req.params.id - The ID of the user to retrieve.
   * @returns {Promise<object>} The user object.
   */
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const filteredUser = {
        id: user._id,
        email: user.email,
        userName: user.userName
      };
      res.status(200).json(filteredUser);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};

module.exports = userService;
