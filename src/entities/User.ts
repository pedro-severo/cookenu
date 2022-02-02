import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class User {
    @IsString()
    @IsNotEmpty()
    private id: string

    @IsString()
    @IsNotEmpty()
    private name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    private email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    private password: string

    constructor(
        id: string,
        name: string,
        email: string,
        password: string   
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    public getUser() {
        const { id, name, email, password } = this
        return {
            id, 
            name,
            email,
            password
        }
    }
}