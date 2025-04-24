import mongoose, { Schema } from "mongoose";



const transactionSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["cash", , "card"],
        required: true
    },
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: "Unknown"
    },
    date: {
        type: Date,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction