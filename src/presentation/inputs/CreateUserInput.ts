import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserInput {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}