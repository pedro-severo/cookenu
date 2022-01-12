import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecipeInput {
    @IsString()
    @IsNotEmpty()
    title!: string

    @IsString()
    @IsNotEmpty()
    description!: string
}