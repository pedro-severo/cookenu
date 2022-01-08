import { UserDTO } from "./interfaces/UserDTO";
import { UserResponse } from "./interfaces/UserResponse";

export const mapUserDTOToUserResponse = (userDTO: UserDTO): UserResponse => {
    const { name, email } = userDTO
    return {
        name, 
        email
    }
}