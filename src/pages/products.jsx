import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import Footer from '../components/footer';

const Products = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => ({
      ...item,
      quantity: item.quantity ?? 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const saveCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  const handleQuantityChange = (index, type) => {
    const updatedItems = [...cartItems];
    if (type === 'increment') {
      updatedItems[index].quantity += 1;
    } else if (type === 'decrement' && updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    saveCart(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    saveCart(updatedItems);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const qty = item.quantity || 0;
    return acc + item.price * qty;
  }, 0);
  const shipping = cartItems.length > 0 ? 16 : 0;
  const total = subtotal + shipping;

  return (
    <div className='container max-w-[1216px] mx-auto p-4'>
      <div className='flex flex-col md:flex-row gap-4'> 

        <div className='w-full md:w-[65%] border rounded p-4'>
          {cartItems.length === 0 ? (
            <h2 className='text-center font-serif text-2xl'>Savatcha bo'sh</h2>
          ) : (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className='min-w-full table-auto'>
                  <thead className='border-b-2 border-green-500'>
                    <tr>
                      <th className="py-2 px-3 text-left">Product</th>
                      <th className="py-2 px-3 text-center">Price</th> 
                      <th className="py-2 px-3 text-center">Quantity</th>
                      <th className="py-2 px-3 text-center">Total</th>
                      <th className="py-2 px-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className='bg-[#FBFBFB]'>
                    {cartItems.map((item, index) => (
                      <tr key={index} className='border-t border-gray-400 text-center'>
                        <td className='flex items-center gap-3 py-2 px-3 text-left'>
                          <img src={item.main_image} alt="Gul" className='w-[70px] h-[70px] object-cover rounded flex-shrink-0'/>
                          <div>
                            <div className='font-semibold text-sm sm:text-base break-words w-full sm:w-auto'>{item.title}</div>
                            <div className='text-xs text-gray-500 mt-1'>
                                {item._id}
                            </div>
                          </div>
                        </td>
                        <td className='py-2 px-3'>${item.price}</td> 
                        <td className='py-2 px-3'>
                          <div className='flex items-center justify-center gap-1'>
                            <div className=' rounded-full bg-green-500'>
                              <IconButton size='small' color='success' onClick={() => handleQuantityChange(index, 'decrement')}>
                                <Remove className='text-white'/>
                              </IconButton>
                            </div>
                            <span className='w-6 text-center text-xl'>{item.quantity}</span>
                            <div className=' rounded-full bg-green-500'>
                              <IconButton size='small' color='success' onClick={() => handleQuantityChange(index, 'increment')}>
                                <Add className='text-white' />
                              </IconButton>
                            </div>
                          </div>
                        </td>
                        <td className='py-2 px-3 font-semibold'>${(item.price * item.quantity).toFixed(2)}</td>
                        <td className='py-2 px-3'>
                          <IconButton color='error' onClick={() => handleRemoveItem(index)}>
                            <Delete className='text-black' />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden">
                <div className="flex justify-between items-center px-3 py-2 text-sm font-semibold border-b-2 border-green-500 mb-2">
                  <span>Product</span>
                  <span>Quantity / Total</span> 
                </div>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex flex-col border-b border-gray-300 py-3 px-2 mb-3 last:border-b-0">
                    <div className="flex items-center gap-3 w-full">
                      <img src={item.main_image} alt="Gul" className='w-[80px] h-[80px] object-cover rounded flex-shrink-0'/>
                      <div className="flex flex-col flex-grow"> 
                        <div className='font-semibold text-base break-words'>{item.title}</div>
                        <div className='text-xs text-gray-500 mt-1'>ID: {item._id ? item._id.substring(0, 10) + '...' : ''}</div>
                        <div className='text-sm text-gray-700 mt-1'>Price: ${item.price}</div> 
                      </div>
                      <IconButton color='error' onClick={() => handleRemoveItem(index)} className="self-start flex-shrink-0"> 
                          <Delete className='text-black' />
                      </IconButton>
                    </div>
                    
                    <div className="flex items-center justify-between w-full mt-3 pl-[90px]"> 
                      <div className='flex items-center gap-1'>
                        <div className='rounded-full bg-green-500'>
                          <IconButton size='small' color='success' onClick={() => handleQuantityChange(index, 'decrement')}>
                            <Remove className='text-white'/>
                          </IconButton>
                        </div>
                        <span className='w-6 text-center text-xl'>{item.quantity}</span>
                        <div className='rounded-full bg-green-500'>
                          <IconButton size='small' color='success' onClick={() => handleQuantityChange(index, 'increment')}>
                            <Add className='text-white' />
                          </IconButton>
                        </div>
                      </div>
                      <div className='font-semibold text-lg'>Total: ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className='w-full md:w-[35%] border rounded p-4'>
          <h2 className='text-xl font-semibold mb-4'>Card Total</h2>
          <div className='flex flex-col sm:flex-row mb-4 gap-2'> 
            <input type="text" className='border w-full p-2 rounded focus:ring-green-500 focus:border-green-500' placeholder='Enter coupon code here...' /> 
            <Button variant='contained' sx={{ backgroundColor: '#46A358', '&:hover': { backgroundColor: '#39a84a' }, flexShrink: 0 }}>Apply</Button> 
          </div>

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between border-b border-gray-300 pb-1'> 
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between border-b border-gray-300 pb-1'>
              <span>Coupon Discount:</span>
              <span> - $0.00</span>
            </div>
            <div className='flex justify-between border-b border-gray-300 pb-1'>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-semibold text-lg pt-2'> 
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button fullWidth component={Link} to='/checkout' variant='contained' sx={{ marginTop: 2, backgroundColor: '#46A358', '&:hover': { backgroundColor: '#39a84a' } }}>
            Proceed to Checkout
          </Button>
          <Button component={Link} to="/" fullWidth variant='contained' sx={{ marginTop: 2, backgroundColor: 'white', color: 'black', border: '1px solid #EAEAEA', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            Continue Shopping
          </Button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Products;