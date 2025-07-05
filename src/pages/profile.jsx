import { useState, useEffect } from 'react';
import { Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; 
import CloseIcon from '@mui/icons-material/Close'; 
import Footer from "../components/footer";
import NotFound from "./NotFound";
import axios from 'axios';
import { Delete } from '@mui/icons-material'; 

const TrackOrderTab = () => {
  const [data, setData] = useState([]); 

  const ACCESS_TOKEN = '68063351a46b81457373a349'; 

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `https://green-shop-backend.onrender.com/api/order/get-order?access_token=${ACCESS_TOKEN}`
      );
      setData(res?.data?.data);
    } catch (error) {
      console.error("Buyurtmalarni olishda xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    if (!orderId) {
      console.error("Buyurtma ID mavjud emas!");
      return;
    }
  
    try {
      const response = await axios.delete(
        `https://green-shop-backend.onrender.com/api/order/delete-order?_id=${orderId}&token=${ACCESS_TOKEN}`
      );
  
      if (response.status === 200) {
        console.log('Buyurtma muvaffaqiyatli o‘chirildi', response.data);
        setData((prevData) => prevData.filter(order => order._id !== orderId));
      } else {
        console.error('Serverdan xato javob:', response.data);
      }
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      if (error.response) {
        console.error('Server javobi (data):', error.response.data);
        console.error('Server javobi (status):', error.response.status);
      } else if (error.request) {
        console.error('So\'rov yuborildi, lekin javob olinmadi (tarmoq muammosi bo\'lishi mumkin):', error.request);
      } else {
        console.error('So\'rovni o\'rnatishda xatolik:', error.message);
      }
      if (error.response && error.response.status === 500) {
        console.error('Serverda ichki xatolik yuz berdi. Iltimos, keyinroq qayta urinib koring.');
      }
    }
  };
  
  return (
    <div className='w-full md:w-[850px] p-2 sm:p-4'>
      <h2 className='text-2xl font-bold mb-4'>Track Order</h2>
      {data.length > 0 ? ( 
        <div className='space-y-4'>
          {data.map((order) => ( 
            <div key={order._id} className='border border-gray-300 rounded p-4 shadow-sm'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2'>
                <div className="mb-2 sm:mb-0">
                  <h3 className='font-bold text-lg'>Order Number: <span className="font-normal text-gray-700 break-all">{order._id}</span></h3>
                </div>
                <div className="flex items-center gap-4">
                    <p className='text-xl font-semibold text-green-700'>Total: ${order.extra_shop_info?.total_price?.toFixed(2) || 'N/A'}</p>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => deleteOrder(order._id)} 
                      startIcon={<Delete />}
                      sx={{ 
                        backgroundColor: '#f44336', 
                        color: 'white', 
                        ':hover': { backgroundColor: '#d32f2f' },
                        minWidth: 'auto',
                        padding: '6px 12px'
                      }}
                    >
                      O'chirish
                    </Button>
                </div>
              </div>
              {order.shop_list && order.shop_list.length > 0 && (
                <div className="mt-3 border-t pt-3">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {order.shop_list.map((item, itemIdx) => (
                      <li key={itemIdx}>{item.title} x {item.quantity} - ${item.price?.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

const Blog = () => {
  const [activeTab, setActiveTab] = useState('accountDetails');
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setDrawerOpen(false); 
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { name: 'accountDetails', label: 'Account Details' },
    { name: 'myProducts', label: 'My Products' },
    { name: 'address', label: 'Address' },
    { name: 'wishlist', label: 'Wishlist' },
    { name: 'trackOrder', label: 'Track Order' },
  ];

  return (
    <Typography component="div"> 
      <div className='container max-w-[1216px] mx-auto px-4 py-2 flex flex-col md:flex-row gap-6 mt-5 md:mt-15'>
        
        <div className="md:hidden w-full flex justify-between items-center mb-4">
          <h2 className='font-bold text-2xl'>My Account</h2>
          <IconButton onClick={toggleDrawer(true)} size="large" sx={{ color: '#46A358' }}>
            <MenuIcon />
          </IconButton>
        </div>

        <div className='hidden md:block w-full md:w-[310px] flex-shrink-0 border border-gray-300 rounded p-3'>
          <ul className='flex flex-col gap-1'>
            <h2 className='font-bold text-2xl mb-2'>My Account</h2>
            {menuItems.map((item) => (
              <li key={item.name}>
                <button 
                  onClick={() => handleTabClick(item.name)} 
                  className={`w-full text-start border rounded p-2 ${activeTab === item.name ? 'bg-green-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  <p>{item.label}</p>
                </button>
              </li>
            ))}
            <hr className='text-green-500 mt-6 mb-2'/>
            <li className='mt-1'>
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleLogout} 
                sx={{ 
                  color: '#f44336', 
                  backgroundColor:'#FFFFFF' , 
                  ':hover': { color: '#d32f2f', backgroundColor: '#f5f5f5' },
                  width: '100%', 
                  justifyContent: 'flex-start', 
                  paddingLeft: '16px' 
                }}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>

        <Drawer
          anchor="right" 
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }} 
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className='font-bold text-xl'>My Account</h2>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton 
                    onClick={() => handleTabClick(item.name)} 
                    className={`${activeTab === item.name ? 'bg-green-100 font-semibold' : ''}`} // Active state
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" sx={{ color: '#f44336' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <div className='flex-grow w-full'> 
          {activeTab === 'accountDetails' && (
            <div className='w-full border rounded p-4'>
              <h2 className='text-2xl font-bold mb-4'>Account Details</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>First name</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Type your first name...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Last name</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Type your last name...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Email address</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="email" placeholder='Your email address...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Phone Number</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="number" placeholder='Your phone number...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Username</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Your username...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Profile Photo</h3>
                  <input className='w-full h-[40px] border rounded p-2' type="file" />
                </div>
              </div>
              <button className='w-full sm:w-[131px] mt-6 h-10 rounded bg-green-500 text-white border p-2 hover:bg-green-600 transition'>Save changes</button>
            </div>
          )}

          {activeTab === 'myProducts' && (
            <div className='w-full border rounded p-4'>
              <h2 className='text-2xl font-bold text-start w-full mb-4'>My Products</h2>
              <NotFound/>
            </div>
          )}

          {activeTab === 'address' && (
            <div className='w-full border rounded p-4'>
              <div>
                <h2 className='text-2xl font-bold mb-2'>Address</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">The following addresses will be used on the checkout page by default.</p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>First name</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Type your first name...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Last name</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Type your last name...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Country / Region</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Select your country...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Town / City</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Select your town...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Street Address</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='House number and street name...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Extra address</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Apartment, suite, unit, etc. (optional)' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>State</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Select a state...' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Zip</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="text" placeholder='Enter ZIP code' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Email address</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="email" placeholder='Type your email' />
                </div>
                <div>
                  <h3 className='mb-1'><span className='text-red-500 mr-1'>*</span>Phone Number</h3>
                  <input className='w-full h-[40px] border rounded p-2 focus:ring-green-500 focus:border-green-500' type="number" placeholder='Type your phone number' />
                </div>
              </div>
              <button className='w-full sm:w-[131px] mt-6 h-10 rounded bg-green-500 text-white border p-2 hover:bg-green-600 transition'>
                Save address
              </button>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className='w-full border rounded p-4'>
              <h2 className='text-2xl font-bold mb-4'>Wishlist</h2>
              <NotFound/>
            </div>
          )}

          {activeTab === 'trackOrder' && <TrackOrderTab />}
        </div>
      </div>
      <Footer/>
    </Typography>
  );
};

export default Blog;