import UserModel from "../../models/User.js";
import {hashPass} from "../passHelpers/hash.js";


export const saveUserInDB = async (req) => {
    const doc = UserModel({
        "email" : req.body.email,
        "fullName" : req.body.fullName,
        "avatarUrl" : req.body.avatarUrl ? req.body.avatarUrl : "https://kartinkin.net/uploads/posts/2022-12/1670616943_25-kartinkin-net-p-kartinka-siluet-instagram-26.png",
        "password" : await hashPass(req.body.password),
    })

    return await doc.save()
}