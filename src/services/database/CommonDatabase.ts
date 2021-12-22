import Knex from "knex"
import knex from "knex"
import { Service } from "typedi"
import dotenv from "dotenv"

dotenv.config()
@Service()
export abstract class CommonDatabase {
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

    async insert(table: string, itemToAdd: Object) {
        try {
            await CommonDatabase.connection(table).insert(itemToAdd)
        } catch (e) {
            throw new Error("")
        }
    }
}