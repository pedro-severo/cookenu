import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { RequestHandler } from "express"
import Container from "typedi"
import { GetRecipeDetailUC } from "../useCases/Recipe/getRecipeDetailUC"
import { GetRecipeDetailInput } from "./inputs/GetRecipeDetailInput"

export const getRecipeDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { recipeId } = req.params
        const inputToValidate = plainToClass(GetRecipeDetailInput, { id: recipeId })
        const errors = await validate(inputToValidate)
        if (errors.length) {
            throw new Error(`Error validating input: ${errors}`)
        }
        const useCase = Container.get(GetRecipeDetailUC)
        const response = await useCase.execute(recipeId)
        res.json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}