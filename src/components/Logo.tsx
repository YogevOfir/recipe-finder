import React from 'react';
import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const Logo: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      padding: '8px 16px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <RestaurantIcon sx={{ 
        fontSize: 40, 
        color: 'primary.main',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }} />
      <LocalDiningIcon sx={{ 
        fontSize: 40, 
        color: 'secondary.main',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }} />
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #FF9800 30%, #9C27B0 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Recipe Finder
      </Typography>
    </Box>
  );
};

export default Logo; 