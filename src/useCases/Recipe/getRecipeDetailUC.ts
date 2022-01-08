import { UserDatabase } from '../../database/User/UserDatabase';
import Container, { Service } from "typedi";
import { RecipeDatabase } from "../../database/Recipe/RecipeDatabase";
import { RecipeResponse } from '../../database/Recipe/interfaces/RecipeResponse';


@Service()
export class GetRecipeDetailUC {
    recipeDatabase: RecipeDatabase
    userDb: UserDatabase

    constructor() {
        this.recipeDatabase = Container.get(RecipeDatabase)
        this.userDb = Container.get(UserDatabase)
    }
    
    async execute(recipeId: string): Promise<RecipeResponse> {
        try {
            const recipe = await this.recipeDatabase.getRecipeById(recipeId, this.userDb)
            return recipe
        } catch (err) {
            throw new Error("Recipe not found.");
        }
    }
}