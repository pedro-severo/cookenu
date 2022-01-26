import { User } from "../../../entities/User";

export interface RecipeResponse {
    title: string,
    description: string,
    creationDate: Date,
    recipeOwner?: string
}
