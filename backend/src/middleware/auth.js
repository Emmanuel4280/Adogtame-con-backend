const jwt = require("jsonwebtoken");
const JWT_SECRET = "TU_SECRETO_SUPER_SEGURO";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // esto pone { id: ... }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
