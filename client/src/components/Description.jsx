import React from 'react';
import { Box, Typography } from '@mui/material';

const Description = () => {
  return (
    <Box
    maxWidth='sm'
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: 'white',
        width: '100%',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
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
        Discover a game-changer in job interviews with this exceptional chatbot representing me! Equipped to handle any and all interview questions, this AI marvel is eager to show you why I'm your perfect choice. Dive in and experience the future of interviewing today! There's no need to invite me in person—simply ask anything and receive authentic, immediate response!
      </Typography>
    </Box>
  );
};

export default Description;


