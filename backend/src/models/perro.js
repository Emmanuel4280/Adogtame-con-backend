const mongoose = require("mongoose");

const perroSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  telephone: String,
  imageUrl: String,
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = mongoose.model("Perro", perroSchema);
