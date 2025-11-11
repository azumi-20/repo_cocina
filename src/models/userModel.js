const mongoose = require('mongoose')


// Sub‑schema para favoritos
const favoritoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },   // nombre del plato
  imagen: { type: String, required: true },   // URL de la imagen
  kcalorias: { type: Number, required: true } // calorías del plato
});

const userSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  
// Datos físicos
  objetivo: {
    type: String, // "bajar", "mantener", "subir"
    default: null,
  },
  pesoActual: {
    type: Number,
    default: null,
  },
  pesoObjetivo: {
    type: Number,
    default: null,
  },
  altura: {
    type: Number,
    default: null,
  },
  edad: {
    type: Number,
    default: null,
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
    default: null,
  },
  nivelActividad: {
    type: String,
    default: null,
  },

  // Calorías
  caloriasConsumidas: {
    type: Number,
    default: 0,
  },
  caloriasDeMas: {
    type: Number,
    default: 0,
  },
  caloriasRestantes: {
    type: Number,
    default: 0,
  },

  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  
  favoritos: [favoritoSchema]
})

module.exports = mongoose.model('Use', userSchema)