import { RecipeDTO } from './../interfaces/RecipeDTO';
import { mapRecipeToRecipeDTO } from './../mapRecipeToRecipeDTO';
import { Recipe } from './../../../entities/Recipe';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe("Testing mapRecipeToRecipeDTO function", () => {
    test("It should return a recipe dto", async () => {
        const now = new Date()
        const recipe = new Recipe("id", "title", "description", now)
        const { id, title, description, creationDate } = recipe.getRecipe()
        const userId = "user_id"
        const output = await mapRecipeToRecipeDTO(recipe, userId)

        expect(output.id).toBe(id)
        expect(output.title).toBe(title)
        expect(output.description).toBe(description)
        expect(output.user_id).toBe(userId)
        expect(output.created_at).toBe(creationDate.getTime())
    })
    test("It should return error by missing information in recipe input", async () => {
        expect.assertions(1)
        const now = new Date()
        const recipe = new Recipe("", "", "", now)
        const inputToValidate = plainToClass(Recipe, recipe.getRecipe())
        const errors = await validate(inputToValidate)        
        const { id, title, description, creationDate } = recipe.getRecipe()
        try {
            const userId = "user_id"
            const output = await mapRecipeToRecipeDTO(recipe, userId)
        } catch (err) {
            expect(err.message).toBe(`Error validating recipe input: ${errors}`)
        }
    })
})