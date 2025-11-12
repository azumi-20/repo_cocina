const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // carga las variables de entorno

const appConfig = require('./config'); // tu archivo config.js

const router = require('./src/routers/authRaouter');
const routerUse = require('./src/routers/useRaouter');
const routerRece = require('./src/routers/recipeRouter');
const registroRoutes = require('./src/routers/registroRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', router);
app.use('/auth/user', routerUse);
app.use('/auth/receta', routerRece);
app.use('/auth/diario', registroRoutes);

// conectar a la base de datos usando tu config centralizado
mongoose.connect(appConfig.mongoUri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

const db = mongoose.connection;

module.exports = app;

