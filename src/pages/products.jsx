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
      <div className='flex gap-1'>
      <div className='w-[65%]  border rounded p-4'>
  {cartItems.length === 0 ? (
    <h2 className='text-center font-serif text-2xl'>Savatcha bo'sh</h2>
  ) : (
    <div className='overflow-x-auto'>
      <table className='min-w-full'>
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
                <img src={item.main_image} alt="Gul" className='w-[70px] h-[70px] object-cover rounded'/>
                <div>
                  <div className='font-semibold'>{item.title}</div>
                  <div className='text-xs '>66d09a759fa7aef6c5d0012f</div>
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

              <td className='py-2 px-3'>${(item.price * item.quantity).toFixed(2)}</td>

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
  )}
</div>


<div className='w-[35%] border rounded p-4'>
    <h2>Card Total</h2>
    <div className='flex mb-4'>
    <input type="text" className='border w-full p-2 rounded' placeholder='Enter coupon code here...' />
    <Button variant='contained' sx={{ backgroundColor: '#46A358' }}>Apply</Button>
    </div>

    <div className='space-y-3 text-sm'>
    <div className='flex justify-between border-b-2 border-green-500'>
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
    </div>
    <div className='flex justify-between border-b-2 border-green-500'>
        <span>Coupon Discount:</span>
        <span> - $0.00</span>
    </div>
    <div className='flex justify-between border-b-2 border-green-500'>
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
    </div>
    <div className='flex justify-between font-semibold text-lg'>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
    </div>
    </div>

    <Button fullWidth component={Link} to='/checkout' variant='contained' sx={{ marginTop: 2, backgroundColor: '#46A358' }}>
        Proceed to Checkout
    </Button>
    <Button component={Link} to="/" fullWidth variant='contained' sx={{ marginTop: 2, backgroundColor: 'white', color: 'black' }}>
        Continue Shopping
    </Button>
</div>
</div>
<Footer/>
</div>
);
};

export default Products;
