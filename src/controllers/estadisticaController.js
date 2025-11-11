const User = require('../models/userModel');
const Use = require('../models/RegistroDiario');
const jwt = require('jsonwebtoken');

const getEstadisticas = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // 1. Leer token desde headers
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    // 2. Extraer el token
    const token = authHeader.split(' ')[1]; // "Bearer <token>"

    // 3. Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // 4. Buscar usuario
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 5. Buscar registro diario de hoy
    const hoy = new Date().toISOString().split("T")[0];
    const registro = await Use.findOne({ userId, fecha: hoy });

    // 6. Responder con estadísticas
    res.status(200).json({
      pesoActual: usuario.pesoActual,
      pesoObjetivo: usuario.pesoObjetivo,
      caloriasConsumidas: registro ? registro.caloriasConsumidas : 0,
      proteinas: registro ? registro.proteinas : 0,
      carbohidratos: registro ? registro.carbohidratos : 0,
      grasas: registro ? registro.grasas : 0,
      mealsCount: registro ? registro.comidas.length : 0
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Tu sesión ha expirado, vuelve a iniciar sesión" });
    }
    res.status(500).json({ message: "Error al obtener estadísticas", error: error.message });
  }
};

module.exports = { getEstadisticas };

