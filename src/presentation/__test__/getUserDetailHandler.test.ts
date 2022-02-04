import request from 'supertest';
import { app } from "../.."
import { StatusCodes } from "http-status-codes";

export const server = app.listen()
afterAll(() => server.close());

describe("getUserDetailHandler test", () => {
    const validId = "2b33f12a-6478-4afb-8f12-483b44aa6eb9"
    const invalidId = "invalidId"
    it("Should return a error by invalid user id", async () => {
        const response = await request(server).get(`/user/${invalidId}`)
        expect(response.status).toBe(StatusCodes.NOT_FOUND)
        expect(response.body.message).toBe("User not found.")
    })

    it("Should return a user", async () => {
        const response = await request(server).get(`/user/${validId}`)
        
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body.name).toBeTruthy()
        expect(response.body.email).toBeTruthy()
        expect(response.body.password).toBeUndefined()
    })
})