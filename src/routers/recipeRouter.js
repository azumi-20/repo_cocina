const express = require('express')
const routerRece = express.Router()
const {buscarReceta} = require('../controllers/recipeController')
const {buscarRecetaId} = require('../controllers/recipeIdController')

routerRece.get('/buscar', buscarReceta)
// Obtener detalle de receta por ID (param en la ruta)
routerRece.get('/detalle/:id', buscarRecetaId);

module.exports = routerRece