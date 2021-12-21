export class User {
    private id: string
    private name: string
    private email: string
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
}