import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    paymentMethod: 'PayPal',
    notes: '',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const normalizedCart = cart.map(item => ({
      ...item,
      quantity: item.quantity ? Number(item.quantity) : 1,
    }));
    setCartItems(normalizedCart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    const price = !isNaN(Number(item.price)) ? Number(item.price) : 0;
    const quantity = !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
    return total + price * quantity;
  }, 0);

  const shipping = 16;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const newOrder = {
      billing_address: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        country: formData.country,
        town: formData.city,
        state: formData.state,
        street_address: formData.streetAddress,
        additional_street_address: "",
        zip: formData.zip,
        email: formData.email,
        phone_number: formData.phone,
        payment_method:
          formData.paymentMethod === "COD"
            ? "cash-on-delivery"
            : formData.paymentMethod === "Bank Transfer"
            ? "bank-transfer"
            : "paypal",
      },
      extra_shop_info: {
        total_price: total,
        coupon: {
          has_coupon: false,
          discount_for: 0,
        },
      },
      shop_list: cartItems.map(item => ({
        _id: item._id,
        title: item.title,
        price: Number(item.price),
        discount: item.discount || false,
        discount_price: item.discount_price || String(item.price),
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch('https://green-shop-backend.onrender.com/api/order/make-order?access_token=68063351a46b81457373a349', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error('Order submission failed');
      }

      const data = await response.json();
      console.log('Order sent to backend:', data);

      setOrderInfo({
        ...newOrder,
        orderNumber: Math.floor(Math.random() * 10000000000000),
        date: new Date().toDateString(),
        shipping,
        total,
        paymentMethod: formData.paymentMethod,
      });
      setOpenModal(true);

      localStorage.removeItem('cart');
      setCartItems([]);

    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  
  

  return (
    <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
      <h2 className='text-2xl font-bold border-b border-gray-400 pb-2 mb-4'>Checkout</h2>
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <h3 className='text-xl font-semibold mb-4'>Billing Address</h3>
          <form className='space-y-4' onSubmit={handlePlaceOrder}>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> First name</h2>
              <h2><span className='text-red-500'>*</span> Last name</h2>
              <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First name' className='border p-2 rounded w-full' required />
              <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last name' className='border p-2 rounded w-full' required />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> Country / Region</h2>
              <h2><span className='text-red-500'>*</span> Town / City</h2>
              <input type='text' name='country' value={formData.country} onChange={handleChange} placeholder='Country / Region' className='border p-2 rounded w-full' required />
              <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder='Town / City' className='border p-2 rounded w-full' required />
            </div>
            <h2><span className='text-red-500'>*</span> Street Address</h2>
            <input type='text' name='streetAddress' value={formData.streetAddress} onChange={handleChange} placeholder='Street Address' className='border p-2 rounded w-full' required />
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> State</h2>
              <h2><span className='text-red-500'>*</span> Zip</h2>
              <input type='text' name='state' value={formData.state} onChange={handleChange} placeholder='State' className='border p-2 rounded w-full' required />
              <input type='text' name='zip' value={formData.zip} onChange={handleChange} placeholder='Zip' className='border p-2 rounded w-full' required />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> Email Address</h2>
              <h2><span className='text-red-500'>*</span> Phone Number</h2>
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email address' className='border p-2 rounded w-full' required />
              <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number' className='border p-2 rounded w-full' required />
            </div>

            <h3 className='text-xl font-semibold mt-6 mb-2'>Payment Method</h3>
            <div className='space-y-2'>
              <h2><span className='text-red-500'>*</span> Payment Method</h2>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='PayPal' checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} />
                PayPal / Visa / Mastercard
              </label>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='Bank Transfer' checked={formData.paymentMethod === 'Bank Transfer'} onChange={handleChange} />
                Direct bank transfer
              </label>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='COD' checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                Cash on delivery
              </label>
              <div className='mt-3'>
                <h2>Order notes (optional)</h2>
                <textarea name='notes' value={formData.notes} onChange={handleChange} className='w-full border rounded h-35 p-2' placeholder='Your order notes, thoughts, feedback, etc...'></textarea>
              </div>
            </div>
            <button type='submit' className='w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition'>
              Place Order
            </button>
          </form>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4'>Your Order</h3>
          <div className='space-y-4'>
            {cartItems.map((item, index) => (
              <div key={index} className='flex justify-between items-center border-b pb-2'>
                <div className='flex items-center gap-2'>
                  <img src={item.main_image} alt={item.title} className='w-12 h-12 object-cover' />
                  <div>
                    <p className='font-semibold'>{item.title}</p>
                    <p className='text-sm text-gray-500'>SKU: {item.id || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p>(x {item.quantity})</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold'>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className='flex justify-between font-semibold'>
              <p>Subtotal:</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <span>Coupon Discount:</span>
              <span> - $0.00</span>
            </div>
            <div className='flex justify-between text-sm text-gray-600'>
              <p>Shipping:</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className='flex justify-between text-lg font-bold border-t pt-2'>
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogContent>
    {orderInfo && (
      <>
        <h2 className='text-2xl font-bold mb-2'>Order Confirmation</h2>
        <div className='flex flex-wrap justify-center items-center gap-4 mb-4'>
          <div><b>Order Number:</b><p>{orderInfo.orderNumber}</p></div>
          <div><b>Date:</b><p>{orderInfo.date}</p></div>
          <div><b>Total:</b><p>${orderInfo.total.toFixed(2)}</p></div>
          <div><b>Payment Method:</b><p>{orderInfo.paymentMethod}</p></div>
        </div>

        <hr className='my-2' />

        <h2 className='text-xl font-bold mb-2'>Order Details</h2>
        {orderInfo.shop_list.map((item, idx) => (
          <div key={idx} className='flex items-center justify-between mb-2'>
            <img src={item.main_image} alt={item.title} className='w-[70px] h-[70px] object-cover' />
            <div>{item._id}</div>
            <div>{item.title}</div>
            <div>(x {item.quantity})</div>
            <div>${item.price.toFixed(2)}</div>
          </div>
        ))}

        <hr className='my-2' />
        <div className='flex justify-between font-bold'>
          <span>Shipping:</span> ${orderInfo.shipping.toFixed(2)}
        </div>
        <div className='flex justify-between font-bold'>
          <span>Total:</span> ${orderInfo.total.toFixed(2)}
        </div>

        <div className='mt-4 text-center font-semibold'>
          Your order is currently being processed. You will receive an order confirmation email shortly.
        </div>
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button component={Link} to="/profile" variant="contained" onClick={handleClose}>
      Track your order
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Checkout;
