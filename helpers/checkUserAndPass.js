import UserModel from "../models/User.js";
import bcrypt from "bcrypt";


export const isUserAndPassCorrectlyReturnUser = async (req,res) => {
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) {
        res.status(404).json({message: 'Неверный Логин или пароль'})
        return false
    }

    const pass = await bcrypt.compare(req.body.password, user._doc.password)
    if (!pass) {
        res.status(404).json({message: 'Неверный логин или Пароль'})
        return false
    }
    return user
}