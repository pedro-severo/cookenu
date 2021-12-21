import { mapUserDTOToUserResponse } from './mapUserDTOToUserResponse';
import { Service } from "typedi";
import { CommonDatabase } from "../CommonDatabase";
import { UserDTO } from './interfaces/UserDTO';
import { UserResponse } from './interfaces/UserResponse';

@Service()
export class UserDatabase extends CommonDatabase {

    async getUserById(id: string): Promise<UserResponse> {
        try {
            const result = await this.connection("users").select("*").where("id", id)     
            const userDTO: UserDTO = result[0]
            const userResponse = mapUserDTOToUserResponse(userDTO)
            return userResponse 
        } catch(err) {
            throw new Error("User not found.")
        }
    }
}