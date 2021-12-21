import Knex from "knex"
import { Service } from "typedi"
import { connection } from "./connection";

@Service()
export abstract class CommonDatabase {
    connection: Knex

    constructor() {
        this.connection = connection
    }

    async insert(table: string, itemToAdd: Object) {
        try {
            await this.connection(table).insert(itemToAdd)
        } catch (e) {
            throw new Error("")
        }
    }
}