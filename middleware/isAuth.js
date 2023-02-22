import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../helpers/setTokenAndReturnDataWithoutPassHash.js";


export default (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.userId = decoded._id
            next()
        } catch (e) {
            return res.status(403).json({
                "status" : "Нет доступа"
            })
        }
    }else {
        return res.status(403).json({
            "status" : "Нет доступа"
        })
    }

}