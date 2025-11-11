const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require('dotenv')
config()

const router = require('./src/routers/authRaouter') 
const routerUse = require('./src/routers/useRaouter')
const routerRece = require('./src/routers/recipeRouter')
const registroRoutes = require('./src/routers/registroRouter');
const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', router) // monta el router en /auth
app.use('/auth/user', routerUse)
app.use('/auth/receta', routerRece)
app.use('/auth/diario', registroRoutes);

//conectar a la base de datos
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection

module.exports = app
