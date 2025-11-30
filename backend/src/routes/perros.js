const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const auth = require("../middleware/auth");

const {
  obtenerPerros,
  obtenerPerroPorId,
  crearPerro,
  actualizarPerro,
  eliminarPerro,
} = require("../controllers/perrosController");

// ======================================
// RUTAS PÚBLICAS
// ======================================
router.get("/", obtenerPerros);
router.get("/:id", obtenerPerroPorId);

// ======================================
// CREAR PERRO (Protegido + con foto)
// ======================================
router.post("/", auth, upload.single("foto"), crearPerro);

// ======================================
// ACTUALIZAR PERRO (Protegido)
// ======================================
router.patch("/:id", auth, actualizarPerro);

// ======================================
// ELIMINAR PERRO (Protegido + solo el creador)
// ======================================
router.delete("/:id", auth, eliminarPerro);

module.exports = router;
