import { RequestHandler } from "express"
import Container from "typedi"
import { GetRecipeDetailUC } from "../useCases/Recipe/getRecipeDetailUC"

export const getRecipeDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { recipeId } = req.params
        const useCase = Container.get(GetRecipeDetailUC)
        const response = await useCase.execute(recipeId)
        res.json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}