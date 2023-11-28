```
back-app-notas/
│
├── config/
│ ├── db.js // Configuración de la base de datos
│ ├── passport.js // Configuración de Passport (autenticación)
│
├── models/
│ ├── user.js // Modelo de datos para usuarios
│ ├── note.js // Modelo de datos para notas
│ ├── category.js // Modelo de datos para las categorías
│
├── routes/
│ ├── index.js // Rutas principales
│ ├── user.js // Rutas relacionadas con usuarios (registro, login, etc.)
│ ├── note.js // Rutas relacionadas con notas
│ ├── categories.js // Rutas relacionadas con las categorias
│
├── controllers/
│ ├── categoryController.js // Controladores para la gestión de categorías
│ ├── userController.js // Controladores para la gestión de usuarios
│ ├── noteController.js // Controladores para la gestión de notas
│
├── services/
│ ├── categoryService.js // Servicio para la lógica de las categorías
│ ├── userService.js // Servicio para la lógica de usuarios
│ ├── noteService.js // Servicio de lógica de notas
│
├── middleware/
│ ├── authentication.js // Middleware para la autenticación
│
├── app.js // Archivo principal de la aplicación
├── package.json // Archivo de configuración de Node.
├── env.template // Archivo plantilla de configuración de variables de entorno (renombrar a .env).
```

