import { UserDatabase } from '../../database/User/UserDatabase';
import Container, { Service } from "typedi";
import { UserResponse } from '../../database/User/interfaces/UserResponse';

@Service()
export class GetUserDetailUC {
    userDb: UserDatabase

    constructor() {
        this.userDb = Container.get(UserDatabase)
    }
    
    async execute(userId: string): Promise<UserResponse> {
        try {
            const user = await this.userDb.getUser("id", userId)
            delete user.password
            delete user.id
            return user
        } catch (err) {
            throw new Error("User not found.");
        }
    }
}