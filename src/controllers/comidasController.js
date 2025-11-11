const User = require('../models/RegistroDiario');
const Use = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

//analizar
const agregarComida = async (req, res) => {
  const { receta, token } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // Decodificamos el token
    const decodificasToken = jwt.verify(token, JWT_SECRET);
    const userId = decodificasToken.id;

    // Verificamos que el usuario exista
    const buscando = await Use.findById(userId);
    if (!buscando) {
      return res.status(401).json({ message: "El usuario no existe" });
    }

    // Extraemos datos de la receta
    const nombre = receta.title;
    const imagen = receta.image;

    // Buscar nutrientes dentro del array
    const calorias = receta.nutrition.nutrients.find(n => n.name === "Calories")?.amount || 0;
    const proteinas = receta.nutrition.nutrients.find(n => n.name === "Protein")?.amount || 0;
    const grasa = receta.nutrition.nutrients.find(n => n.name === "Fat")?.amount || 0;
    const carbo = receta.nutrition.nutrients.find(n => n.name === "Carbohydrates")?.amount || 0;

    // Fecha de hoy en formato YYYY-MM-DD
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Buscamos si ya existe un registro para este usuario y fecha
    let registro = await User.findOne({ userId, fecha: fechaHoy });

    if (!registro) {
      // Si no existe, lo creamos
      registro = new User({
        userId,
        fecha: fechaHoy,
        comidas: [{
          nombre,
          calorias,
          proteinas,
          grasas: grasa,
          carbohidratos: carbo,
          imagen
        }],
        caloriasConsumidas: calorias,
        proteinas,
        grasas: grasa,
        carbohidratos: carbo
      });
    } else {
      // Si ya existe, agregamos la comida al array
      registro.comidas.push({
        nombre,
        calorias,
        proteinas,
        grasas: grasa,
        carbohidratos: carbo,
        imagen
      });

      // Actualizamos los totales
      registro.caloriasConsumidas += calorias;
      registro.proteinas += proteinas;
      registro.grasas += grasa;
      registro.carbohidratos += carbo;
    }

    await registro.save();
    res.status(200).json({ message: "Comida agregada", registro });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar comida', error: error.message });
  }
};


const obtenerDiaActual = async(req, res)=>{
    const {token} = req.body
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
           // Decodificamos el token
        const decodificasToken = jwt.verify(token, JWT_SECRET);
        const userId = decodificasToken.id;

        // Verificamos que el usuario exista
        const buscando = await Use.findById(userId);
        if (!buscando) {
            return res.status(401).json({ message: "El usuario no existe" });
        }

        // Fecha de hoy en formato YYYY-MM-DD
        const fechaHoy = new Date().toISOString().split('T')[0];

        // Buscamos si ya existe un registro para este usuario y fecha
        let registro = await User.findOne({ userId, fecha: fechaHoy });

        if(!registro){
            return res.status(200).json({ message: "No hay comidas registradas hoy", comidas: [], totales: {} });
        }

        //mostrar Recetas
        const comidasHoy = registro.comidas.map(comida => ({
            nombre: comida.nombre,
            calorias: comida.calorias,
            imagen: comida.imagen
        }));

        res.status(200).json({
            message: "Recetas del día encontradas",
            fecha: registro.fecha,
            comidas: comidasHoy,
            totales: {
                calorias: registro.caloriasConsumidas,
                proteinas: registro.proteinas,
                grasas: registro.grasas,
                carbohidratos: registro.carbohidratos
            }
    });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar comida', error: error.message });
    }
}

const reiniciarDia = async (req, res) => {
    const { token } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET);
        const userId = decodificasToken.id;

        const fechaHoy = new Date().toISOString().split('T')[0];

        let registro = await User.findOne({ userId, fecha: fechaHoy });

        if (!registro) {
            // Si no existe, crear uno nuevo
            registro = new User({
                userId,
                fecha: fechaHoy,
                comidas: [],
                caloriasConsumidas: 0,
                proteinas: 0,
                grasas: 0,
                carbohidratos: 0
            });
        } else {
            // Si existe, resetear totales y comidas
            registro.comidas = [];
            registro.caloriasConsumidas = 0;
            registro.proteinas = 0;
            registro.grasas = 0;
            registro.carbohidratos = 0;
        }

        await registro.save();

        res.status(200).json({
            message: "Día reiniciado correctamente",
            fecha: registro.fecha,
            totales: {
                calorias: registro.caloriasConsumidas,
                proteinas: registro.proteinas,
                grasas: registro.grasas,
                carbohidratos: registro.carbohidratos
            },
            comidas: registro.comidas
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al reiniciar el día", error: error.message });
    }
};


module.exports = { agregarComida , obtenerDiaActual, reiniciarDia};
