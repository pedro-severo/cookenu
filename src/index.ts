import 'reflect-metadata';
import express from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { getRecipeDetailHandler } from "./presentation/getRecipeDetailHandler"
import { getUserDetailHandler } from './presentation/getUserDetailHandler';
import { createRecipeHandler } from './presentation/createRecipeHandler';
import { createUserHandler } from './presentation/createUserHandler';
import { loginHandler } from './presentation/loginHandler';

export const app = express()

app.use(express.json())
app.use(cors())

app.post("/user/signup", createUserHandler)
app.post("/user/login", loginHandler)
app.post("/recipe/:userId", createRecipeHandler)
app.get("/recipe/:recipeId", getRecipeDetailHandler)
app.get("/user/:userId", getUserDetailHandler)

if (process.env.NODE_ENV !== 'test') {
   const server = app.listen(process.env.PORT || 3003, () => {
      if (server) {
         const address = server.address() as AddressInfo;
         console.log(`Server is running in http://localhost:${address.port}`);
      } else {
         console.error(`Failure upon starting server.`);
      }
   })
}