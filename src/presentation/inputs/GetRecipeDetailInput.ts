import { IsNotEmpty, IsString } from "class-validator";

export class GetRecipeDetailInput {
    @IsString()
    @IsNotEmpty()
    id!: string
}