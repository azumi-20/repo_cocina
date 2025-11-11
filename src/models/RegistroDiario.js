const mongoose = require('mongoose');

const comidaSchema = new mongoose.Schema({
  nombre: {
    type: String, 
    required: true 
},
  calorias: {
    type: Number, 
    required: true 
},
  proteinas: {
    type: Number, 
    required: true 
},
  grasas: {
    type: Number, 
    required: true 
},
  carbohidratos: {
    type: Number, 
    required: true 
},
  hora: { 
    type: Date, 
    default: Date.now 
}, // opcional, para saber cuándo se agregó
imagen: { type: String }
});

const registroDiarioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Use', required: true 
},
  fecha: {
    type: String, 
    required: true 
}, // formato: "YYYY-MM-DD"
  caloriasConsumidas: {
    type: Number, 
    default: 0 
},
  caloriasDeMas: {
    type: Number, 
    default: 0 
},
  proteinas: {
    type: Number, 
    default: 0 
},
  grasas: {
    type: Number, 
    default: 0 
},
  carbohidratos: {
    type: Number, 
    default: 0 },
  comidas: [comidaSchema]
});

module.exports = mongoose.model('RegistroDiario', registroDiarioSchema);
