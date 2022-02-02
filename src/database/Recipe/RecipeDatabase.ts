import { Service } from "typedi";
import { CommonDatabase } from "../CommonDatabase";
import { UserDatabase } from "../User/UserDatabase";
import { RecipeDTO } from "./interfaces/RecipeDTO";
import { RecipeResponse } from "./interfaces/RecipeResponse";
import { mapRecipeDTOToRecipeResponse } from "./mapRecipeDTOToRecipeResponse";

@Service()
export class RecipeDatabase extends CommonDatabase {

    constructor() {
        super(),
        this.table = "recipes"
    }

    async getRecipeById(id: string, userDatabase: UserDatabase): Promise<RecipeResponse> {
        try {
            const result = await CommonDatabase.connection(this.table).select("*").where("id", id)     
            const recipeDTO: RecipeDTO = result[0]
            const user = await userDatabase.getUser("id", recipeDTO.user_id)
            const recipeResonse = mapRecipeDTOToRecipeResponse(recipeDTO, user.name)
            return recipeResonse 
        } catch(err) {
            throw new Error("It was not possible to get this recipe.")
        }
    }
}