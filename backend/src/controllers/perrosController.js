const Perro = require("../models/perro");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.obtenerPerros = async (req, res) => {
  try {
    const perros = await Perro.find();

    const perrosConIdString = perros.map((p) => ({
      ...p.toObject(),
      creadoPor: p.creadoPor ? p.creadoPor.toString() : null,
    }));

    res.json(perrosConIdString);
  } catch (error) {
    console.error("ERROR EN obtenerPerros:", error);
    res.status(500).json({ error: "Error al obtener perros" });
  }
};

exports.obtenerPerroPorId = async (req, res) => {
  try {
    const perro = await Perro.findById(req.params.id);
    if (!perro) return res.status(404).json({ error: "Perro no encontrado" });

    res.json({
      ...perro.toObject(),
      creadoPor: perro.creadoPor ? perro.creadoPor.toString() : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perro" });
  }
};

exports.crearPerro = async (req, res) => {
  try {
    let imageUrl = "";

    // Si viene una foto, subir a Cloudinary
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "adogtame",
      });

      imageUrl = upload.secure_url;
    }

    const nuevo = await Perro.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      telephone: req.body.telephone,
      imageUrl: imageUrl,
      creadoPor: req.user.id, // SIEMPRE TIENE USER AQUÍ
    });

    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear perro" });
  }
};

exports.actualizarPerro = async (req, res) => {
  try {
    const perroActualizado = await Perro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(perroActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar perro" });
  }
};

exports.eliminarPerro = async (req, res) => {
  try {
    const perro = await Perro.findById(req.params.id);

    if (!perro) {
      return res.status(404).json({ error: "Perro no encontrado" });
    }

    // Solo el creador puede eliminarlo
    if (perro.creadoPor?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar este perro" });
    }

    await Perro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Perro eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar perro" });
  }
};
