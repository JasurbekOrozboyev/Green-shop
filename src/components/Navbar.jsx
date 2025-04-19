import React, { Fragment, useState } from 'react';
import { Badge ,IconButton,  ListItem, ListItemText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import Icon from '../images/icon/Vector.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ toggleColorMode, mode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Fragment>
    <div className='container max-w-[1216px] m-auto flex justify-between items-center border-b border-[#46A35880] h-[53px]'>
        <div className='flex items-center'>
            <img src={Icon} alt="Icon" className='w-[35px] h-[35px]'/>
            <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
        </div>
       <ul className='flex justify-center items-center'>
        <li className='flex justify-center items-center'>
        <ListItem button className='hover:text-[#46A358]' component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button className='hover:text-[#46A358]' component={Link} to="/blog" onClick={toggleDrawer}>
            <ListItemText primary="Blog" />
          </ListItem>
        </li>
       </ul>
       <div>

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
            <Button variant="contained" color="success" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faRightFromBracket} /> 
            <p>
            Login
            </p>
            </Button>
            </li>
       </ul>
       </div>
          

    </div>
          
          
    </Fragment>
  );
};

export default Navbar;
