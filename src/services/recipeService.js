const axios = require('axios')
const { config } = require('dotenv')
const translate = require('translate-google');
config()// carga las variables de entorno

//SPOONACULAR_KEY tiene el valor de tu clave, y podemos usarla en cualquier petición HTTP.
const SPOONACULAR_KEY = process.env.SPOONACULAR_API_KEY
//Es útil definir la URL base de la API, así no tienes que escribirla completa cada vez:
//Por ejemplo, si quieres buscar recetas, más adelante solo agregas el endpoint /complexSearch a BASE_URL.
const BASE_URL = 'https://api.spoonacular.com/recipes'

//funciones: buscandoReceta
// Esta función hace una petición a la API de Spoonacular para
// obtener recetas basadas en los ingredientes que el usuario ingrese.
const buscandoReceta = async (ingredientes) => {
  try {
    // Traducir cada ingrediente al inglés
    const ingredientesEn = await Promise.all(
      ingredientes.map(i => translate(i, { to: 'en' }))
    );
    const ingredientesClean = ingredientesEn.map(i => i.toLowerCase().trim());

    const url = `${BASE_URL}/complexSearch`;
    const params = {
      apiKey: SPOONACULAR_KEY,
      query: ingredientesClean.join(' '),   // búsqueda por palabra clave
      includeIngredients: ingredientesClean.join(','), // opcional
      number: 10,
      addRecipeNutrition: true
    };

    console.log("Buscando recetas con:", params);

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error al buscar receta:', error.message);
    throw new Error('Error al buscar recetas');
  }
};


const buscandoRecetaXId = async(id) => {
    // Construimos la URL de la petición usando la constante BASE_URL y el id recibido.
    // Ejemplo: https://api.spoonacular.com/recipes/{id}/information
    const url = `${BASE_URL}/${id}/information`;

    // Realizamos la petición HTTP GET a la API usando axios.
    // await asegura que esperemos la respuesta antes de continuar.
    const response = await axios.get(url, {
        // Definimos los parámetros que se enviarán en la query string.
        params: {
            apiKey: SPOONACULAR_KEY,
            //includeNutrition: true indica que queremos que la respuesta incluya datos nutricionales.
            includeNutrition: true
        }
    });
    // Retornamos únicamente la propiedad "data" de la respuesta,
    // que contiene el objeto JSON con toda la información de la receta.
    const data = response.data;

  // traducir título, resumen e instrucciones
  const tituloEs = await translate(data.title, { to: 'es' });
  const resumenEs = await translate(data.summary, { to: 'es' });
  const instruccionesEs = data.instructions 
    ? await translate(data.instructions, { to: 'es' }) : null;

  return {
    ...data,
    title: tituloEs,
    summary: resumenEs,
    instructions: instruccionesEs
  };
};


module.exports = { buscandoReceta, buscandoRecetaXId }