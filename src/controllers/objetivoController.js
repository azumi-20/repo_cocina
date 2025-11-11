const Use = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

const updateObjetivo = async(req, res)=>{
    const { token, objetivo } = req.body
    // En su lugar, decodificas el token y sacas el id
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id
        //primer documento que cumpla la condicion
        const buscando = await Use.findOne({_id: userId})

        if(!buscando){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        buscando.objetivo = objetivo
        await buscando.save()

        res.status(200).json({
            message: "Objetivo actualizado", 
            usuario: buscando 
        })

        
    } catch (error) {
        res.status(500).json({
        message: 'Error al registrar usuario'
        })
    }
}


module.exports = { updateObjetivo}

/*
--- La idea es siempre el mismo patrón: ---

Recibir datos desde el cliente (token + campo a actualizar).
Decodificar el token para obtener el id del usuario.
Buscar el usuario en la base de datos.
Verificar que exista antes de actualizar.
Actualizar los campos deseados y guardar (save()).
Responder al cliente con éxito o error.

*/