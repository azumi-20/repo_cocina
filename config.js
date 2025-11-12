require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI, // aquí usará la de Atlas en Render
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  mongoDbName: process.env.MONGO_DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  spoonacularApiKey: process.env.SPOONACULAR_API_KEY
};

module.exports = config;

