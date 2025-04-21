import axios from "axios";
import React, { useEffect, useState } from "react";
import { Slider, Button } from '@mui/material';

const api = import.meta.env.VITE_API;

const Category = () => {
  const [data, setData] = useState([]);
  const [flowers, setFlowers] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "https://green-shop-backend.onrender.com/api/flower/category?access_token=6506e8bd6ec24be5de357927"
    );
    setData(res?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const getFlowersData = async () => {
    const res = await axios.get(
        "https://green-shop-backend.onrender.com/api/flower/category/house-plants?access_token=6506e8bd6ec24be5de357927"
    );
    setFlowers(res?.data?.data);
  };
  useEffect(() =>{
    getFlowersData();
  }, [])

  return (
    <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
     <div className="flex justify-between gap-[50px]">
      <div className="w-[310px] h-auto border border-gray-200 rounded p-2">
        <h3 className="text-[18px] font-semibold mb-3">Categoriya sahifasi</h3>
        {data.map((dat) => (
            <div >
                <ul className="flex justify-between items-center  hover:text-green-500">
                    <li className="mb-[12px]">{dat.title}</li>
                    <li>({dat.count})</li>
                </ul>
            </div>
        ))
        }
        <div className="mt-6 ml-1">
            <h2 className="text-[18px] font-semibold mb-4">Price Range</h2>
            <p className="py-1 px-3"><Slider getAriaLabel={() => 'Temperature range'} sx={{color : '#00C951',}}   valueLabelDisplay="auto" className="" max={1000}/></p>
            <p className="text-[16px] font-bold mb-4">Price: <span className="text-green-500 font-bold">$39 - $1230</span></p>
            <Button variant="contained" sx={{backgroundColor: '#00C951',}} className="w-[90px] h-[35px]">
                Filter
            </Button>
        </div>
        <div className="w-full mt-11 ">
            <h2 className="font-bold text-[18px]">Size</h2>
            <ul className="flex flex-col gap-3">
                <li className="flex justify-between items-center">
                    <p>Samll</p>
                    <p>(119)</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>Medium</p>
                    <p>(86)</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>Large</p>
                    <p>(78)</p>
                </li>
                
            </ul>
        </div>
        <div className="rounded mt-5 p-2 bg-gradient-to-b from-[#46A3581A] to-[#46A35808]">
            <h2 className="text-[51px] text-center font-medium text-[#46A358]">Super Sale</h2>
            <h2 className="text-[23px] text-center ">UP TO 75% OFF</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fafrican_violet.png?alt=media&token=821c06d0-4b3c-4931-9717-40efdba2f458" alt="gul" />
        </div>
      </div>
      <div className="flex flex-col border border-gray-200 rounded p-3">
        <div>
            <div className="flex justify-between items-center mb-4">
            <div>
                <ul className="flex gap-[34px]">
                    <li className="hover:text-green-500 font-bold">All Plants</li>
                    <li className="hover:text-green-500 font-bold">New Arrivals</li>
                    <li className="hover:text-green-500 font-bold">Sale</li>
                </ul>
            </div>
            <div>
                <ul className="flex">
                    <li>Short by:</li>
                    <li> <select>
                        <option value="#">Defoult Sorting</option>
                        <option value="#">The Cheapest</option>
                        <option value="#">Most Expensive</option>
                        </select></li>
                </ul>
            </div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-[50px]">
        {flowers.map((flower) => (
            <div>
                <div className="border border-gray-300 p-3 relative">
                    <p className="absolute top-[21px] left-0 bg-green-500 text-white px-3 py-1">13% OFF</p>
                <img src={flower.main_image} alt="gul" className="w-[250px] h-[250px] border" />
                </div>
                <p className="text-[16px]">{flower.title}</p>
                <div className="flex gap-2">
                <p className="font-bold text-green-500 text-[18px]">${flower.price}</p>
                <p className="text-[18px] text-gray-300 line-through">${flower.price}</p>
                
                </div>
                
            </div>
        ))}
        
        </div>
      </div>
     </div>
    </div>
  );
};

export default Category;