import axios from "axios";
import { useEffect, useState } from "react";

const Discount = () => {
    const [discount, setDiscount] = useState([]);

    const getDiscount = async () => {
        const res = await axios.get(
            "https://green-shop-backend.onrender.com/api/user/blog?access_token=680bac52073c8af77e8a405f&search"
        );
        setDiscount(res?.data?.data);
    };

    useEffect(() => {
        getDiscount();
    }, []);

    return (
        <div className='w-full grid grid-cols-3 gap-5 mt-10'>
            {discount.map((data, i) => (
                <div  key={i}>
                   <div className="h-[250px] border border-gray-300 rounded shadow p-3">
                    <h2 className='font-bold mb-1 text-2xl'>{data.title}</h2>
                    <p>{data.short_description}</p>
                   </div>
                </div>
            ))}
        </div>
    );
};

export default Discount;
