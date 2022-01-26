import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import Container from "typedi"
import { GetUserDetailUC } from "../useCases/User/gerUserDetailUC"

export const getUserDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const useCase = Container.get(GetUserDetailUC)
        const response = await useCase.execute(userId)
        return res.status(StatusCodes.OK).json(response)
    } catch (err) {
        console.log(err)
        if (err.message === "User not found.") {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message})
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}