import UserModel from "../../models/User.js";
import {hashPass} from "../passHelpers/hash.js";


export const saveUserInDB = async (req) => {
    const doc = UserModel({
        "email" : req.body.email,
        "fullName" : req.body.fullName,
        "avatarUrl" : req.body.avatarUrl,
        "password" : await hashPass(req.body.password),
    })

    return await doc.save()
}