import Transaction from "../models/transaction.model.js"

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

        }
        // TODO => Add Category Statics Query
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const { description, paymentType, category, amount, location, date } = input
                if (!description || !paymentType || !category || !amount || !date) {
                    throw new Error("All fields are required")
                }
                console.log({
                    description, paymentType, category, amount, location, date, userId: context.getUser()._id
                })
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

    }

    // TODO => ADD Transaction/User Relation
}

export default transactionResolver