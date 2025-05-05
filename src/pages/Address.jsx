// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const BillingAddress = () => {
//   const cart = useSelector(state => state?.shopping?.data || []);
//   console.log(cart);

//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     lastName: '',
//     country: '',
//     state: '',
//     city: '',
//     street: '',
//     zip: '',
//     apartment: '',
//     phone: '',
//     email: '',
//     payment: '',
//     notes: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({
//       ...prev,
//       [name]: value || '',
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const addrecc = {
//       shop_list: cart.map(item => ({
//         shop_id: item._id,
//         quantity: item.count,
//       })),
//       billing_address: {
//         first_name: formValues.firstName,
//         last_name: formValues.lastName,
//         country: formValues.country,
//         state: formValues.state,
//         city: formValues.city,
//         street: formValues.street,
//         zip: formValues.zip,
//         apartment: formValues.apartment || '',
//         phone: formValues.phone,
//         email: formValues.email,
//       },
//       extra_shop_info: formValues.notes || '',
//       payment_method: formValues.payment,
//     };

//     setLoading(true);
//     setError(''); // Reset error before request

//     try {
//       const response = await axios.post(
//         'https://green-shop-backend.onrender.com/api/order/make-order?access_token=6506e8bd6ec24be5de357927',
//         addrecc
//       );
//       console.log('Order success', response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Order failed', err.response ? err.response.data : err.message);
//       setError('Failed to place order. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white">
//       <h2 className="text-2xl font-semibold mb-6">Billing Address</h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="form-item">
//             <label>First name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formValues.firstName}
//               onChange={handleChange}
//               required
//               placeholder="Type your first name..."
//             />
//           </div>

//           <div className="form-item">
//             <label>Last name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formValues.lastName}
//               onChange={handleChange}
//               required
//               placeholder="Type your last name..."
//             />
//           </div>

//           <div className="form-item">
//             <label>Country / Region</label>
//             <select
//               name="country"
//               value={formValues.country}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select your country...</option>
//               <option value="uz">Uzbekistan</option>
//               <option value="us">United States</option>
//             </select>
//           </div>

//           <div className="form-item">
//             <label>Town / City</label>
//             <select
//               name="city"
//               value={formValues.city}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select your town...</option>
//               <option value="tashkent">Tashkent</option>
//               <option value="ny">New York</option>
//             </select>
//           </div>

//           <div className="form-item">
//             <label>Street Address</label>
//             <input
//               type="text"
//               name="street"
//               value={formValues.street}
//               onChange={handleChange}
//               required
//               placeholder="House number and street name"
//             />
//           </div>

//           <div className="form-item">
//             <label>Apartment</label>
//             <input
//               type="text"
//               name="apartment"
//               value={formValues.apartment}
//               onChange={handleChange}
//               placeholder="Apartment, suite, unit, etc. (optional)"
//             />
//           </div>

//           <div className="form-item">
//             <label>State</label>
//             <select
//               name="state"
//               value={formValues.state}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a state...</option>
//               <option value="tashkent">Tashkent</option>
//               <option value="andijan">Andijan</option>
//             </select>
//           </div>

//           <div className="form-item">
//             <label>Zip Code</label>
//             <input
//               type="text"
//               name="zip"
//               value={formValues.zip}
//               onChange={handleChange}
//               placeholder="ZIP code (optional)"
//             />
//           </div>

//           <div className="form-item">
//             <label>Email address</label>
//             <input
//               type="email"
//               name="email"
//               value={formValues.email}
//               onChange={handleChange}
//               required
//               placeholder="Type your email..."
//             />
//           </div>

//           <div className="form-item">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formValues.phone}
//               onChange={handleChange}
//               required
//               placeholder="Type your phone number..."
//             />
//           </div>

//           <div className="form-item">
//             <label>Payment Method</label>
//             <select
//               name="payment"
//               value={formValues.payment}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a payment method...</option>
//               <option value="card">Credit/Debit Card</option>
//               <option value="bank">Bank Transfer</option>
//               <option value="cash">Cash on Delivery</option>
//             </select>
//           </div>

//           <div className="form-item">
//             <label>Order Notes (optional)</label>
//             <textarea
//               name="notes"
//               value={formValues.notes}
//               onChange={handleChange}
//               placeholder="Your order notes, thoughts, feedback, etc..."
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-500 rounded-md py-2 text-white font-bold text-lg"
//           disabled={loading}
//         >
//           {loading ? 'Placing Order...' : 'Place Order'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BillingAddress;
