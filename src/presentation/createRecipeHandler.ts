import { StatusCodes } from 'http-status-codes';
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { RequestHandler } from "express"
import Container from "typedi"
import { v4 } from "uuid"
import { Recipe } from "../entities/Recipe"
import { CreateRecipeUC } from "../useCases/Recipe/createRecipeUC"
import { CreateRecipeInput } from "./inputs/CreateRecipeInput"

export const createRecipeHandler: RequestHandler = async (req, res) => {
    try {
        const { title, description } = req.body
        const { userId } = req.params

        const inputToValidate = plainToClass(CreateRecipeInput, { title, description })
        const errors = await validate(inputToValidate)
        if (errors.length) {
            throw new Error(`Error validating input: ${errors}`)
        }
        const id = v4()
        const newRecipe = new Recipe(id, title, description, new Date())
        const useCase = Container.get(CreateRecipeUC)
        const response = await useCase.execute(newRecipe, userId)
        // TODO: beyond message of success, return body (title and description) in response
        return res.status(StatusCodes.CREATED).json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}