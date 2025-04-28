import React from 'react';
import { Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';
import { useFavorites } from '../context/FavoritesContext';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (recipes.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No recipes found. Try a different search!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
      gap: 3,
      mt: 2
    }}>
      {recipes.map((recipe) => (
        <Box key={recipe.id}>
          <RecipeCard
            recipe={recipe}
            isFavorite={isFavorite(recipe.id)}
            onToggleFavorite={(id) => {
              if (isFavorite(id)) {
                removeFavorite(id);
              } else {
                addFavorite(id);
              }
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default RecipeList; 