import Container, { Service } from "typedi";
import { UserResponse } from "../../database/User/interfaces/UserResponse";
import { UserDatabase } from "../../database/User/UserDatabase";
import { User } from "../../entities/User";

@Service()
export class CreateUserUC {
    userDatabase: UserDatabase

    constructor () {
        this.userDatabase = Container.get(UserDatabase)
    }

    async execute(user: User): Promise<UserResponse> {
        try {
            const { email } = user.getUser()
            const doesUserExist = await this.userDatabase.checkUserExistenceByEmail(email)
            if (doesUserExist) throw new Error("This email is already registered.")
            const createdUser = await this.userDatabase.insert(user)
            const userResponse = { 
                email: createdUser.email, 
                name: createdUser.name
            }
            return userResponse
        } catch (err) {
            throw new Error(err)
        }
    }
}