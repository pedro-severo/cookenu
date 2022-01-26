import { mapRecipeDTOToRecipeResponse } from './../../database/Recipe/mapRecipeDTOToRecipeResponse';
import { UserDatabase } from './../../database/User/UserDatabase';
import { RecipeDTO } from './../../database/Recipe/interfaces/RecipeDTO';
import Container, { Service } from "typedi";
import { mapRecipeToRecipeDTO } from "../../database/Recipe/mapRecipeToRecipeDTO";
import { RecipeDatabase } from "../../database/Recipe/RecipeDatabase";
import { Recipe } from "../../entities/Recipe";
import { RecipeResponse } from '../../database/Recipe/interfaces/RecipeResponse';

@Service()
export class CreateRecipeUC {
    recipeDatabase: RecipeDatabase
    userDatabase: UserDatabase

    constructor() {
        this.recipeDatabase = Container.get(RecipeDatabase)
        this.userDatabase = Container.get(UserDatabase)
    }

    async execute(recipe: Recipe, userId: string): Promise<RecipeResponse> {
        try {
            const doesUserExist = await this.userDatabase.validateUser(userId)
            if (!doesUserExist) throw new Error ("User not found to create a recipe.")
            const recipeDTO: RecipeDTO = await mapRecipeToRecipeDTO(recipe, userId)
            const createdRecipeDTO = await this.recipeDatabase.insert("recipes", recipeDTO)
            const createdRecipe = await mapRecipeDTOToRecipeResponse(createdRecipeDTO)
            return createdRecipe
        } catch (err) {
            throw new Error(err)
        }
    }
}