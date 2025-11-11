const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();


const agregarFavorito = async(req, res)=>{
    const {token, nombre, imagen, kcalorias} = req.body
     // En su lugar, decodificas el token y sacas el id
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        const usuario = await User.findById({_id: userId})

        if(!usuario){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        usuario.favoritos.push({
            nombre: nombre,
            imagen: imagen,
            kcalorias: kcalorias
        })

        await usuario.save()

        res.status(200).json({
            message: "Favorito agregado correctamente", 
            usuario: usuario 
        })

    } catch (error) {
        res.status(500).json({
        message: "Error al agregar favorito",
        })
    }
}

module.exports = {agregarFavorito}