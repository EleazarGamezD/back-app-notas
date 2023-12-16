require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// para que me lea los archivos css
app.use(express.static(__dirname + "/public"));

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const mongoUrl = "mongodb+srv://" + process.env.MONGOATLAS;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, { ssl: true });

// Rutas
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const categoriesRoutes = require("./routes/categories");

app.use("/user", userRoutes);
app.use("/note", noteRoutes);
app.use("/categories", categoriesRoutes);
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
