import { useState } from 'react';
import Link from "./link";
import { useTranslation } from 'react-i18next';

function SignInUp({ closeModal }) {
  const { t } = useTranslation();

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
        setError(data.message || t('error.unknown'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="border border-gray-300 bg-white rounded-lg w-full max-w-md p-6 relative">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 text-lg ${activeTab === 'login' ? 'text-green-600 font-bold' : 'text-gray-400'}`}
            onClick={() => setActiveTab('login')}
          >
            {t('auth.login')}
          </button>
          <span className="mx-2">|</span>
          <button
            className={`px-4 text-lg ${activeTab === 'register' ? 'text-green-600 font-bold' : 'text-gray-400'}`}
            onClick={() => setActiveTab('register')}
          >
            {t('auth.signup')}
          </button>
          <button
            onClick={closeModal}
            className="absolute top-2 right-4 rounded px-1 hover:text-green-500"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === 'register' && (
            <>
              <input
                type="text"
                placeholder={t('auth.name')}
                className="border rounded p-2 bg-yellow-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t('auth.surname')}
                className="border rounded p-2 bg-yellow-100"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder={t('auth.email')}
            className="border rounded p-2 bg-yellow-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t('auth.password')}
            className="border rounded p-2 bg-yellow-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {activeTab === 'login' && (
            <div className="text-right text-green-600 text-sm hover:underline">
              {t('auth.forgot')}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded w-full mt-2"
          >
            {loading ? t('auth.loading') : activeTab === 'login' ? t('auth.login') : t('auth.signup')}
          </button>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>

        <div>
          <Link />
        </div>
      </div>
    </div>
  );
}

export default SignInUp;
