import React from 'react';
import { Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  favorites: number[];
  onToggleFavorite: (recipeId: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, favorites, onToggleFavorite }) => {
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
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </Box>
      ))}
    </Box>
  );
};

export default RecipeList; 