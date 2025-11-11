const express = require('express');
const router = express.Router();
const { agregarComida, obtenerDiaActual, reiniciarDia } = require('../controllers/comidasController');
const {agregarFavorito} = require('../controllers/favoritoController')
const {eliminarFavo} = require('../controllers/eliminarFavoritoController')
const {getEstadisticas} = require('../controllers/estadisticaController')

// Ruta para agregar comida
router.post('/agregar', agregarComida);

// Ruta para obtener comidas del día actual
router.post('/dia', obtenerDiaActual);

// Ruta para reiniciar el día
router.post('/reiniciar', reiniciarDia);

router.post('/favoritos/agregar', agregarFavorito);
router.post('/favoritos/eliminar', eliminarFavo);
router.get('/estadistica', getEstadisticas);

module.exports = router;
