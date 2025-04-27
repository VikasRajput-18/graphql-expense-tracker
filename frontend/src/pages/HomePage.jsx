import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutation/user.mutation";
import toast from "react-hot-toast";
import { CATEGORY_STATITICS, TRANSACTIONS } from "../graphql/query/transaction.query";
import { useEffect, useState } from "react";
import { GET_USER_AND_TRANSACTIONS } from "../graphql/query/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = ({ user }) => {

    const [logout, { loading, client }] = useMutation(LOGOUT, {
        refetchQueries: ["GetAuthenticatedUser", "CategoryStatitics"]
    })
    const { data: categoryStats } = useQuery(CATEGORY_STATITICS)
    const { data } = useQuery(TRANSACTIONS)
    // const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    //     variables: {
    //         userId: user?._id
    //     }
    // })



    const [chartData, setChartData] = useState({
        labels: ["Saving", "Expense", "Investment"],
        datasets: [
            {
                label: "$",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 3,
                borderRadius: 30,
                spacing: 20,
                cutout: 130,
            },
        ],
    })


    const handleLogout = async () => {
        try {
            await logout()
            client.resetStore()
        } catch (error) {
            toast.error(error.message)
        }
    };


    useEffect(() => {

        if (categoryStats?.categoryStatistics) {
            const categories = categoryStats?.categoryStatistics?.map(stat => stat.category);
            const totalAmounts = categoryStats?.categoryStatistics?.map(stat => stat.totalAmount);


            const backgroundColors = []
            const borderColors = []

            categories.forEach(category => {
                if (category === "saving") {
                    backgroundColors.push("rgba(75, 192, 192)")
                    borderColors.push("rgba(75, 192, 192)")
                }
                if (category === "expense") {
                    backgroundColors.push("rgba(255, 99, 132)")
                    borderColors.push("rgba(255, 99, 132)")
                }
                if (category === "investment") {
                    backgroundColors.push("rgba(54, 162, 235)")
                    borderColors.push("rgba(54, 162, 235)")
                }
            })



            setChartData(prev => ({
                labels: categories,
                datasets: [
                    {

                        ...prev.datasets[0],
                        data: totalAmounts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                    },
                ],
            }))
        }

    }, [categoryStats])



    return (
        <>
            <div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
                <div className='flex items-center'>
                    <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
                        Spend wisely, track wisely
                    </p>
                    <img
                        src={user?.profile_picture}
                        className='w-11 h-11 rounded-full border cursor-pointer'
                        alt={user?.name}
                    />
                    {!loading && <MdLogout className='mx-2 text-white w-5 h-5 cursor-pointer' onClick={handleLogout} />}
                    {/* loading spinner */}
                    {loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
                </div>
                <div className='flex flex-wrap w-full justify-center items-center gap-6'>
                    {
                        categoryStats?.categoryStatistics?.length > 0 &&
                        <div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
                            <Doughnut data={chartData} />
                        </div>
                    }

                    <TransactionForm />
                </div>
                <Cards transactions={data?.transactions} profile_picture={user?.profile_picture} />
            </div>
        </>
    );
};
export default HomePage;