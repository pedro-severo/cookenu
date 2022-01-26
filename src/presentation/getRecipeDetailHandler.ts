import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Container from "typedi"
import { GetRecipeDetailUC } from "../useCases/Recipe/getRecipeDetailUC"

export const getRecipeDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { recipeId } = req.params
        const useCase = Container.get(GetRecipeDetailUC)
        const response = await useCase.execute(recipeId)
        return res.status(StatusCodes.OK).json(response)
    } catch (err) {
        console.log(err.message)
        if (err.message === "Recipe not found.") {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message })
        }
        res.status(500).send(err.message)
    }
}