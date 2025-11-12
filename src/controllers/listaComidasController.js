const RegistroDiario = require('../models/RegistroDiario');
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

    // Fecha de hoy en formato YYYY-MM-DD
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Buscar registro diario del usuario en esa fecha
    const registro = await RegistroDiario.findOne({ userId, fecha: fechaHoy });

    if (!registro) {
      return res.status(200).json({
        message: "Comidas encontradas",
        comidas: []
      });
    }

    res.status(200).json({
      message: "Comidas encontradas",
      comidas: registro.comidas
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
