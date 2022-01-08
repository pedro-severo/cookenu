import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { RequestHandler } from "express"
import Container from "typedi"
import { GetUserDetailUC } from "../useCases/User/gerUserDetailUC"
import { GetUserDetailInput } from "./inputs/GetUserDetailInput"

export const getUserDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const inputToValidate = plainToClass(GetUserDetailInput, { id: userId })
        const errors = await validate(inputToValidate)
        if (errors.length) {
            throw new Error(`Error validating input: ${errors}`)
        }
        const useCase = Container.get(GetUserDetailUC)
        const response = await useCase.execute(userId)
        res.json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}