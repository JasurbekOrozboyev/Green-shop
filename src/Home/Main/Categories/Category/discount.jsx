import axios from "axios";
import { useEffect, useState } from "react";

const Discount = () => {
    const [discount, setDiscount] = useState([]);

    const getDiscount = async () => {
        try {
            const res = await axios.get(
                "https://green-shop-backend.onrender.com/api/user/blog?access_token=680bac52073c8af77e8a405f&search"
            );
            setDiscount(res?.data?.data);
        } catch (error) {
            console.error("Error fetching discounts:", error);
            setDiscount([]); 
        }
    };

    useEffect(() => {
        getDiscount();
    }, []);

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 p-4 sm:p-0'>
            {discount.length > 0 ? (
                discount.map((data, i) => (
                    <div key={i} className="flex">
                       <div className="flex-1 border border-gray-300 rounded shadow p-4 flex flex-col justify-between"> 
                           <h2 className='font-bold mb-2 text-xl sm:text-2xl'>{data.title}</h2> 
                           <p className="text-sm sm:text-base text-gray-700">{data.short_description}</p>
                       </div>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-10">Ma'lumotlar topilmadi.</p>
            )}
        </div>
    );
};

export default Discount;