# back-app-notas

## Descripción

Este es el backend de una aplicación de notas. Proporciona servicios para gestionar usuarios y sus notas de manera segura.

## Instalación

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

1. Clona este repositorio:

   ```bash
   git clone https://github.com/EleazarGamezD/back-app-notas.git

2. Navega al directorio del proyecto:
   ```
   cd back-app-notas
3. Instala las dependencias:
   ```
   npm install
4. Configuración
Asegúrate de configurar las variables de entorno antes de ejecutar la aplicación. Crea un archivo .env en el directorio raíz y proporciona los siguientes valores:
- MONGODB_URI=your_mongodb_uri
- SECRET_KEY=your_secret_key
5. Modo de Desarrollo (con Nodemon)
   ```
   npm run dev

# Dependencias

- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.1
- [dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [ejs](https://www.npmjs.com/package/ejs) v3.1.9
- [express](https://www.npmjs.com/package/express) v4.18.2
- [express-jwt](https://www.npmjs.com/package/express-jwt) v8.4.1
- [express-session](https://www.npmjs.com/package/express-session) v1.17.3
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v9.0.2
- [mongoose](https://www.npmjs.com/package/mongoose) v8.0.1
- [passport](https://www.npmjs.com/package/passport) v0.6.0
- [passport-local](https://www.npmjs.com/package/passport-local) v1.0.0

# Licencia

Este proyecto está bajo la licencia [ISC](LICENSE).

# Autor

- [Eleazar Gamez](https://github.com/EleazarGamezD).

# Arbol de Carpetas
```
back-app-notas/
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
├── public
│    ├── index.html // Archivo Html con la documentación
│    ├── css/
│      ├── styles.css // Hoja de estilos para la documentación
|
├── app.js // Archivo principal de la aplicación
├── package.json // Archivo de configuración de Node.
├── env.template // Archivo plantilla de configuración de variables de entorno (renombrar a .env).
```

