import { Container } from 'typedi';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from '../entities/User';
import { generateId } from '../services/uuid/generateId';
import { CreateUserInput } from './inputs/CreateUserInput';
import { CreateUserUC } from '../useCases/User/createUserUC';
import { HashManager } from '../services/hash/HashManager';
import { AuthenticatorManager } from '../services/authentication/AutenticationManager';


export const createUserHandler: RequestHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const inputToValidate = plainToClass(CreateUserInput, req.body)
        const errors: ValidationError[] = await validate(inputToValidate)
        if (errors.length) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error validating input",
                errors
            })
        }
        const id = generateId()
        const hashManager = new HashManager()
        const encryptedPassword = hashManager.hash(password)
        const newUser = new User(id, name, email, encryptedPassword)
        const useCase = Container.get(CreateUserUC)
        const response = await useCase.execute(newUser)
        const authenticator = new AuthenticatorManager()
        const token = authenticator.generateToken({id})
        return res.status(StatusCodes.CREATED).json({...response, token})
    } catch (err) {
        console.log(err)
        if (err.message === "Error: This email is already registered.") {
            return res.status(StatusCodes.CONFLICT).json({ message: err.message })
        }
        res.status(500).json({ message: "Internal Server Error"})
    }
}