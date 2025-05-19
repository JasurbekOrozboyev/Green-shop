import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    } catch (error) {
      console.error(t('error_submitting_order'), error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
      <h2 className='text-2xl font-bold border-b border-gray-400 pb-2 mb-4'>{t('checkout')}</h2>
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <h3 className='text-xl font-semibold mb-4'>{t('billing_address')}</h3>
          <form className='space-y-4' onSubmit={handlePlaceOrder}>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> {t('first_name')}</h2>
              <h2><span className='text-red-500'>*</span> {t('last_name')}</h2>
              <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder={t('first_name')} className='border p-2 rounded w-full' required />
              <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder={t('last_name')} className='border p-2 rounded w-full' required />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> {t('country_region')}</h2>
              <h2><span className='text-red-500'>*</span> {t('town_city')}</h2>
              <input type='text' name='country' value={formData.country} onChange={handleChange} placeholder={t('country_region')} className='border p-2 rounded w-full' required />
              <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder={t('town_city')} className='border p-2 rounded w-full' required />
            </div>
            <h2><span className='text-red-500'>*</span> {t('street_address')}</h2>
            <input type='text' name='streetAddress' value={formData.streetAddress} onChange={handleChange} placeholder={t('street_address')} className='border p-2 rounded w-full' required />
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> {t('state')}</h2>
              <h2><span className='text-red-500'>*</span> {t('zip')}</h2>
              <input type='text' name='state' value={formData.state} onChange={handleChange} placeholder={t('state')} className='border p-2 rounded w-full' required />
              <input type='text' name='zip' value={formData.zip} onChange={handleChange} placeholder={t('zip')} className='border p-2 rounded w-full' required />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <h2><span className='text-red-500'>*</span> {t('email_address')}</h2>
              <h2><span className='text-red-500'>*</span> {t('phone_number')}</h2>
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder={t('email_address')} className='border p-2 rounded w-full' required />
              <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder={t('phone_number')} className='border p-2 rounded w-full' required />
            </div>

            <h3 className='text-xl font-semibold mt-6 mb-2'>{t('payment_method')}</h3>
            <div className='space-y-2'>
              <h2><span className='text-red-500'>*</span> {t('payment_method')}</h2>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='PayPal' checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} />
                {t('paypal_visa_mastercard')}
              </label>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='Bank Transfer' checked={formData.paymentMethod === 'Bank Transfer'} onChange={handleChange} />
                {t('direct_bank_transfer')}
              </label>
              <label className='flex items-center gap-2 border rounded p-2'>
                <input type='radio' name='paymentMethod' value='COD' checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                {t('cash_on_delivery')}
              </label>
              <div className='mt-3'>
                <h2>{t('order_notes_optional')}</h2>
                <textarea name='notes' value={formData.notes} onChange={handleChange} className='w-full border rounded h-35 p-2' placeholder={t('order_notes_placeholder')}></textarea>
              </div>
            </div>
            <button type='submit' className='w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition'>
              {t('place_order')}
            </button>
          </form>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4'>{t('your_order')}</h3>
          <div className='border rounded p-4'>
            {cartItems.length === 0 && <p>{t('cart_is_empty')}</p>}
            {cartItems.map((item) => (
              <div key={item._id} className='flex justify-between mb-2'>
                <span>{item.title} × {item.quantity}</span>
                <span>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
              </div>
            ))}
            <hr className='my-2' />
            <div className='flex justify-between font-semibold'>
              <span>{t('subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>{t('shipping')}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold text-lg mt-2'>
              <span>{t('total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogContent>
          <h2 className='text-2xl font-semibold mb-4'>{t('order_confirmation')}</h2>
          <p>{t('thank_you_order')} {orderInfo?.orderNumber}</p>
          <p>{t('order_date')}: {orderInfo?.date}</p>
          <p>{t('shipping')}: ${orderInfo?.shipping?.toFixed(2)}</p>
          <p>{t('total')}: ${orderInfo?.total?.toFixed(2)}</p>
          <p>{t('payment_method')}: {orderInfo?.paymentMethod}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('close')}</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
