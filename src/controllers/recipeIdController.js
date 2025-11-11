const {buscandoRecetaXId} = require('../services/recipeService')

const buscarRecetaId = async(req, res) =>{
   const { id } = req.params; //así obtienes correctamente el ID


    try {
        if(!id ){
            return res.status(400).json({
            message: "La receta no se encontro"
            })
        }

        // Convertimos a lista y quitamos espacios
        const recipeId = id.trim();

        // Formateamos las recetas
        const data = await buscandoRecetaXId(recipeId);

        const recetaCompleta = {
            id: data.id,
            title: data.title,
            image: data.image,
            calorias: data.nutrition.nutrients.find(n => n.name === "Calories").amount,
            tiempo: data.readyInMinutes,
            porciones: data.servings,
            carbohidratos: data.nutrition.nutrients.find(n => n.name === "Carbohydrates").amount,
            proteinas: data.nutrition.nutrients.find(n => n.name === "Protein").amount,
            grasas: data.nutrition.nutrients.find(n => n.name === "Fat").amount,
            ingredientes: data.extendedIngredients.map(i => i.original),
            preparacion: data.instructions
        };


            res.status(200).json({
            message: "Recetas encontradas", 
            recetaCompleta
        })

    } catch (error) {
        console.error("Error al buscar receta:", error.message)
        res.status(500).json({
        message: "Error interno al buscar la receta",
        error: error.message
    })
}

}

module.exports = {buscarRecetaId}