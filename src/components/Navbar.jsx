import React, { Fragment, useState } from 'react';
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

const Navbar = ({ toggleColorMode, mode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState('login'); 

  const closeModal = () => setOpenModal(false);

  return (
    <Fragment>
      <div className='container max-w-[1216px] m-auto flex justify-between items-center border-b border-[#46A35880] h-[53px]'>
        <div className='flex items-center'>
          <img src={Icon} alt="Icon" className='w-[35px] h-[35px]' />
          <p className='text-2xl font-bold text-green-500'>GREENSHOP</p>
        </div>
        <ul className='flex justify-center items-center'>
          <li className='flex justify-center items-center'>
            <ListItem button className='hover:text-[#46A358]' component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button className='hover:text-[#46A358]' component={Link} to="/blog">
              <ListItemText primary="Blog" />
            </ListItem>
          </li>
        </ul>
        <ul className='flex items-center gap-3'>
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
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </li>
          <li>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </li>
          <li>
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className="flex items-center gap-1" onClick={() => {
                setOpenModal(true);
                setAuthType('login');
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Login</span>
            </Button>
          </li>
        </ul>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <button className="absolute top-2 right-3 text-xl  hover:text-red-500" onClick={closeModal}>
              ✕
            </button>
            <div className="flex justify-center mb-4 gap-4">
              <button className={`px-4 py-1 rounded ${authType === 'login' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setAuthType('login')}>
                Login
              </button>
              <button className={`px-4 py-1 rounded ${authType === 'register' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setAuthType('register')}>
                SignUp
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
