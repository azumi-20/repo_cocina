const Use = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

// Obtener perfil del usuario
const getPerfil = async (req, res) => {
    const { token } = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        const usuario = await Use.findOne({ _id: userId })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        res.status(200).json({ usuario })
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil" })
    }
}

// Actualizar perfil del usuario
const updatePerfil = async (req, res) => {
    const { token, nombre, edad, pesoActual, pesoObjetivo, altura, genero, nivelActividad, objetivo, caloriasConsumidas } = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        const usuario = await Use.findOne({ _id: userId })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        // Actualizar solo los campos enviados
        if (nombre) usuario.nombre = nombre
        if (edad) usuario.edad = edad
        if (pesoActual) usuario.pesoActual = pesoActual
        if (pesoObjetivo) usuario.pesoObjetivo = pesoObjetivo
        if (altura) usuario.altura = altura
        if (genero) usuario.genero = genero
        if (nivelActividad) usuario.nivelActividad = nivelActividad
        if (objetivo) usuario.objetivo = objetivo
        if (caloriasConsumidas) usuario.caloriasConsumidas = caloriasConsumidas

        await usuario.save()

        res.status(200).json({
            message: "Perfil actualizado",
            usuario
        })
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar perfil" })
    }
}

module.exports = { getPerfil, updatePerfil }
