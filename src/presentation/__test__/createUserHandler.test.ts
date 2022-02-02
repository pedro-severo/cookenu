import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { app } from "../..";
import { generateRandomString } from '../../utils/generateRandomString';

const server = app.listen()
afterAll(() => server.close());

describe("testing createUser endpoint", () => {
    describe("testing errors", () => {
        it('should return status code 500 by invalid input', async () => {
            const body = {
                name: undefined,
                email: "google.com",
                password: 123456
            }

            const response = await request(server).post('/user/signup').send(body)

            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)    
            expect(response.body.message).toBe("Error validating input")
            expect(response.body.errors.length).toBe(3)
            expect(response.body.errors[0].property).toBe("name")
            expect(response.body.errors[1].property).toBe("email")
            expect(response.body.errors[2].property).toBe("password")           
        })

        it('should return status code 500 by password shorter than min length', async () => {
            const body = {
                name: "Name",
                email: "user@google.com",
                password: "12345"
            }

            const response = await request(server).post('/user/signup').send(body)

            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)    
            expect(response.body.message).toBe("Error validating input")
            expect(response.body.errors.length).toBe(1)
            expect(response.body.errors[0].property).toBe("password")
        })

        it('should return status code 409 by "user already exist"', async () => {
            const body = {
                name: "Name",
                email: "dreko@email.com",
                password: "123456"
            }

            const response = await request(server).post('/user/signup').send(body)

            expect(response.status).toBe(StatusCodes.CONFLICT)    
            expect(response.body.message).toBe("Error: This email is already registered.")
        })
    })

    describe("testing success", () => {
        it('should return success', async () => {
            const body = {
                name: generateRandomString(),
                email: `${generateRandomString()}@email.com`,
                password: "123456"
            }

            const response = await request(server).post('/user/signup').send(body)

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.email).toBe(body.email)
            expect(response.body.name).toBe(body.name)
            expect(response.body.token).toBeTruthy()
            expect(typeof response.body.token).toBe('string')
        })
    })
})