import { RequestHandler } from "express"
import Container from "typedi"
import { GetUserDetailUC } from "../useCases/User/gerUserDetailUC"

export const getUserDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const useCase = Container.get(GetUserDetailUC)
        const response = await useCase.execute(userId)
        res.json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}