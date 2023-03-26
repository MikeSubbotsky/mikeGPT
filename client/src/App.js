import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import './App.css';
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import backgroundImage from './images/background.jpg';
import Description from './components/Description';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Box sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <NavBar />
        <Box sx={{ display: 'flex' }}>
          <Description />
          <Chat />
        </Box>
      </Box>
    </div>
  );
}

export default App;

