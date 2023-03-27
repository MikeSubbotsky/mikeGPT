import React from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';

const Description = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" gutterBottom>
          I'm Mike, a full-stack developer.
        </Typography>
        <Typography variant="h4" gutterBottom>
          MikeGPT
        </Typography>
        <Typography variant="body1" gutterBottom align="left">
          This chatbot can answer any questions related to job interviews. Feel free to ask me anything, and the bot will do its best to provide you with the answer.
        </Typography>
      </Box>
    </Container>
  );
};

export default Description;


