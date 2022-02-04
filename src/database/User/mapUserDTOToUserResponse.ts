import { UserDTO } from "./interfaces/UserDTO";
import { UserResponse } from "./interfaces/UserResponse";

export const mapUserDTOToUserResponse = (userDTO: UserDTO): UserResponse => {
    const { name, email, password, id } = userDTO
    return {
        name, 
        email,
        password, 
        id
    }
}