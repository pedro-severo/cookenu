import Container, { Service } from "typedi";
import { UserDatabase } from "../../database/User/UserDatabase";
import { LoginInput } from "../../presentation/inputs/LoginInput";
import { AuthenticatorManager } from "../../services/authentication/AutenticationManager";
import { HashManager } from "../../services/hash/HashManager";
import { LoginResponse } from "./Interfaces/LoginResponse";

@Service()
export class LoginUC {
    userDatabase: UserDatabase
    hashManager: HashManager
    authenticator: AuthenticatorManager

    constructor () {
        this.userDatabase = Container.get(UserDatabase)
        this.hashManager = new HashManager()
        this.authenticator = new AuthenticatorManager()
    }

    async execute(input: LoginInput): Promise<LoginResponse> {
        try {
            const { email, password } = input
            const user = await this.userDatabase.getUser("email", email)
            if (!user) throw new Error("User not found.")
            const isPasswordCorrect = user.password && await this.hashManager.compare(password, user.password)
            if (!isPasswordCorrect) throw new Error("Incorrect password.")
            const token = user.id && this.authenticator.generateToken({id: user.id})
            return {
                id: user.id as string,
                token: token as string
            }
        } catch (err) {
            throw new Error(err)
        }
    }
}