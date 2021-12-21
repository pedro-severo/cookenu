export class Recipe {
    private id: string
    private title: string
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
}