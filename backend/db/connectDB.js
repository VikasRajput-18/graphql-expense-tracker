import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
    console.log("process.env.MONGO_URI", process.env.MONGO_URI)
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${connection.connection.host}`)

    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}