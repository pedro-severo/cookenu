import bcrypt from 'bcryptjs'

export class HashManager {
    hash = (plainText: string) => {
        const rounds = Number(process.env.BCRYPT_ROUNDS) 
        const salt = bcrypt.genSaltSync(rounds)
        const result = bcrypt.hashSync(plainText, salt)
        return result
    }

    compare = (plainText: string, databasePassword: string) => {
        const result = bcrypt.compareSync(plainText, databasePassword)
        return result
    }
}