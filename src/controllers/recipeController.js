const { buscandoReceta } = require('../services/recipeService')

const buscarReceta = async(req, res) =>{
    const {ingredientes } = req.query

    try {
        if(!ingredientes ){
            return res.status(400).json({
            message: "La receta no se encontro"
            })
        }

        // Convertimos a lista y quitamos espacios
        const listaIngredientes = ingredientes.split(',').map(i => i.trim())
        // Llamamos al servicio
        const response = await buscandoReceta(listaIngredientes)

        // Formateamos las recetas
        const recetas = response.results.map(r => ({
            id: r.id,
            title: r.title,
            image: r.image,
            calorias: r.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || "No info"
        }))

            res.status(200).json({
            message: "Recetas encontradas", 
            recetas
        })

    } catch (error) {
        console.error("Error al buscar receta:", error.message)
        res.status(500).json({
        message: "Error interno al buscar la receta",
        error: error.message
    })
}

}

module.exports = {buscarReceta}