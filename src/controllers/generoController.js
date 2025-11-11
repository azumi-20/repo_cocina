const Use = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

const updateSexo = async(req, res)=>{
    const {token, genero} = req.body
    //desclosamos
    const JWT_SECRET = process.env.JWT_SECRET
    const decodificasToken = jwt.verify(token, JWT_SECRET)
    const userId = decodificasToken.id

    //buscamos el usuario
    try {
        const buscar = await Use.findOne({_id: userId})

        //verificamos
        if(!buscar){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        buscar.genero = genero
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

module.exports = {updateSexo}