const express = require('express')
const { updateObjetivo } = require('../controllers/objetivoController')
const { updateGeneral } = require('../controllers/datosGeneController')
const { updateNivel } = require('../controllers/nivelactiController')
const { updateSexo } = require('../controllers/generoController')
const { updateCaloria } = require('../controllers/caloriasController')

//contraseña
const {recuperarContra} = require('../controllers/olvidarController')
const {nuevaContra} = require('../controllers/nuevaPassController')


const routerUse = express.Router()

routerUse.post('/objetivo', updateObjetivo)
routerUse.post('/general', updateGeneral)
routerUse.post('/nivel', updateNivel)
routerUse.post('/genero', updateSexo)
routerUse.post('/caloria', updateCaloria)
routerUse.post('/olvidar', recuperarContra)
routerUse.post('/establecer', nuevaContra)

module.exports = routerUse