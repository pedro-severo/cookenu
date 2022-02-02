import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Container from 'typedi';
import { LoginUC } from '../useCases/User/loginUC';
import { LoginInput } from './inputs/LoginInput';

export const loginHandler: RequestHandler = async (req, res) => {
    try {
        const inputToValidate = plainToClass(LoginInput, req.body)
        const errors: ValidationError[] = await validate(inputToValidate)
        if (errors.length) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error validating input",
                errors
            })
        }
        const useCase = Container.get(LoginUC)
        const response = await useCase.execute(req.body)
        return res.status(StatusCodes.OK).json(response)
    } catch (err) {
        if (err.message === "Error: User not found.") {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message })
        }
        res.status(500).json({ message: "Internal Server Error"})

    }
}