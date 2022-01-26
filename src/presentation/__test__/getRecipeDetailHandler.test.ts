import request from 'supertest';
import { app } from "../.."
import { StatusCodes } from "http-status-codes";

export const server = app.listen()
afterAll(() => server.close());

describe("getRecipeDetailHandler test", () => {
    const validId = "23d6238a-5522-4698-ade5-d43eb81b5ddb"
    const invalidId = "invalidId"
    it("Should return a error by invalid recipe id", async () => {
        const response = await request(server).get(`/recipe/${invalidId}`)
        expect(response.status).toBe(StatusCodes.NOT_FOUND)
        expect(response.body.message).toBe("Recipe not found.")
    })

    it("Should return a recipe", async () => {
        const response = await request(server).get(`/recipe/${validId}`)
        
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body.title).toBeTruthy()
        expect(response.body.description).toBeTruthy()
        expect(response.body.creationDate).toBeTruthy()
        expect(response.body.recipeOwner).toBeTruthy()
    })
})