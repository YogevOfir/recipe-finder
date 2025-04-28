import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import { FavoritesProvider } from './context/FavoritesContext';
import { useRecipeApi } from './hooks/useRecipeApi';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF9800', // Warm orange
      light: '#FFB74D',
      dark: '#F57C00',
    },
    secondary: {
      main: '#9C27B0', // Rich purple
      light: '#BA68C8',
      dark: '#7B1FA2',
    },
    background: {
      default: '#FFF8E1', // Warm light background
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF9800 30%, #9C27B0 90%)',
        },
      },
    },
  },
});

function App() {
  const { recipes, loading, error, search } = useRecipeApi();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <Header onSearch={search} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              {error}
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </Container>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App; 