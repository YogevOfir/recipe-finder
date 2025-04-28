import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import { searchRecipes } from './services/spoonacular';
import { Recipe } from './components/RecipeCard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (recipeId: number) => {
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onSearch={handleSearch} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
        ) : (
          <RecipeList
            recipes={recipes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App; 