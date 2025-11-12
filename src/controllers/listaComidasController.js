const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

const listarComidas = async (req, res) => {
  const { token } = req.body; // o req.query según cómo lo envíes
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // Decodificar token
    const decodificasToken = jwt.verify(token, JWT_SECRET);
    const userId = decodificasToken.id;

    // Buscar usuario
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(401).json({ message: "El usuario no existe" });
    }

    // Aquí asumimos que guardas las comidas en usuario.comidas o en registros diarios
    // Si usas un modelo separado para el diario, ajusta la consulta
    const comidas = usuario.comidas || [];

    res.status(200).json({
      message: "Comidas encontradas",
      comidas
    });

  } catch (error) {
    console.error("Error al listar comidas:", error.message);
    res.status(500).json({
      message: "Error interno al listar comidas",
      error: error.message
    });
  }
};

module.exports = { listarComidas };
