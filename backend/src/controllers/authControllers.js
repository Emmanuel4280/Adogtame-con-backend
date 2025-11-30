const Usuario = require("../models/usuarios");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "TU_SECRETO_SUPER_SEGURO";

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Usuario.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "El usuario ya existe" });

    const nuevo = await Usuario.create({ email, password });

    res.json({ message: "Usuario registrado con éxito", user: nuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    ///res.status(500).json({ error: "Error al registrar usuario" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const match = await usuario.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Contraseña incorrecta" });

    // AQUÍ VA EL TOKEN
    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
