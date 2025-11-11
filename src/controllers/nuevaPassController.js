const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
const { hashPassword } = require('../services/password.service')
config()

const nuevaContra = async(req, res)=>{
    const {token, nuevaC} = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        const usuario = await User.findById(userId)

        if(!usuario){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        // encriptar y guardar en el campo correcto
        const hashed = await hashPassword(nuevaC)
        usuario.contraseña = hashed  
        await usuario.save()

        res.status(200).json({
            message: "Contraseña actualizada correctamente"
        })

    } catch (error) {
        console.error('Error en nuevaContra:', error)
        res.status(500).json({ message: "Error al actualizar la contraseña" })
    }
}

module.exports = { nuevaContra }
