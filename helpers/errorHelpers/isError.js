import {validationResult} from "express-validator";


export const isCorrect = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return false
    }
    return true
}