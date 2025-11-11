const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()

const recuperarContra = async(req, res)=>{
    const {correo} = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        //retorna el primer correo que coincida
        const usuario = await User.findOne({correo: correo})

        if(!usuario){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }
        //si existe generamos un token temporal
        const token = jwt.sign({
            id: usuario._id,
            correo: usuario.correo 
            },
            JWT_SECRET,{
            expiresIn: '15m' 
        } // token válido 15 minutos
        )

        //devuelve
        res.status(200).json({ 
            message: "Token generado", token 
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
        message: 'Error al registrar usuario'
    })
    }
}

module.exports = {recuperarContra}