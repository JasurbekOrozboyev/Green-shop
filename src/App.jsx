import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/Blog';
import SignIn from './Auth/Sign_in';

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
          <Route
            path="/blog"
            element={
              isAuthenticated ? <About /> : <Navigate to="/signin" replace />
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
