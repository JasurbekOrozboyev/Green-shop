// import axios from "axios";
// import { useEffect, useState } from "react";

// const Discount = () => {
//     const [discount, setDiscount] = useState([]);

//     const getDiscount = async () => {
//         const res = await axios.get(
//             "https://green-shop-backend.onrender.com/api/features/discount?access_token=6506e8bd6ec24be5de357927"
//         );
//         setDiscount(res?.data?.data);
//     };

//     useEffect(() => {
//         getDiscount();
//     }, []);

//     return (
//         <div>
//             {discount.map((data, i) => (
//                 <div key={i}>
//                     <img src={data.poster_image_url} alt="gul" />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Discount;
