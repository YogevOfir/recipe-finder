import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, CardActions, Collapse, Button, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite }) => {
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (imageError) {
      return 'https://via.placeholder.com/312x231?text=No+Image+Available';
    }
    // Try different image sizes if the default one fails
    const imageUrl = recipe.image;
    if (imageUrl.includes('312x231')) {
      return imageUrl.replace('312x231', '240x150');
    }
    return imageUrl;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const cleanSummary = recipe.summary.replace(/<[^>]*>?/gm, '');
  const shortSummary = cleanSummary.substring(0, 150);
  const cleanInstructions = recipe.instructions.replace(/<[^>]*>?/gm, '');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={getImageUrl()}
        alt={recipe.title}
        onError={handleImageError}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.title}
        </Typography>
        <Typography>
          {shortSummary}
          {cleanSummary.length > 150 && !expanded && '...'}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography>
            {cleanSummary.substring(150)}
          </Typography>
        </Collapse>
        {cleanSummary.length > 150 && (
          <Button
            onClick={toggleExpand}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 1 }}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
        
        {recipe.instructions !== 'No instructions available' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Button
              onClick={toggleInstructions}
              endIcon={showInstructions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              variant="outlined"
              fullWidth
            >
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </Button>
            
            <Collapse in={showInstructions} timeout="auto" unmountOnExit>
              <Typography sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                {cleanInstructions}
              </Typography>
            </Collapse>
          </>
        )}
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onToggleFavorite(recipe.id)}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard; 