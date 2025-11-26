import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import "./AddRecipe.css";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    cuisine: '',
    prepTime: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: 'Easy',
    dietary: 'None',
    ingredients: '',
    instructions: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Recipe name is required';
    }

    if (!formData.cookTimeMinutes || formData.cookTimeMinutes <= 0) {
      newErrors.cookTimeMinutes = 'Valid cook time is required';
    }

    if (!formData.servings || formData.servings <= 0) {
      newErrors.servings = 'Valid servings count is required';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'At least one ingredient is required';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const recipe = {
      ...formData,
      prepTime: formData.prepTime || formData.cookTimeMinutes,
      ingredients: formData.ingredients
        .split('\n')
        .map(i => i.trim())
        .filter(i => i),
      instructions: formData.instructions
        .split('\n')
        .map(i => i.trim())
        .filter(i => i),
      tags: formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t)
    };

    addRecipe(recipe);
    alert('Recipe added successfully! ✅');
    navigate('/my-recipes');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      navigate('/my-recipes');
    }
  };

  return (
    <div className="add-recipe-page">
      <div className="add-recipe-container">
        <h1 className="page-title">Add New Recipe ✨</h1>
        <p className="page-subtitle">Share your culinary creation with the world!</p>

        <form onSubmit={handleSubmit} className="recipe-form">
          
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">📝 Basic Information</h2>
            
            <div className="form-group">
              <label className="form-label">
                Recipe Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Recipe Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Cuisine Type</label>
                <input
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Italian, Chinese, Indian"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Difficulty Level <span className="required">*</span>
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Dietary Type</label>
                <select
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="None">None</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto</option>
                  <option value="Low-Carb">Low-Carb</option>
                  <option value="Paleo">Paleo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Servings <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  className={`form-input ${errors.servings ? 'error' : ''}`}
                  placeholder="4"
                  min="1"
                />
                {errors.servings && <span className="error-message">{errors.servings}</span>}
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="form-section">
            <h2 className="section-title">⏱️ Time Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prep Time (minutes)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="15"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Cook Time (minutes) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="cookTimeMinutes"
                  value={formData.cookTimeMinutes}
                  onChange={handleChange}
                  className={`form-input ${errors.cookTimeMinutes ? 'error' : ''}`}
                  placeholder="30"
                  min="1"
                />
                {errors.cookTimeMinutes && <span className="error-message">{errors.cookTimeMinutes}</span>}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="form-section">
            <h2 className="section-title">🥘 Ingredients <span className="required">*</span></h2>
            <p className="helper-text">Enter one ingredient per line</p>
            
            <div className="form-group">
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className={`form-textarea ${errors.ingredients ? 'error' : ''}`}
                placeholder="2 cups all-purpose flour&#10;1 teaspoon salt&#10;3 large eggs&#10;1 tablespoon olive oil"
                rows="8"
              />
              {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
            </div>
          </div>

          {/* Instructions */}
          <div className="form-section">
            <h2 className="section-title">👨‍🍳 Instructions <span className="required">*</span></h2>
            <p className="helper-text">Enter one step per line</p>
            
            <div className="form-group">
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className={`form-textarea ${errors.instructions ? 'error' : ''}`}
                placeholder="Preheat oven to 350°F (175°C)&#10;Mix flour and salt in a large bowl&#10;Add eggs and mix until well combined&#10;Bake for 25-30 minutes until golden brown"
                rows="10"
              />
              {errors.instructions && <span className="error-message">{errors.instructions}</span>}
            </div>
          </div>

          {/* Tags */}
          <div className="form-section">
            <h2 className="section-title">🏷️ Tags (Optional)</h2>
            <p className="helper-text">Separate tags with commas</p>
            
            <div className="form-group">
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-input"
                placeholder="quick, easy, breakfast, party, healthy"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              ➕ Add Recipe
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;