import { useState, useCallback } from 'react';
import { searchRecipes, getRecipeDetails } from '../services/spoonacular';
import { Recipe } from '../components/RecipeCard';

interface UseRecipeApiReturn {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  getRecipe: (id: number) => Promise<Recipe | null>;
}

export const useRecipeApi = (): UseRecipeApiReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecipe = useCallback(async (id: number): Promise<Recipe | null> => {
    setLoading(true);
    setError(null);
    try {
      const recipe = await getRecipeDetails(id);
      return recipe;
    } catch (err) {
      setError('Failed to fetch recipe details. Please try again.');
      console.error('Get recipe error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, search, getRecipe };
}; 