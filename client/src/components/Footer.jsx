import React from 'react';
import { Box, Typography, Hidden} from '@mui/material';

const Footer = () => {
  return (
    <Hidden xsDown implementation="css">
      <Box
        sx={{
          "@media (max-width: 1078px)": { display: "none" },
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '4px',
          zIndex: 1,
        }}
      >
        <Typography variant="caption" component="div">
          Image generated by Midjourney --v5
        </Typography>
      </Box>
    </Hidden>
  );
};

export default Footer;
