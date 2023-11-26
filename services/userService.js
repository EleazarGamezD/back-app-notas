// services/userService.js
const User = require('../models/user');

const userService = {
  registerUser: async (userData) => {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      // Crear un nuevo usuario
      const newUser = new User({
        username: userData.username,
        password: userData.password,
        // Otros campos del usuario según tus necesidades
      });

      // Guardar el usuario en la base de datos
      await newUser.save();

      return 'Registro de usuario exitoso';
    } catch (error) {
      throw new Error('Error al registrar usuario: ' + error.message);
    }
  },

  // Otros métodos del servicio...
};

module.exports = userService;

