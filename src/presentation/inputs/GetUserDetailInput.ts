import { IsNotEmpty, IsString } from "class-validator";

export class GetUserDetailInput {
    @IsString()
    @IsNotEmpty()
    id!: string
}