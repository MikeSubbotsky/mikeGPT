import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import './App.css';
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import backgroundImage from './images/AI_background2.jpg';
import Description from './components/Description';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Box sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <NavBar />
        <Description />
        <Chat />
      </Box>
    </div>
  );
}

export default App;

