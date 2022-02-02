import Knex from "knex"
import knex from "knex"
import { Service } from "typedi"
import dotenv from "dotenv"

dotenv.config()
@Service()
export abstract class CommonDatabase {
    protected table = ""

    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
           host: process.env.DB_HOST,
           port: 3306,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_SCHEMA,
           multipleStatements: true
        }
    })

    async insert(itemToAdd: any) {
        try {
            await CommonDatabase.connection(this.table).insert(itemToAdd)
            const result = await CommonDatabase.connection(this.table).select("*").where("id", itemToAdd.id)
            return result[0]
        } catch (e) {
            throw new Error("Error in insert query.")
        }
    }
}