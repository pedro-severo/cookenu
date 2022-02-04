import request from 'supertest';
import { app } from "../.."
import { StatusCodes } from "http-status-codes";

export const server = app.listen()

const body = {
    email: "2yved@email.com",
    password: "123456"
}
let validId = ""
let token = ""
const invalidId = "invalidId"
const invalidToken = "invalidToken"

beforeAll(async () => {
    const response = await request(server).post('/user/login').send(body)
    validId = response.body.id
    token = response.body.token
})

afterAll(() => server.close());

describe("getUserDetailHandler test", () => {
    it("Should return 404 status code by invalid user id", async () => {
        const response = await request(server)
            .get(`/user/${invalidId}`)
            .set('Authorization', token)

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
        expect(response.body.message).toBe("User not found.")
    })

    it("Should return 401 status code by invalid token", async () => {
        const response = await request(server).get(`/user/${validId}`)
            .send(body)
            .set('Authorization', invalidToken)
        
        expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
        expect(response.body.message).toBe("Unauthorized action.")
    })


    it("Should return a user", async () => {
        const response = await request(server)
            .get(`/user/${validId}`)
            .set('Authorization', token)

        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body.name).toBeTruthy()
        expect(response.body.email).toBeTruthy()
        expect(response.body.password).toBeUndefined()
    })
})