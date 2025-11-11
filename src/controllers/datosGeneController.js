const Use = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

const updateGeneral = async(req, res)=>{
    const { token , pesoActual, pesoObjetivo, altura, edad } = req.body
    // En su lugar, decodificas el token y sacas el id
    const JWT_SECRET = process.env.JWT_SECRET
    const decodificasToken = jwt.verify(token, JWT_SECRET)
    const userId = decodificasToken.id

    try {
        //traemos el usuarios del id
        const buscar = await Use.findOne({_id: userId})
        
        //verificamos que si existe
        if(!buscar){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        //si lo encuentra
        buscar.pesoActual = pesoActual
        buscar.pesoObjetivo = pesoObjetivo
        buscar.altura = altura
        buscar.edad = edad

        //lo guarda
        await buscar.save()

        res.status(200).json({
            message: "Objetivo actualizado", 
            usuario: buscar 
        })

    } catch (error) {
        res.status(500).json({
        message: 'Error al registrar usuario'
        })
    }
}

module.exports = { updateGeneral }