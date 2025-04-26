import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from './link';

function SignInUp({ closeModal }) {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const isLogin = activeTab === 'login';
    try {
      const response = await fetch(
        `https://green-shop-backend.onrender.com/api/user/${isLogin ? 'sign-in' : 'sign-up'}?access_token=6506e8bd6ec24be5de357927`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            isLogin
              ? { email: form.email, password: form.password }
              : { name: form.name, surname: form.surname, email: form.email, password: form.password }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return setError(data.extraMessage || 'Xatolik yuz berdi');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        alert('Muvaffaqiyatli kirildi');
        closeModal();
        navigate('/blog');
      } else {
        localStorage.setItem('userName', `${form.name}`);
        alert("Ro'yxatdan muvaffaqiyatli o'tdingiz. Endi login qiling!");
        setActiveTab('login');
        setForm({ name: '', surname: '', email: '', password: '', confirmPassword: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 relative">
        <div className="flex justify-center mb-2 text-lg font-semibold">
          <button type="button" onClick={() => setActiveTab('login')} className={`px-4 ${activeTab === 'login' ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
            Login
          </button>
          <span className="mx-2 text-gray-300">|</span>
          <button type="button" onClick={() => setActiveTab('register')} className={`px-4 ${activeTab === 'register' ? 'text-green-600 font-bold' : 'text-gray-400'}`}>Register</button>
        </div>
        {activeTab === 'register' && (
          <>
            <input name="name" placeholder="Ism" value={form.name} onChange={handleChange} className="w-full p-2 border rounded " required />
            <input name="surname" placeholder="Familiya" value={form.surname} onChange={handleChange} className="w-full p-2 border rounded " required />
          </>
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded " required />
        <input name="password" type="password" placeholder="Parol" value={form.password} onChange={handleChange} className="w-full p-2 border rounded " required />

        {activeTab === 'register' && (
          <input name="confirmPassword" type="password" placeholder="Parolni qayta kiriting" value={form.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded " required />
        )}

        {activeTab === 'register' && form.password && form.confirmPassword && form.password !== form.confirmPassword && (
          <p className="text-red-500 text-sm text-center">Parollar mos emas!</p>
        )}

        <button type="submit" disabled={loading} className={`w-full py-2 rounded text-white ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}>
          {loading ? 'loading...' : activeTab === 'login' ? 'Login' : "Ro'yxatdan o'tish"}
        </button>
        {activeTab === 'login' && (
          <p className="text-right text-sm text-green-600 hover:underline cursor-pointer">Parolni unutdingizmi?</p>
        )}
        <button type="button" onClick={closeModal} className="absolute top-2 right-3 text-gray-500 text-[24px]">x</button>
        {error && <p className="text-red-500 text-center text-sm">Email avval ro'hyatdan o'tgan!</p>}
        <Link />
      </form>
    </div>
  );
}

export default SignInUp;
