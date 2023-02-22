import {isCorrect} from "../helpers/errorHelpers/isError.js";
import {saveUserInDB} from "../helpers/userHelpers/generateUserInDB.js";
import {setTokenAndReturnDataWithoutPassHash} from "../helpers/setTokenAndReturnDataWithoutPassHash.js";
import {isUserAndPassCorrectlyReturnUser} from "../helpers/checkUserAndPass.js";
import {checkUserAndReturnHimself} from "../helpers/userHelpers/checkUserAndReturnHimself.js";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        if (isCorrect(req, res)) {
            const user = await saveUserInDB(req)
            setTokenAndReturnDataWithoutPassHash(user, res)
            res.status(200)
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({message: "Ошибка регистрации"})
    }
}

export const logIn = async (req,res) => {
    try {
        const user = await isUserAndPassCorrectlyReturnUser(req, res)
        if (user) setTokenAndReturnDataWithoutPassHash(user, res)
        res.status(200)

    }catch (e) {
        console.error(e)
        res.status(500).json({message: "Ошибка авторизации"})
    }
}
export const getUser = async (req,res) => {
    await checkUserAndReturnHimself(req, res)
}

export const getAllUsers = async (req,res) => {
    const users = await User.find()
    res.json({
        users
    })
}