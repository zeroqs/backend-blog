import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

export const connectDB = () => {
    mongoose
        .connect(process.env.DB_CONN,
        )
        .then(() => console.log('DB ok'))
        .catch((e) => console.log(e))
}