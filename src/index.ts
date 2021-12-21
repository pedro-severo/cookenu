import 'reflect-metadata';
import express from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { getRecipeDetailHandler } from "./presentation/getRecipesHandler"
import { getUserDetailHandler } from './presentation/getUserDetailHandler';

export const app = express()

app.use(express.json())
app.use(cors())

app.get("/recipe/:recipeId", getRecipeDetailHandler)
app.get("/user/:userId", getUserDetailHandler)

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
})