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
            const user = await this.userDb.getUserById(userId)
            return user
        } catch (err) {
            throw new Error("It was not possible to get this user.");
        }
    }
}