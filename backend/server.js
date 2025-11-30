const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/adogtame")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// Importar rutas
const authRoutes = require("./src/routes/authRoutes");
const perrosRoutes = require("./src/routes/perros");

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/perros", perrosRoutes);

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
