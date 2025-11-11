const Use = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

const updateCaloria = async(req, res)=>{
    const {token,caloriasConsumidas } = req.body
    //decodificas el token
    const JWT_SECRET = process.env.JWT_SECRET
    const decodificasToken = jwt.verify(token, JWT_SECRET)
    //guardamos ese token
    const userId = decodificasToken.id

    try {
        //guardamos el id y verificamso si existe
        const buscar = await Use.findOne({_id: userId})
        //verificamos
        if(!buscar){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        //guardamos actualizaciones
        buscar.caloriasConsumidas = caloriasConsumidas
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

module.exports = {updateCaloria}