import { useState } from 'react';
import Link from "./link"

function SignInUp({ closeModal }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url =
      activeTab === 'login'
        ? 'https://green-shop-backend.onrender.com/api/user/sign-in?access_token=680bac52073c8af77e8a405f'
        : 'https://green-shop-backend.onrender.com/api/user/sign-up?access_token=680bac52073c8af77e8a405f';

    const body =
      activeTab === 'login'
        ? { email, password }
        : { name, surname, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const token = data.token || data.accessToken || (data.data && data.data.token);
        const userName = data.data?.userName || data.data?.name || data.data?.email;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userName', userName); 
          closeModal();
        } 
      } else {
        setError(data.message || 'Nimadir xato');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
      <div className="border border-gray-300 bg-white rounded-lg w-full max-w-md p-6 relative">
        <div className="flex justify-center mb-6">
          <button className={`px-4 text-lg ${activeTab === 'login' ? 'text-green-600 font-bold' : 'text-gray-400'}`} onClick={() => setActiveTab('login')}>
            Login
          </button>
          <span className="mx-2">|</span>
          <button className={`px-4 text-lg ${activeTab === 'register' ? 'text-green-600 font-bold' : 'text-gray-400'}`} onClick={() => setActiveTab('register')}>
            Register
          </button>
          <button onClick={closeModal} className="absolute top-2 right-4 border rounded px-1 hover:text-green-500">
            Yopish
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === 'register' && (
            <>
              <input type="text" placeholder="Ism" className="border rounded p-2 bg-yellow-100" value={name} onChange={(e) => setName(e.target.value)} required
              />
              <input type="text" placeholder="Familiya" className="border rounded p-2 bg-yellow-100" value={surname} onChange={(e) => setSurname(e.target.value)} required
              />
            </>
          )}
          <input type="email" placeholder="Email" className="border rounded p-2 bg-yellow-100" value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input type="password" placeholder="Parol" className="border rounded p-2 bg-yellow-100" value={password} onChange={(e) => setPassword(e.target.value)} required
          />

          {activeTab === 'login' && (
            <div className="text-right text-green-600 text-sm  hover:underline">
              Forgot Password?
            </div>
          )}
          <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded w-full mt-2">
            {loading ? 'Yuklanmoqda...' : activeTab === 'login' ? 'Login' : "Ro'yxatdan o'tish"}
          </button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
        <div>
          <Link/>
        </div>
      </div>
    </div>
  );
}

export default SignInUp;