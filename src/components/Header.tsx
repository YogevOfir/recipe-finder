import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Logo from './Logo';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <AppBar position="sticky" elevation={5}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        padding: '8px 24px',
      }}>
        <Logo />
        <TextField
          placeholder="Search recipes..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            width: 300,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header; 