import { mapUserDTOToUserResponse } from './mapUserDTOToUserResponse';
import { Service } from "typedi";
import { CommonDatabase } from "../CommonDatabase";
import { UserDTO } from './interfaces/UserDTO';
import { UserResponse } from './interfaces/UserResponse';

@Service()
export class UserDatabase extends CommonDatabase {

    constructor() {
        super(),
        this.table = "users"
    }

    async getUser(key: string, value: string): Promise<UserResponse> {
        try {
            const result = await CommonDatabase.connection(this.table).select("*").where(`${key}`, value)     
            const userDTO: UserDTO = result[0]
            const userResponse = mapUserDTOToUserResponse(userDTO)
            return userResponse 
        } catch(err) {
            throw new Error("User not found.")
        }
    }

    async checkUserExistenceById(id: string): Promise<boolean> {
        const result = await CommonDatabase.connection(this.table).select("id").where("id", id)     
        return !!result[0]
    }  

    async checkUserExistenceByEmail(email: string): Promise<boolean> {
        const result = await CommonDatabase.connection(this.table).select("email").where("email", email)   
        return !!result[0]  
    }    
}