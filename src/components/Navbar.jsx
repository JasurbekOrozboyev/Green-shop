import React, { Fragment, useEffect, useState } from 'react';
import { Badge, IconButton, ListItem, ListItemText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../images/icon/Vector.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SignInUp from '../Auth/Sign_in/index'; 

const Navbar = ({ toggleColorMode, mode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
  };

  

  return (
    <Fragment>
      <div className='container max-w-[1216px] m-auto flex justify-between items-center border-b border-[#46A35880] h-[53px]'>
        <div className='flex items-center'>
          <img src={Icon} alt="Icon" className='w-[35px] h-[35px]' />
          <p className='text-2xl font-bold text-green-500 ml-2'>GREENSHOP</p>
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
            {userName ? (
            <span className="text-green-600 font-bold border rounded p-2">{userName}</span>
            ) : (
              <Button 
      variant="contained" 
      sx={{ backgroundColor: '#00C951' }} 
      className="flex items-center gap-1" 
      onClick={() => setOpenModal(true)}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      <span>Login</span>
    </Button>
  )}
</li>

        </ul>
      </div>

      {openModal && (
        <SignInUp closeModal={closeModal} />
      )}
    </Fragment>
  );
};

export default Navbar;
