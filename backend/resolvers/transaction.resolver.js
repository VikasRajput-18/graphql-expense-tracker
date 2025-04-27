import Transaction from "../models/transaction.model.js"
import User from "../models/user.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, args, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized")
                const userId = await context.getUser()._id
                const transactions = await Transaction.find({ userId });
                return transactions
            } catch (error) {
                console.error(`Error getting transactions : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        transaction: async (_, { transactionId }, context) => {
            try {
                if (!context.getUser()) throw new Error(`Unauthorized`)
                const transaction = await Transaction.findById(transactionId)
                console.log("transaction", transaction, transactionId)
                return transaction
            } catch (error) {
                console.error(`Error getting transaction : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }

        },
        categoryStatistics: async (parent, args, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized")
                const userId = context.getUser()._id
                const transactions = await Transaction.find({ userId })
                const categoryMap = {}

                transactions.forEach((transaction) => {
                    if (!categoryMap[transaction.category]) {
                        categoryMap[transaction.category] = 0
                    }
                    categoryMap[transaction.category] += transaction.amount
                });


                return Object.entries(categoryMap).map(([category, amount]) => ({ category, totalAmount: amount }))

            } catch (error) {
                console.error(`Error in categoryStatistics : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const { description, paymentType, category, amount, location, date } = input
                if (!description || !paymentType || !category || !amount || !date) {
                    throw new Error("All fields are required")
                }

                const newTransaction = await Transaction.create({
                    description, paymentType, category, amount, location, date, userId: context.getUser()._id
                })

                return newTransaction

            } catch (error) {
                console.error(`Error in createtransaction : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        updateTransaction: async (_, { input }) => {
            try {

                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,
                    input
                    , { new: true, runValidators: true })

                return updatedTransaction
            } catch (error) {
                console.error(`Error in updateTransaction : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }


        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction
            } catch (error) {
                console.error(`Error in deleteTransaction : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }
        },



    },

    Transaction: {
        user: async (parent) => {
            try {
                const userId = parent.userId // parent is transaction
                const user = await User.findById(userId);
                return user
            } catch (error) {
                console.error(`Error in transaction.user : ${error}`)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    }



}

export default transactionResolver