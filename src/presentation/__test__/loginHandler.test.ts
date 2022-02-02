import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { app } from "../..";

const server = app.listen()
afterAll(() => server.close());

describe("testing login endpoint", () => {
    describe("testing errors", () => {
        it("should return status code 500 by invalid input", async () => {
            const body = {
                email: "google.com",
                password: 123456
            }

            const response = await request(server).post('/user/login').send(body)

            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)    
            expect(response.body.message).toBe("Error validating input")
            expect(response.body.errors.length).toBe(2)
            expect(response.body.errors[0].property).toBe("email")
            expect(response.body.errors[1].property).toBe("password")
        })
        
        it.only('should return status 404 by email not found in database', async () => {
            const body = {
                email: "fakeemail@google.com",
                password: "123456"
            }

            const response = await request(server).post('/user/login').send(body)

            expect(response.status).toBe(StatusCodes.NOT_FOUND)    
            expect(response.body.message).toBe("Error: User not found.")
        })
    })
})