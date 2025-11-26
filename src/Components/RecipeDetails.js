import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    customRecipes, 
    toggleFavorite, 
    isFavorite, 
    addToShoppingList,
    addToMealPlan 
  } = useRecipes();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  useEffect(() => {
    // Check if it's a custom recipe
    const customRecipe = customRecipes.find(r => r.id === parseInt(id));
    
    if (customRecipe) {
      setRecipe(customRecipe);
      setLoading(false);
    } else {
      // Fetch from API
      fetch(`https://dummyjson.com/recipes/${id}`)
        .then(res => res.json())
        .then(data => {
          setRecipe(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, customRecipes]);

  const handleAddToShopping = () => {
    if (recipe && recipe.ingredients) {
      addToShoppingList(recipe.ingredients);
      alert('✅ Ingredients added to shopping list!');
    }
  };

  const handleAddToMealPlan = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    addToMealPlan(selectedDate, selectedMeal, recipe);
    alert('✅ Added to meal plan!');
    setShowMealPlanModal(false);
    setSelectedDate('');
  };

  if (loading) {
    return (
      <div className="recipe-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details-page">
        <div className="error-container">
          <h2>Recipe not found 😢</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const isLiked = isFavorite(recipe.id);

  return (
    <div className="recipe-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="recipe-details-container">
        {/* Recipe Image */}
        <div className="recipe-img-section">
          <img 
            src={recipe.image || 'https://via.placeholder.com/600x400?text=Recipe'} 
            alt={recipe.name}
            className="recipe-details-img"
          />
          {recipe.custom && (
            <span className="custom-badge-large">Custom Recipe</span>
          )}
        </div>

        {/* Recipe Content */}
        <div className="recipe-content">
          {/* Title and Favorite */}
          <div className="title-section">
            <h1 className="recipe-title">{recipe.name}</h1>
            <button 
              className={`favorite-btn-large ${isLiked ? 'active' : ''}`}
              onClick={() => toggleFavorite(recipe)}
            >
              {isLiked ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>

          {/* Meta Information */}
          <div className="recipe-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <div>
                <div className="meta-label">Cook Time</div>
                <div className="meta-value">{recipe.cookTimeMinutes || recipe.prepTime || 30} min</div>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <div>
                <div className="meta-label">Servings</div>
                <div className="meta-value">{recipe.servings || 4}</div>
              </div>
            </div>
            {recipe.cuisine && (
              <div className="meta-item">
                <span className="meta-icon">🍴</span>
                <div>
                  <div className="meta-label">Cuisine</div>
                  <div className="meta-value">{recipe.cuisine}</div>
                </div>
              </div>
            )}
            {recipe.difficulty && (
              <div className="meta-item">
                <span className="meta-icon">⭐</span>
                <div>
                  <div className="meta-label">Difficulty</div>
                  <div className="meta-value">{recipe.difficulty}</div>
                </div>
              </div>
            )}
          </div>

          {/* Dietary Info */}
          {recipe.dietary && recipe.dietary !== 'None' && (
            <div className="dietary-badge">
              🥗 {recipe.dietary}
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn shopping-btn" onClick={handleAddToShopping}>
              🛒 Add to Shopping List
            </button>
            <button className="action-btn meal-plan-btn" onClick={() => setShowMealPlanModal(true)}>
              📅 Add to Meal Plan
            </button>
          </div>

          {/* Ingredients */}
          <section className="recipe-section">
            <h2 className="section-title">🥘 Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients?.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-bullet">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className="recipe-section">
            <h2 className="section-title">👨‍🍳 Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions?.map((step, i) => (
                <li key={i} className="instruction-item">
                  <span className="step-number">{i + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="tags-section">
              <h3>Tags:</h3>
              <div className="tags-container">
                {recipe.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meal Plan Modal */}
      {showMealPlanModal && (
        <div className="modal-overlay" onClick={() => setShowMealPlanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Add to Meal Plan</h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Select Meal:</label>
                <select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  className="meal-select"
                >
                  <option value="breakfast">🌅 Breakfast</option>
                  <option value="lunch">☀️ Lunch</option>
                  <option value="dinner">🌙 Dinner</option>
                  <option value="snack">🍪 Snack</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn primary" onClick={handleAddToMealPlan}>
                Add to Plan
              </button>
              <button className="modal-btn secondary" onClick={() => setShowMealPlanModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;