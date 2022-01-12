import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Recipe } from "../../entities/Recipe";
import { RecipeDTO } from "./interfaces/RecipeDTO";

export const mapRecipeToRecipeDTO = async (recipe: Recipe, userId: string): Promise<RecipeDTO> => {
    const { id, title, description, creationDate } = recipe.getRecipe()
    const inputToValidate = plainToClass(Recipe, recipe.getRecipe())
    const errors = await validate(inputToValidate)
    if (errors.length) throw new Error(`Error validating recipe input: ${errors}`)
    return {
        id,
        title,
        description,
        user_id: userId,
        created_at: creationDate.getTime()
    }
}