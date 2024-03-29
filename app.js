require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());

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

const path = require("path");
const hostUrl = process.env.API_BASE_URL || "http://localhost:3000";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("index.ejs", {
    apiUrl: hostUrl
  });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
