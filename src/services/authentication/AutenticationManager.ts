import { JwtPayload, sign, verify } from "jsonwebtoken"
import { authenticationData } from "./interfaces/authenticationData"


export class AuthenticatorManager {
 
    public generateToken = (
       payload: authenticationData
    ): string => {
       return sign(
          payload,
          process.env.JWT_KEY || "key",
          { expiresIn: "60d" }
       )
    }
 
    public getTokenData = (token: string): authenticationData | null => {
       try {
            const tokenData = verify(token, process.env.JWT_KEY || "key") as authenticationData
            return {
                id: tokenData.id
            }
       } catch (err) {
            console.log(err)
            return null
       }
    }
 }