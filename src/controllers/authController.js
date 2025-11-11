const User = require('../models/userModel')
const { hashPassword } = require('../services/password.service') // IMPORT CORRECTO
const {generateToken} = require('../services/auth.service')


const register = async (req, res) => {
  const { nombre, correo, contraseña } = req.body
  

  try {
    // Encriptar la contraseña
    const hashedPassword = await hashPassword(contraseña)

    // Crear el usuario en Mongo
    const usuario = await User.create({
      nombre,
      correo,
      contraseña: hashedPassword
    })

    //generamos Toker
    const token = generateToken(usuario)

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al registrar usuario'
    })
  }
}

module.exports = { register }

