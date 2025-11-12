const Use = require('../models/userModel')   // tu modelo de usuario
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

// Obtener lista de favoritos
const getFavoritos = async (req, res) => {
    const { token } = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        // Decodificar token
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        // Buscar usuario
        const usuario = await Use.findOne({ _id: userId })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        // Suponiendo que en tu modelo de usuario tienes un campo "favoritos" como array de favoritoSchema
        res.status(200).json({
            favoritos: usuario.favoritos || []
        })
    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos" })
    }
}

module.exports = { getFavoritos }
