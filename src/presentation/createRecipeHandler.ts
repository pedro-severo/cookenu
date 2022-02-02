import { StatusCodes } from 'http-status-codes';
import { plainToClass } from "class-transformer"
import { validate, ValidationError } from "class-validator"
import { RequestHandler } from "express"
import Container from "typedi"
import { Recipe } from "../entities/Recipe"
import { CreateRecipeUC } from "../useCases/Recipe/createRecipeUC"
import { CreateRecipeInput } from "./inputs/CreateRecipeInput"
import { generateId } from '../services/uuid/generateId';

export const createRecipeHandler: RequestHandler = async (req, res) => {
    try {
        const { title, description } = req.body
        const { userId } = req.params

        const inputToValidate = plainToClass(CreateRecipeInput, { title, description })
        const errors: ValidationError[] = await validate(inputToValidate)
        if (errors.length) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error validating input",
                errors
            })
        }
        const id = generateId()
        const newRecipe = new Recipe(id, title, description, new Date())
        const useCase = Container.get(CreateRecipeUC)
        const response = await useCase.execute(newRecipe, userId)
        return res.status(StatusCodes.CREATED).json(response)
    } catch (err) {
        console.log(err)
        if (err.message === "Error: User not found to create a recipe.") {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message })
        }
        res.status(500).json({ message: "Internal Server Error"})
    }
}