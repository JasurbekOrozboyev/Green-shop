import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube, faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Icon from '../images/icon/Vector.svg'
import IconGul from "../images/section3/gulIcon.svg";




const Blog = () => {
  const [activeTab, setActiveTab] = useState('accountDetails');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');     
    localStorage.removeItem('userName');    
    setUserName('');                     
    navigate('/');                        
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Blog sahifasiga kirish uchun login qiling!');
      navigate('/');
    }
  }, [navigate]);

  return <Typography >
  <div className='container max-w-[1216px] m-auto overflow-hidden pt-2 flex justify-between mt-15'>
      <div>
        <div className='w-[310px] h-auto border border-gray-300 rounded'>
          
          <ul className='p-3 flex flex-col gap-1'>
          <h2 className='font-bold text-2xl'>My Account</h2>
          <li>
                <button  onClick={() => setActiveTab('accountDetails')}  className={`w-full text-start border rounded p-2 ${activeTab === 'accountDetails' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Account Details</p>
                </button>
              </li>
              <li>
                <button  onClick={() => setActiveTab('myProducts')}  className={`w-full text-start border rounded p-2 ${activeTab === 'myProducts' ? 'bg-green-500 text-white' : ''}`}>
                  <p>My Products</p>
                </button>
              </li>
              <li>
                <button  onClick={() => setActiveTab('address')}  className={`w-full text-start border rounded p-2 ${activeTab === 'address' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Address</p>
                </button>
              </li>
              <li>
                <button  onClick={() => setActiveTab('wishlist')}  className={`w-full text-start border rounded p-2 ${activeTab === 'wishlist' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Wishlist</p>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('trackOrder')} 
                  className={`w-full text-start border rounded p-2 ${activeTab === 'trackOrder' ? 'bg-green-500 text-white' : ''}`}>
                  <p>Track Order</p>
                </button>
              </li>
              <hr className='text-green-500 mt-10'/>
              <li>
                <button onClick={handleLogout} className='mt-3 border rounded px-2'>
                  <p className='text-red-500'>Log Out</p>
                </button>
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
              <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select you country...' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Town / City</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select you town...' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Streed Address</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='House number and street name...' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Extra address</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Apparment, suit, unit, etc. (optional)' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>State</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="text" placeholder='Select a state...' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Zip </h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="file" placeholder='' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Email address</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="email" placeholder='Type you email' />
              </div>
              <div>
              <h3><span className='text-red-500 mr-1'>*</span>Phone Number</h3>
              <input className='w-[350px] h-[40px] border rounded p-2' type="number" placeholder='Type you phone number' />
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
          </div>
        )}

        {activeTab === 'trackOrder' && (
          <div className='w-[850px] h-auto'>
            <h2 className='text-2xl font-bold'>Track Order</h2>
          </div>
        )}
      </div>
    </div>




  <footer className='container max-w-[1216px] m-auto mt-30'>
        <div className='flex justify-between items-start'>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[400px] h-[201px]'>
            <h2 className='text-[18px] font-bold'>Would you like to join newsletters?</h2>
            <div className='w-[354px] h-10'>
              <input type="email" placeholder='enter your email address...' className='w-[265px] h-10 border rounded-bl rounded-tl px-3 py-1'/>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px] w-[85px] h-10'>
                <p>Join</p>
              </Button>
            </div>
            <p className='w text-[13px] text-[#727272]'>We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
          </div>
        </div>
        <div className='h-[88px] bg-[#EDF6EF]'>
          <ul className='flex justify-around items-center pt-[28px]'>
            <li className='flex items-center'>
                <img src={Icon} alt="Icon" className='w-[35px] h-[35px]'/>
                <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faLocationDot}  className='text-[#46A358] text-5'/>
              </div>
              <div>
                <p className='w-[185px] h-11 text-[14px] text-[#3D3D3D]'>70 West Buckingham Ave.
                Farmingdale, NY 11735</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faEnvelope} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>contact@greenshop.com</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faPhone} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>
                +88 01911 717 490
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='flex justify-between mt-5'>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Address</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>
              Wishlist
              </p>
            </li>
          </ul>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>Categories</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>House Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Potter Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Seeds</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Small Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Accessories</p>
            </li>
          </ul>
          <ul>
            <li>
              <h2 className='text-[18px] font-bold mb-5'>Social Media</h2>
              <div>
                <ul className='flex justify-between items-center gap-4'>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faFacebookF} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faInstagram} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faTwitter} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faLinkedin} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faYoutube} className='text-[#46A35899]'/>
                  </li>
                </ul>
                <h2 className='mt-[33px] mb-3 font-bold text-[18px]'>We accept</h2>
                <ul className='flex items-center gap-10'>
                  <li>
                  <FontAwesomeIcon icon={faCcPaypal}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcMastercard}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcVisa} className='text-[20px]' />
                  </li>
                  <li>
                      <p className='text-[6px] font-bold'>AMERICAN <br /> EXPRESS</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <hr  className='mt-5 text-green-500'/>
        <h2 className='text-center text-[14px] text-[#3D3D3D]'>© 2021 GreenShop. All Rights Reserved.</h2>
      </footer>
  </Typography>;
};

export default Blog;
