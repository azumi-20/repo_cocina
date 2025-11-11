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

const buscandoReceta = async(ingredientes)=>{
    try {
        // Construimos la URL completa para hacer la búsqueda avanzada de recetas.
        const url = `${BASE_URL}/complexSearch`

        // Definimos los parámetros que enviaremos a la API
        // apiKey → nuestra clave de acceso
        // includeIngredients → los ingredientes que el usuario ingresa, separados por comas
        // number → cantidad máxima de resultados que queremos obtener
        const parametros = {
            apiKey: SPOONACULAR_KEY,
            includeIngredients: ingredientes.join(','),//separar con las ,
            number: 10, //traer 10 resultados
            addRecipeNutrition: true// incluye calorías
        }

        // Hacemos una petición GET a la API usando axios
        // El segundo argumento { params: parametros } convierte el objeto en una query string
        // Ejemplo final: https://api.spoonacular.com/recipes/complexSearch?apiKey=...&includeIngredients=tomato,onion&number=10
        const response = await axios.get(url, {params: parametros})

         // Hacemos una petición GET a la API usando axios // El segundo argumento { params: parametros } convierte el objeto en una query string // Ejemplo final: https://api.spoonacular.com/recipes/complexSearch?apiKey=...&includeIngredients=tomato,onion&number=10 const response = await axios.get(url, {params: parametros}) // Retornamos los datos que nos devuelve la API (response.data contiene los resultados) return response.data
        return response.data
    } catch (error) {
        console.error('Error al buscar receta:', error.message)
        throw new Error('Error al buscar recetas')
    }
}

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