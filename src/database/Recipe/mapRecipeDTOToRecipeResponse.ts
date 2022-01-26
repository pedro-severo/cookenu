import { RecipeDTO } from './interfaces/RecipeDTO';
import { RecipeResponse } from './interfaces/RecipeResponse';

export const mapRecipeDTOToRecipeResponse = (recipeDTO: RecipeDTO, recipeOwner?: string): RecipeResponse => {
    return {
        title: recipeDTO.title,
        description: recipeDTO.description,
        creationDate: new Date(recipeDTO.created_at),
        recipeOwner
    }
}