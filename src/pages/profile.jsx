import { useState, useEffect } from 'react';
import { Typography, Button } from "@mui/material";
import Footer from "../components/footer";
import NotFound from "./NotFound";
import axios from 'axios';

const TrackOrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const getOrders = async () => {
    const res = await axios.get(
      "https://green-shop-backend.onrender.com/api/order/get-order?access_token=68063351a46b81457373a349"
    );
    setData(res?.data?.data);
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
      const response = await axios({
        method: 'delete',
        url: 'https://green-shop-backend.onrender.com/api/order/delete-order',
        params: {
          access_token: '68063351a46b81457373a349',
          _id: orderId  
        }
      });
  
      console.log('Buyurtma muvaffaqiyatli o‘chirildi', response.data);
      setData((prevData) => prevData.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Xatolik yuz berdi:', error.response?.data || error.message);
    }
  };
  
  
  
  
  

  return (
    <div className='w-[850px] h-auto'>
      <h2 className='text-2xl font-bold mb-4'>Track Order</h2>
      {orders.length > 0 ? (
        <ul className='space-y-6'>
          <div>
            {data.map((order, idx) => (
              <div key={idx}>
                <ul>
                  <li>
                    <h2 className='font-bold'>Order Number</h2>
                    {order._id.slice(-14)}
                  </li>
                  <li>
                  <button className='border p-1 rounded' onClick={() => deleteOrder(order._id)}>
                    O'chirish
                  </button>


                  </li>
                </ul>
              </div>
            ))}
          </div>
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
};


const Blog = () => {
  const [activeTab, setActiveTab] = useState('accountDetails');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <Typography>
      <div className='container max-w-[1216px] m-auto overflow-hidden pt-2 flex justify-between mt-15'>
        <div>
          <div className='w-[310px] h-auto border border-gray-300 rounded'>
            <ul className='p-3 flex flex-col gap-1'>
              <h2 className='font-bold text-2xl'>My Account</h2>
              <li>
                <button onClick={() => setActiveTab('accountDetails')} className={`w-full text-start border rounded p-2 ${activeTab === 'accountDetails' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Account Details</p>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('myProducts')} className={`w-full text-start border rounded p-2 ${activeTab === 'myProducts' ? 'bg-green-500 text-white' : ''}`}>
                  <p>My Products</p>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('address')} className={`w-full text-start border rounded p-2 ${activeTab === 'address' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Address</p>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wishlist')} className={`w-full text-start border rounded p-2 ${activeTab === 'wishlist' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Wishlist</p>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trackOrder')} className={`w-full text-start border rounded p-2 ${activeTab === 'trackOrder' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Track Order</p>
                </button>
              </li>
              <hr className='text-green-500 mt-10'/>
              <li className='mt-1'>
                <Button variant="contained" color="error" onClick={handleLogout} sx={{ color: '#f44336', backgroundColor:'#FFFFFF' , ':hover': { color: '#d32f2f' } }}>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div>
          {activeTab === 'accountDetails' && (
            <div className='w-[850px] grid grid-cols-2 gap-12'>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>First name</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Type your first name...' />
              </div>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>Last name</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Type your last name...' />
              </div>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>Email address</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="email" placeholder='Your email address...' />
              </div>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>Phone Number</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="number" placeholder='Your phone number...' />
              </div>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>Username</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Your username...' />
              </div>
              <div>
                <h3><span className='text-red-500 mr-1'>*</span>Profile Photo</h3>
                <input className='w-[350px] h-[40px] border rounded p-2' type="file" />
              </div>
              <button className='w-[131px] h-10 rounded bg-green-500 text-white border p-2'>Save changes</button>
            </div>
          )}

          {activeTab === 'myProducts' && (
            <div className='w-[850px] h-auto'>
              <h2 className='text-2xl font-bold text-start w-full'>My Products</h2>
              <NotFound/>
            </div>
          )}

          {activeTab === 'address' && (
              <div className='w-[850px] h-auto'>
                <div>
                  <h2 className='text-2xl font-bold'>Address</h2>
                  <p>The following addresses will be used on the checkout page by default.</p>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-3'>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>First name</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Type your first name...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Last name</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Type your last name...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Country / Region</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select your country...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Town / City</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select your town...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Street Address</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='House number and street name...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Extra address</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Apartment, suite, unit, etc. (optional)' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>State</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select a state...' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Zip</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Enter ZIP code' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Email address</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="email" placeholder='Type your email' />
                  </div>
                  <div>
                    <h3><span className='text-red-500 mr-1'>*</span>Phone Number</h3>
                    <input className='w-[350px] h-[40px] border rounded p-2' type="number" placeholder='Type your phone number' />
                  </div>
                  <button className='w-[131px] h-10 rounded bg-green-500 text-white border p-2'>
                    Save address
                  </button>
                </div>
              </div>
          )}

          {activeTab === 'wishlist' && (
            <div className='w-[850px] h-auto'>
              <h2 className='text-2xl font-bold'>Wishlist</h2>
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
