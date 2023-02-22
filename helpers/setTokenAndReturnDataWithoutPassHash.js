import jwt from "jsonwebtoken";
import {returnDataWithoutPassHash} from "./returnDataWithoutPassHash.js";

export const JWT_SECRET = "my-32-character-ultra-secure-and-ultra-long-secret"

export const setToken = (user) => {
    return jwt.sign({
            _id: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: '180d'
        }
    )
}

export const setTokenAndReturnDataWithoutPassHash = (user,res) => {
    const token = setToken(user)

    returnDataWithoutPassHash(res,user,token)
}