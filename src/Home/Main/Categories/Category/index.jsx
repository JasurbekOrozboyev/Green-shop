import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-');

const Category = () => {
  const [data, setData] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const size = searchParams.get("size");

  const getCategories = async () => {
    const res = await axios.get(
      "https://green-shop-backend.onrender.com/api/flower/category?access_token=68063351a46b81457373a349"
    );
    setData(res?.data?.data);
  };

  const getFlowers = async () => {
    let categoryPath = category ? category : 'all-plants';
    let apiUrl = `https://green-shop-backend.onrender.com/api/flower/category/${categoryPath}?access_token=68063351a46b81457373a349`;

    const res = await axios.get(apiUrl);
    let flowersData = res?.data?.data;

    if (type === 'new-arrivals') {
      flowersData = flowersData.filter(flower => flower.type === "new");
    } else if (type === 'sale') {
      flowersData = flowersData.filter(flower => flower.type === "sale");
    }

    if (size) {
      flowersData = flowersData.filter(flower => flower.size === size);
    }

    flowersData = flowersData.filter(
      flower => flower.price >= minPrice && flower.price <= maxPrice
    );

    if (sort === 'cheapest') {
      flowersData.sort((a, b) => a.price - b.price);
    } else if (sort === 'expensive') {
      flowersData.sort((a, b) => b.price - a.price);
    }

    setFlowers(flowersData);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getFlowers();
  }, [category, type, sort, minPrice, maxPrice]);

  const handleCategoryClick = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", slug);
    setSearchParams(newParams);
  };

  const handleTypeClick = (typeValue) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", typeValue);
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", e.target.value);
    setSearchParams(newParams);
  };


  const handlePriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", priceRange[0]);
    newParams.set("maxPrice", priceRange[1]);
    setSearchParams(newParams);
  };


  const addToCart = (flower) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === flower._id);
  
    if (!exists) {
      const updatedCart = [...cart, flower];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  
    window.dispatchEvent(new Event('cartUpdated'));
  
    handleSnackbarOpen();
  };
  
  
  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };
  
  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  

  return (
    <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
      <div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Mahsulot savatga qo'shildi!
        </MuiAlert>
      </Snackbar>
    </div>
      <div className="flex justify-between gap-[50px]">
        <div className="w-[310px] h-auto border border-gray-200 rounded p-2">
          <h3 className="text-[18px] font-semibold mb-3">Categoriya sahifasi</h3>
          {data.map((dat) => {
            const slug = slugify(dat.title);
            return (
              <div key={slug} onClick={() => handleCategoryClick(slug)}>
                <ul className={`flex justify-between items-center text-[18px] mb-[12px] cursor-pointer
                ${category === slug ? "text-green-500 font-bold" : "hover:text-green-500"}`}>
                  <li>{dat.title}</li>
                  <li>({dat.count})</li>
                </ul>
              </div>
            );
          })}
          <div className="mt-6 ml-1">
            <h2 className="text-[18px] font-semibold mb-4">Price Range</h2>
            <p className="py-1 px-3">
              <Slider
                sx={{ color: '#00C951' }}
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                max={1000}
              />
            </p>
            <p className="text-[16px] font-bold mb-4">
              Price: <span className="text-green-500 font-bold">${priceRange[0]} - ${priceRange[1]}</span>
            </p>
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className="w-[90px] h-[35px]" onClick={handlePriceFilter}>
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

        <div className="flex flex-col border border-gray-200 rounded p-3 w-full">
          <div className="flex justify-between items-center mb-4">
            <ul className="flex gap-[34px]">
              <li onClick={() => handleTypeClick('all')} className={`cursor-pointer ${type === 'all' || !type ? "text-green-500 font-bold" : "hover:text-green-500"}`}>All Plants</li>
              <li onClick={() => handleTypeClick('new-arrivals')} className={`cursor-pointer ${type === 'new-arrivals' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>New Arrivals</li>
              <li onClick={() => handleTypeClick('sale')} className={`cursor-pointer ${type === 'sale' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>Sale</li>
            </ul>
            <div>
              <ul className="flex items-center gap-2">
                <li>Sort by:</li>
                <li>
                  <select onChange={handleSortChange} value={sort || ""} className="border rounded px-2 py-1">
                    <option value="">Default Sorting</option>
                    <option value="cheapest">The Cheapest</option>
                    <option value="expensive">Most Expensive</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[50px]">
            {flowers.map((flower) => (
              <div className="group" key={flower._id}>
                <div className="border border-gray-300 p-3 relative">
                  <p className="absolute top-[21px] left-0 bg-green-500 text-white px-3 py-1">13% OFF</p>
                  <button className="w-7 h-7 absolute bottom-6 right-5 transition transform active:scale-75 group-hover:block hidden" onClick={() => addToCart(flower)}>
                      <ShoppingCartIcon />
                  </button>
                  <img src={flower.main_image} alt={flower.title} className="w-[250px] h-[250px] border" />
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

