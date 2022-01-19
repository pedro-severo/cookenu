import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from "../.."
import { CommonDatabase } from '../../database/CommonDatabase';

const server = app.listen()

class Database extends CommonDatabase {}

afterAll(() => server.close());
const validUserId = "2b33f12a-6478-4afb-8f12-483b44aa6eb9"
const invalidUserId = "invalidUserId"
describe("createRecipeHandler test", () => {
    it("Should create a recipe", async () => {
        const body = {
            title: "Sanduiche de frango",
            description: "Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`).send(body)
        expect(response.status).toBe(StatusCodes.CREATED)
        // TODO: delete created recipe in database
    })

    it.only("Should return error by invalid input", async () => {
        const body = {
            title: 1,
            description: "Franguin top!"
        }

        const response = await request(server).post(`/recipe/${validUserId}`).send(body)
        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)        
    })
})