import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import SignIn from './Auth/Sign_in';
import Profile from './pages/profile';
import NotFound from './pages/NotFound';
import Products from './pages/products';
import ProductDetail  from "../src/Home/Main/Categories/Category/ProductDetail"
import Checkout from './pages/Checkout'
import './i18n/i18n'; 



function App() {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  const isAuthenticated = localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/profile" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
