import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const categoryColorMap = {
    saving: "from-green-700 to-green-400",
    expense: "from-pink-800 to-pink-600",
    investment: "from-blue-700 to-blue-400",
    // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType, amount, date, description, location, paymentType, handleDelete, _id }) => {
    const cardClass = categoryColorMap[cardType];
    const dateNum = new Date(Number(date));
    const formatDate = dateNum?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center justify-between'>
                    <h2 className='text-lg font-bold text-white capitalize'>{cardType}</h2>
                    <div className='flex items-center gap-2'>
                        <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
                        <Link to={`/transaction/${_id}`}>
                            <HiPencilAlt className='cursor-pointer' size={20} />
                        </Link>
                    </div>
                </div>
                <p className='text-white flex items-center gap-1'>
                    <BsCardText />
                    Description: {description}
                </p>
                <p className='text-white capitalize flex items-center gap-1'>
                    <MdOutlinePayments />
                    Payment Type: {paymentType}
                </p>
                <p className='text-white flex items-center gap-1'>
                    <FaSackDollar />
                    Amount: ${amount}
                </p>
                <p className='text-white flex items-center gap-1'>
                    <FaLocationDot />
                    Location: {location || "N/A"}
                </p>
                <div className='flex justify-between items-center'>
                    <p className='text-xs text-white font-bold'>{formatDate}</p>
                    <img
                        src={"https://avatar.iran.liara.run/public/boy"}
                        className='h-8 w-8 border rounded-full'
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
};
export default Card;