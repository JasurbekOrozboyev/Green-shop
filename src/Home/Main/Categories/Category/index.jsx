import axios from "axios";
import React, { useEffect, useState } from "react";

const api = import.meta.env.VITE_API;

const Category = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "https://green-shop-backend.onrender.com/api/flower/category?access_token=6506e8bd6ec24be5de357927"
    );
    setData(res?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="w-[310px]">
      <h3 className="text-center">Categoriya sahifasi</h3>
      <div>
        {data.map((dat) => (
            <div >
                <ul className="flex justify-between items-center">
                    <li>{dat.title}</li>
                    <li>({dat.count})</li>
                </ul>
            </div>
        ))
        }
      </div>
    </div>
  );
};

export default Category;