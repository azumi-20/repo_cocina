const Use = require('../models/userModel')
const { isMATCH } = require('../services/password.service')
const {generateToken} = require('../services/auth.service')

const login = async(req, res)=>{
    const {correo, contraseña} = req.body

    try {
        const usuario = await Use.findOne({ correo: correo })

        if(!usuario){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }
        const isMATCHhed = await isMATCH(contraseña, usuario.contraseña)
        
        console.log('Contraseña enviada:', contraseña);
        console.log('Contraseña guardada:', usuario.contraseña);

        
        if (!isMATCHhed) {
        return res.status(401).json({ message: "Contraseña incorrecta" })
        }

        //generamos Toker
        const token = generateToken(usuario)

        res.status(201).json({
        message: 'Usuario Bienvenido de Nuevo',
        token
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error al registrar usuario'
        })
    }

}


module.exports = { login }
