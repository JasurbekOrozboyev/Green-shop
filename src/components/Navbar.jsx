import React, { Fragment, useState, useEffect } from 'react';
import { Badge, IconButton, ListItem, ListItemText, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import Icon from '../images/icon/Vector.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SignIn from '../Auth/Sign_in';

import { useTranslation } from 'react-i18next';

const Navbar = ({ toggleColorMode, mode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const { t, i18n } = useTranslation();

  const closeModal = () => setOpenModal(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        if (payload.user && payload.user.name) {
          setUserName(payload.user.name);
        } else {
          setUserName('');
        }
      } catch (error) {
        console.error('Token parsing error:', error);
        setUserName('');
      }
    }
  }, [token]);

  const handleProfileClick = () => {
    if (token && userName) {
      window.location.href = '/profile';
    } else {
      setOpenModal(true);
      setAuthType('login');
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <Fragment>
      <div className="container max-w-[1216px] m-auto flex justify-between items-center border-b border-[#46A35880] h-[53px] px-4 md:px-0">
        <div className="flex items-center gap-2">
          <img src={Icon} alt="Icon" className="w-[35px] h-[35px]" />
          <p className="text-2xl font-bold text-green-500">GREENSHOP</p>
        </div>

        <ul className="hidden md:flex justify-center items-center gap-4">
          <li>
            <ListItem button className="hover:text-[#46A358]" component={Link} to="/">
              <ListItemText primary={t('navbar.home')} />
            </ListItem>
          </li>
          <li>
            <ListItem button className="hover:text-[#46A358]" component={Link} to="/blog">
              <ListItemText primary={t('navbar.blog')} />
            </ListItem>
          </li>
        </ul>

        <ul className="hidden md:flex items-center gap-3">
          <li>
            <Link to="/products">
              <IconButton>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </li>
          <li>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </li>
          <li>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00C951' }}
              className="flex items-center gap-1"
              onClick={handleProfileClick}
            >
              {userName ? (
                <span>{userName}</span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>{t('navbar.login')}</span>
                </>
              )}
            </Button>
          </li>
          <li>
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option className='dark:bg-black text-white' value="uz">Uz</option>
              <option className='dark:bg-black text-white' value="en">Eng</option>
            </select>
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-3">
          <Link to="/products">
            <IconButton>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </IconButton>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
          <p className="text-xl font-bold text-green-500">GREENSHOP</p>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl">&times;</button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)} className="hover:text-green-500 dark:hover:text-green-400">
              {t('navbar.home')}
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={() => setSidebarOpen(false)} className="hover:text-green-500 dark:hover:text-green-400">
              {t('navbar.blog')}
            </Link>
          </li>
          <li>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00C951', width: '100%' }}
              onClick={() => {
                setSidebarOpen(false);
                handleProfileClick();
              }}
            >
              {userName ? userName : t('navbar.login')}
            </Button>
          </li>
          <li>
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border rounded px-2 py-1 w-full bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="uz">Uz</option>
              <option value="en">Eng</option>
            </select>
          </li>
        </ul>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full text-black dark:text-white">
            <div className="flex justify-center mb-4 gap-4">
              <button
                className={`px-4 py-1 rounded ${authType === 'login' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                onClick={() => setAuthType('login')}
              >
                {t('auth.login')}
              </button>
              <button
                className={`px-4 py-1 rounded ${authType === 'register' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
                onClick={() => setAuthType('register')}
              >
                {t('auth.signup')}
              </button>
            </div>

            {authType === 'login' ? (
              <SignIn closeModal={closeModal} />
            ) : (
              <p>Sign Up komponenti bu yerda bo'ladi</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;