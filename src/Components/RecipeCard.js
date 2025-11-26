import React from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, showActions = false, onDelete }) => {
  const { toggleFavorite, isFavorite } = useRecipes();
  const isLiked = isFavorite(recipe.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      onDelete(recipe.id);
    }
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <div className="recipe-card-img-container">
          <img 
            src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe'} 
            alt={recipe.name}
            className="recipe-card-img"
          />
          
          {/* Favorite Button */}
          <button 
            className={`favorite-btn ${isLiked ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Toggle favorite"
          >
            {isLiked ? '❤️' : '🤍'}
          </button>

          {/* Custom Badge */}
          {recipe.custom && (
            <span className="custom-badge">Custom</span>
          )}
        </div>

        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{recipe.name}</h3>
          
          <div className="recipe-card-meta">
            <span className="meta-item">
              ⏱️ {recipe.cookTimeMinutes || recipe.prepTime || 30} min
            </span>
            <span className="meta-item">
              👥 {recipe.servings || 4} servings
            </span>
          </div>

          {recipe.cuisine && (
            <p className="recipe-cuisine">🍴 {recipe.cuisine}</p>
          )}

          {recipe.difficulty && (
            <p className="recipe-difficulty">
              <span className={`difficulty-badge ${recipe.difficulty.toLowerCase()}`}>
                {recipe.difficulty}
              </span>
            </p>
          )}

          {recipe.dietary && recipe.dietary !== 'None' && (
            <p className="recipe-dietary">🥗 {recipe.dietary}</p>
          )}

          <div className="recipe-card-actions">
            <button className="view-btn">View Recipe →</button>
            
            {showActions && onDelete && (
              <button 
                className="delete-btn" 
                onClick={handleDeleteClick}
                aria-label="Delete recipe"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;