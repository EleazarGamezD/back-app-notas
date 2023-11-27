require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const app = express();

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión y Passport
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Conexión a MongoDB
const mongoUrl = "mongodb+srv://" + process.env.MONGOATLAS;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, { ssl: true });

// Rutas
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use("/user", userRoutes);
app.use("/note", noteRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
