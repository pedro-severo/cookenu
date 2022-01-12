import { IsNotEmpty, IsString } from "class-validator";

export class Recipe {
    @IsString()
    @IsNotEmpty()
    private id: string

    @IsString()
    @IsNotEmpty()
    private title: string

    @IsString()
    @IsNotEmpty()
    private description: string

    private creationDate: Date   

    constructor(
        id: string,
        title: string,
        description: string,
        creationDate: Date   
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.creationDate = creationDate
    }

    public getRecipe() {
        const { id, title, description, creationDate } = this
        return {
            id, 
            title,
            description,
            creationDate
        }
    }
}