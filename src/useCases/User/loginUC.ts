import Container, { Service } from "typedi";
import { UserResponse } from "../../database/User/interfaces/UserResponse";
import { UserDatabase } from "../../database/User/UserDatabase";
import { User } from "../../entities/User";
import { LoginInput } from "../../presentation/inputs/LoginInput";

@Service()
export class LoginUC {
    userDatabase: UserDatabase

    constructor () {
        this.userDatabase = Container.get(UserDatabase)
    }

    async execute(input: LoginInput): Promise<any> {
        try {
            const { email, password } = input
            const user = await this.userDatabase.getUser("email", email)
            if (!user) throw new Error("User not found.")
            // TODO: check password
            // TODO: if everything ok, return token
            return ""
        } catch (err) {
            throw new Error(err)
        }
    }
}