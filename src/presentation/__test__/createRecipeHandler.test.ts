import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from "../.."

const server = app.listen()

let validUserId = ""
let token = ""
const invalidToken = "invalidToken"
const invalidUserId = "invalidUserId"

beforeAll(async () => {
    const body = {
        email: "2yved@email.com",
        password: "123456"
    }
    const response = await request(server).post('/user/login').send(body)
    validUserId = response.body.id
    token = response.body.token
})

afterAll(() => server.close());

describe("createRecipeHandler test", () => {
    it("Should create a recipe", async () => {
        const body = {
            title: "Novo Sanduiche de frango agora vai com token autorizando",
            description: "Novo Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`)
            .send(body)
            .set('Authorization', token)

        expect(response.status).toBe(StatusCodes.CREATED)
        expect(response.body.title).toBe(body.title)
        expect(response.body.description).toBe(body.description)
    })

    it("Should return 401 status code by invalid token", async () => {
        const body = {
            title: "Novo Sanduiche de frango agora vai definitivo",
            description: "Novo Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`)
            .send(body)
            .set('Authorization', invalidToken)
        
        expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
        expect(response.body.message).toBe("Unauthorized action.")
    })

    it("Should return 500 status code by invalid input", async () => {
        const body = {
            title: 1,
            description: "Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`)
            .send(body)
            .set('Authorization', token)
        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)    
        expect(response.body.message).toBe("Error validating input")
        expect(response.body.errors.length).toBe(1)   
    })

    it("Should return  500 status code by invalid input in both props", async () => {
        const body = {
            title: 1,
            description:  ""
        }
        const response = await request(server).post(`/recipe/${validUserId}`)
            .send(body)
            .set('Authorization', token)
        expect(response.body.errors.length).toBe(2)    
        expect(response.body.errors[0].property).toBe("title")
        expect(response.body.errors[1].property).toBe("description")
    })

    it("Should return 404 status code by user not found", async () => {
        const body = {
            title: "Novo Sanduiche de frango agora vai",
            description: "Novo Franguin top!"
        }
        
        const response = await request(server).post(`/recipe/${invalidUserId}`)
            .send(body)
            .set('Authorization', token)
        expect(response.status).toBe(StatusCodes.NOT_FOUND)
        expect(response.body.message).toBe("Error: User not found to create a recipe.")
    })
})