import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();

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
        throw new Error(t('order_submission_failed'));
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
      window.dispatchEvent(new Event('cartUpdated'));

    } catch (error) {
      console.error(t('error_submitting_order'), error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className='container max-w-[1216px] m-auto px-4 py-2 overflow-hidden'>
      <h2 className='text-2xl sm:text-3xl font-bold border-b border-gray-400 pb-2 mb-4'>{t('checkout')}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'> 
        
        <div>
          <h3 className='text-xl font-semibold mb-4'>{t('billing_address')}</h3>
          <form className='space-y-4' onSubmit={handlePlaceOrder}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'> 
              <div> 
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('first_name')}</h2>
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder={t('first_name')} className='border p-2 rounded w-full' required />
              </div>
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('last_name')}</h2>
                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder={t('last_name')} className='border p-2 rounded w-full' required />
              </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'> 
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('country_region')}</h2>
                <input type='text' name='country' value={formData.country} onChange={handleChange} placeholder={t('country_region')} className='border p-2 rounded w-full' required />
              </div>
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('town_city')}</h2>
                <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder={t('town_city')} className='border p-2 rounded w-full' required />
              </div>
            </div>
            
            <div> 
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('street_address')}</h2>
                <input type='text' name='streetAddress' value={formData.streetAddress} onChange={handleChange} placeholder={t('street_address')} className='border p-2 rounded w-full' required />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'> 
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('state')}</h2>
                <input type='text' name='state' value={formData.state} onChange={handleChange} placeholder={t('state')} className='border p-2 rounded w-full' required />
              </div>
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('zip')}</h2>
                <input type='text' name='zip' value={formData.zip} onChange={handleChange} placeholder={t('zip')} className='border p-2 rounded w-full' required />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'> 
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('email_address')}</h2>
                <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder={t('email_address')} className='border p-2 rounded w-full' required />
              </div>
              <div>
                <h2 className='mb-1'><span className='text-red-500'>*</span> {t('phone_number')}</h2>
                <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder={t('phone_number')} className='border p-2 rounded w-full' required />
              </div>
            </div>

            <h3 className='text-xl font-semibold mt-6 mb-2'>{t('payment_method')}</h3>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 border rounded p-3 w-full cursor-pointer hover:bg-gray-50 transition'> {/* p-3 va w-full qo'shdik */}
                <input type='radio' name='paymentMethod' value='PayPal' checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} className="form-radio text-green-500 focus:ring-green-500" /> {/* Stil qo'shdik */}
                {t('paypal_visa_mastercard')}
              </label>
              <label className='flex items-center gap-2 border rounded p-3 w-full cursor-pointer hover:bg-gray-50 transition'> {/* p-3 va w-full qo'shdik */}
                <input type='radio' name='paymentMethod' value='Bank Transfer' checked={formData.paymentMethod === 'Bank Transfer'} onChange={handleChange} className="form-radio text-green-500 focus:ring-green-500" />
                {t('direct_bank_transfer')}
              </label>
              <label className='flex items-center gap-2 border rounded p-3 w-full cursor-pointer hover:bg-gray-50 transition'> {/* p-3 va w-full qo'shdik */}
                <input type='radio' name='paymentMethod' value='COD' checked={formData.paymentMethod === 'COD'} onChange={handleChange} className="form-radio text-green-500 focus:ring-green-500" />
                {t('cash_on_delivery')}
              </label>
              <div className='mt-3'>
                <h2 className='mb-1'>{t('order_notes_optional')}</h2>
                <textarea name='notes' value={formData.notes} onChange={handleChange} className='w-full border rounded h-32 p-2 focus:ring-green-500 focus:border-green-500' placeholder={t('order_notes_placeholder')}></textarea> {/* h-32 va focus stilini qo'shdik */}
              </div>
            </div>
            <button type='submit' className='w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700 transition font-semibold text-lg'> {/* py-3, font-semibold, text-lg qo'shdik */}
              {t('place_order')}
            </button>
          </form>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4'>{t('your_order')}</h3>
          <div className='border rounded p-4'>
            {cartItems.length === 0 && <p className="text-center text-gray-600 py-4">{t('cart_is_empty')}</p>} 
            {cartItems.map((item) => (
              <div key={item._id} className='flex justify-between items-center mb-2 text-sm'> 
                <span className='font-medium text-gray-800'>{item.title} × {item.quantity}</span>
                <span className='font-semibold text-green-700'>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
              </div>
            ))}
            <hr className='my-3 border-gray-300' /> 
            <div className='space-y-2'> 
              <div className='flex justify-between text-base'> 
                <span className='text-gray-700'>{t('subtotal')}</span>
                <span className='font-semibold text-gray-900'>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-base'> 
                <span className='text-gray-700'>{t('shipping')}</span>
                <span className='font-semibold text-gray-900'>${shipping.toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-bold text-xl pt-3 border-t border-gray-300 mt-2'> 
                <span className='text-green-700'>{t('total')}</span>
                <span className='text-green-700'>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth> 
        <DialogContent className="p-6 text-center"> 
          <h2 className='text-3xl font-bold mb-4 text-green-600'>{t('order_confirmation')}</h2> 
          <p className='text-lg mb-2'>{t('thank_you_order')} <span className="font-semibold text-green-700">#{orderInfo?.orderNumber}</span></p>
          <p className='text-md text-gray-700 mb-1'>{t('order_date')}: <span className="font-medium">{orderInfo?.date}</span></p>
          <p className='text-md text-gray-700 mb-1'>{t('shipping')}: <span className="font-medium">${orderInfo?.shipping?.toFixed(2)}</span></p>
          <p className='text-md text-gray-700 mb-1'>{t('total')}: <span className="font-medium">${orderInfo?.total?.toFixed(2)}</span></p>
          <p className='text-md text-gray-700 mb-4'>{t('payment_method')}: <span className="font-medium">{orderInfo?.paymentMethod}</span></p>
          
          <h3 className="text-xl font-semibold mb-2">{t('ordered_items')}</h3>
          <ul className="text-left space-y-1 max-h-40 overflow-y-auto mb-4 border p-2 rounded bg-gray-50"> 
            {orderInfo?.shop_list?.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#46A358', '&:hover': { backgroundColor: '#39a84a' } }}>{t('close')}</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;