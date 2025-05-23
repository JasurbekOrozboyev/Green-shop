import React, { Fragment, useState, useEffect } from 'react';
import { Badge, IconButton, ListItem, ListItemText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import Icon from '../images/icon/Vector.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SignIn from '../Auth/Sign_in/index';

import { useTranslation } from 'react-i18next';

const Navbar = ({ toggleColorMode, mode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem('token');

  const closeModal = () => setOpenModal(false);

  const { t, i18n } = useTranslation();

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
      <div className="container max-w-[1216px] m-auto flex justify-between items-center border-b border-[#46A35880] h-[53px]">
        <div className="flex items-center">
          <img src={Icon} alt="Icon" className="w-[35px] h-[35px]" />
          <p className="text-2xl font-bold text-green-500">GREENSHOP</p>
        </div>

        <ul className="flex justify-center items-center">
          <li className="flex justify-center items-center">
            <ListItem button className="hover:text-[#46A358]" component={Link} to="/">
              <ListItemText primary={t('navbar.home')} />
            </ListItem>
            <ListItem button className="hover:text-[#46A358]" component={Link} to="/blog">
              <ListItemText primary={t('navbar.blog')} />
            </ListItem>
          </li>
        </ul>

        <ul className="flex items-center gap-3">
          <li>
            <IconButton color="primary" aria-label="search">
              <SearchIcon />
            </IconButton>
          </li>
          <li>
            <IconButton aria-label="notifications" color="primary">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </li>
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
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} className="border rounded px-2 py-1">
              <option value="uz">Uz </option>
              <option value="en">Eng</option>
            </select>
          </li>
        </ul>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-4 gap-4">
              <button
                className={`px-4 py-1 rounded ${authType === 'login' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setAuthType('login')}
              >
                {t('auth.login')}
              </button>
              <button
                className={`px-4 py-1 rounded ${authType === 'register' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setAuthType('register')}
              >
                {t('auth.signup')}
              </button>
            </div>

            {authType === 'login' ? (
              <SignIn closeModal={closeModal} />
            ) : (
              <SignUp closeModal={closeModal} />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
