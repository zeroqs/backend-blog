import UserModel from "../../models/User.js";
import {returnDataWithoutPassHash} from "../returnDataWithoutPassHash.js";


export const checkUserAndReturnHimself = async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId)
        returnDataWithoutPassHash(res,user)
    }catch (e) {
        res.status(403).json({
            "status" : "Пользователь не найден"
        })
    }
}