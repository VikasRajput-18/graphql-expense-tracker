import { useMutation } from "@apollo/client";
import Card from "./Card";
import { DELETE_TRANSACRION } from "../graphql/mutation/transaction.mutation";

import toast from "react-hot-toast"

const Cards = ({ transactions  ,profile_picture}) => {

    const [deleteTransaction] = useMutation(DELETE_TRANSACRION, {
        refetchQueries: ["GetTransactions", "CategoryStatitics"]
    })

    const handleDelete = async (transactionId) => {
        try {
            await deleteTransaction({
                variables: {
                    transactionId
                }
            })
            toast.success("Transaction Deleted Successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full px-10 min-h-[40vh]'>
            <p className='text-5xl font-bold text-center text-white my-10'>History</p>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
                {
                    transactions?.map(transaction => (
                        <Card cardType={transaction.category} key={transaction?._id} profile_picture={profile_picture} {...transaction} handleDelete={() => handleDelete(transaction?._id)} />
                    ))
                }
            </div>
        </div>
    );
};
export default Cards;