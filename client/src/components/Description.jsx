import React from 'react';
import { Box, Typography } from '@mui/material';

const Description = () => {
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 4,
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" gutterBottom>
        I'm Mike full stack developer
      </Typography>
      <Typography variant="h4" gutterBottom>
        MikeGPT
      </Typography>
      <Typography variant="body1" gutterBottom align='left'>
        This chatbot can answer any questions related to job interviews. Feel free to ask me anything, and the bot will do its best to provide you with the answer.
      </Typography>
    </Box>
  );
};

export default Description;
