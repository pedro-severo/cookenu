import { UserDatabase } from './../../database/User/UserDatabase';
import { RecipeDTO } from './../../database/Recipe/interfaces/RecipeDTO';
import Container, { Service } from "typedi";
import { mapRecipeToRecipeDTO } from "../../database/Recipe/mapRecipeToRecipeDTO";
import { RecipeDatabase } from "../../database/Recipe/RecipeDatabase";
import { Recipe } from "../../entities/Recipe";

@Service()
export class CreateRecipeUC {
    recipeDatabase: RecipeDatabase
    userDatabase: UserDatabase

    constructor() {
        this.recipeDatabase = Container.get(RecipeDatabase)
        this.userDatabase = Container.get(UserDatabase)
    }

    async execute(recipe: Recipe, userId: string): Promise<string> {
        try {
            const doesUserExist = await this.userDatabase.validateUser(userId)
            if (!doesUserExist) throw new Error ("User not found to create a recipe.")
            const recipeDTO: RecipeDTO = await mapRecipeToRecipeDTO(recipe, userId)
            await this.recipeDatabase.insert("recipes", recipeDTO)
            return "Recipe create successfully!"
        } catch (err) {
            throw new Error(err)
        }
    }
}