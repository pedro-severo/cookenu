import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from "../.."

const server = app.listen()
afterAll(() => server.close());

const validUserId = "2b33f12a-6478-4afb-8f12-483b44aa6eb9"
const invalidUserId = "invalidUserId"
describe("createRecipeHandler test", () => {
    it("Should create a recipe", async () => {
        const body = {
            title: "Novo Sanduiche de frango agora vai",
            description: "Novo Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`).send(body)
        expect(response.status).toBe(StatusCodes.CREATED)
        expect(response.body.title).toBe("Novo Sanduiche de frango agora vai")
        expect(response.body.description).toBe("Novo Franguin top!")
    })

    it("Should return error by invalid input", async () => {
        const body = {
            title: 1,
            description: "Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`).send(body)
        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)    
        expect(response.body.message).toBe("Error validating input")
        expect(response.body.errors.length).toBe(1)   
    })

    it("Should return error by invalid input in both props", async () => {
        const body = {
            title: 1,
            description:  ""
        }
        const response = await request(server).post(`/recipe/${validUserId}`).send(body)
        expect(response.body.errors.length).toBe(2)    
        expect(response.body.errors[0].property).toBe("title")
        expect(response.body.errors[1].property).toBe("description")
    })

    it("Should return error by user not found", async () => {
        const body = {
            title: "Novo Sanduiche de frango agora vai",
            description: "Novo Franguin top!"
        }
        
        const response = await request(server).post(`/recipe/${invalidUserId}`).send(body)
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND)
        expect(response.body.message).toBe("Error: User not found to create a recipe.")
    })
})