import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

console.log('API Key:', API_KEY ? 'Present' : 'Missing');

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
}

interface SearchResponse {
  results: Array<{
    id: number;
    title: string;
    image: string;
    summary: string;
    instructions: string;
  }>;
}

interface RecipeResponse {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
}

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        number: 12,
        addRecipeInformation: true,
        instructionsRequired: true,
      },
    });

    return response.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      instructions: recipe.instructions || 'No instructions available',
    }));
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id: number): Promise<Recipe> => {
  try {
    const response = await axios.get<RecipeResponse>(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    });

    return {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
      summary: response.data.summary,
      instructions: response.data.instructions || 'No instructions available',
    };
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw error;
  }
}; 