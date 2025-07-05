import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider, Button, IconButton, Menu, MenuItem } from '@mui/material'; // MenuItem va Menu qo'shildi
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger ikonasi import qilindi
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-');

const Category = () => {
  const [data, setData] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Hamburger menyu holati uchun state
  const openMenu = Boolean(anchorEl); // Menyu ochiqmi yopiqmi

  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const size = searchParams.get("size");

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://green-shop-backend.onrender.com/api/flower/category?access_token=68063351a46b81457373a349"
      );
      setData(res?.data?.data);

      if (!searchParams.get("category") && res?.data?.data.length > 0) {
        const firstCategorySlug = slugify(res.data.data[0].title);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("category", firstCategorySlug);
        setSearchParams(newParams);
      }
    } catch (error) {
      console.error("Kategoriyalarni olishda xato yuz berdi:", error);
    }
  };

  const getFlowers = async () => {
    try {
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
    } catch (error) {
      console.error("Gullarni olishda xato yuz berdi:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (category) {
      getFlowers();
    }
  }, [category, type, sort, minPrice, maxPrice, size]);

  const handleCategoryClick = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", slug);
    setSearchParams(newParams);
    handleMenuClose(); // Kategoriyani tanlagandan keyin menyuni yopish
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

  const handleSizeClick = (sizeValue) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("size", sizeValue);
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
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='container max-w-[1216px] mx-auto overflow-hidden pt-2 px-4'>
      <div>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Mahsulot savatga qo'shildi!
          </MuiAlert>
        </Snackbar>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-[50px]">
        {/* Hamburger menyu mobil ko'rinishda */}
        <div className="lg:hidden w-full mb-4">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ color: '#46A358' }}
          >
            <MenuIcon />
          </IconButton>
          <span className="ml-2 text-[18px] font-semibold">Kategoriyalar</span>
          <Menu
            id="category-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {data.map((dat) => {
              const slug = slugify(dat.title);
              return (
                <MenuItem 
                  key={slug} 
                  onClick={() => handleCategoryClick(slug)}
                  selected={category === slug}
                  sx={{ 
                    '&.Mui-selected': { 
                      backgroundColor: 'rgba(70, 163, 88, 0.1)', // Green-500 rangining yengilroq varianti
                      color: '#46A358', 
                      fontWeight: 'bold' 
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(70, 163, 88, 0.05)',
                    }
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{dat.title}</span>
                    <span>({dat.count})</span>
                  </div>
                </MenuItem>
              );
            })}
          </Menu>
        </div>

        {/* Sidebar - faqat katta ekranlarda ko'rinadi */}
        <div className="hidden lg:block w-full lg:w-[310px] h-auto border border-gray-200 rounded p-2 mb-6 lg:mb-0">
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
                min={0}
              />
            </p>
            <p className="text-[16px] font-bold mb-4">
              Price: <span className="text-green-500 font-bold">${priceRange[0]} - ${priceRange[1]}</span>
            </p>
            <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#39a84a' } }} className="w-[90px] h-[35px]" onClick={handlePriceFilter}>
              Filter
            </Button>
          </div>

          <div className="w-full mt-11 ">
            <h2 className="font-bold text-[18px] mb-4">Size</h2>
            <ul className="flex flex-col gap-3">
              <li onClick={() => handleSizeClick('small')} className={`flex justify-between items-center cursor-pointer ${size === 'small' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>
                <p>Small</p>
                <p>(119)</p>
              </li>
              <li onClick={() => handleSizeClick('medium')} className={`flex justify-between items-center cursor-pointer ${size === 'medium' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>
                <p>Medium</p>
                <p>(86)</p>
              </li>
              <li onClick={() => handleSizeClick('large')} className={`flex justify-between items-center cursor-pointer ${size === 'large' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>
                <p>Large</p>
                <p>(78)</p>
              </li>
            </ul>
          </div>
          <div className="rounded mt-5 p-2 bg-gradient-to-b from-[#46A3581A] to-[#46A35808] text-center">
            <h2 className="text-[51px] font-medium text-[#46A358]">Super Sale</h2>
            <h2 className="text-[23px]">UP TO 75% OFF</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fafrican_violet.png?alt=media&token=821c06d0-4b3c-4931-9717-40efdba2f458" alt="gul" className="mx-auto" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col border border-gray-200 rounded p-3 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 sm:gap-0">
            <ul className="flex gap-4 sm:gap-[34px] flex-wrap justify-center">
              <li onClick={() => handleTypeClick('all')} className={`cursor-pointer ${type === 'all' || !type ? "text-green-500 font-bold" : "hover:text-green-500"}`}>All Plants</li>
              <li onClick={() => handleTypeClick('new-arrivals')} className={`cursor-pointer ${type === 'new-arrivals' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>New Arrivals</li>
              <li onClick={() => handleTypeClick('sale')} className={`cursor-pointer ${type === 'sale' ? "text-green-500 font-bold" : "hover:text-green-500"}`}>Sale</li>
            </ul>
            <div className="w-full sm:w-auto text-center sm:text-left">
              <ul className="flex items-center gap-2 justify-center sm:justify-start">
                <li>Sort by:</li>
                <li>
                  <select onChange={handleSortChange} value={sort || ""} className="border rounded px-2 py-1 w-full">
                    <option value="">Default Sorting</option>
                    <option value="cheapest">The Cheapest</option>
                    <option value="expensive">Most Expensive</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[50px] justify-items-center">
            {flowers.length > 0 ? (
              flowers.map((flower) => (
                <div className="group w-full max-w-[280px]" key={flower._id}>
                  <div className="border border-gray-300 p-3 relative h-[300px] flex items-center justify-center overflow-hidden">
                    {flower.discount && flower.discount > 0 && (
                      <p className="absolute top-[21px] left-0 bg-green-500 text-white px-3 py-1 text-sm">
                        {flower.discount}% OFF
                      </p>
                    )}
                    {/* Bu yerda o'zgarish qildik! */}
                    <button 
                      className="w-7 h-7 absolute bottom-6 right-5 transition-all transform active:scale-75 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100" // group-hover:opacity-100 group-hover:block klasslari olib tashlandi
                      onClick={() => addToCart(flower)}
                      aria-label="Add to cart"
                    >
                      <ShoppingCartIcon fontSize="small" />
                    </button>
                    <img src={flower.main_image} alt={flower.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <p className="text-[16px] mt-2 truncate">{flower.title}</p>
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-green-500 text-[18px]">${flower.price.toFixed(2)}</p>
                    {flower.old_price && (
                      <p className="text-[16px] text-gray-400 line-through">${flower.old_price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg py-10">Mahsulotlar topilmadi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;