import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import "./MealPlanner.css";

const MealPlanner = () => {
  const { mealPlan, removeMealPlan } = useRecipes();
  const [currentWeek, setCurrentWeek] = useState(0);

  // Get dates for current week
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({
        full: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const meals = ['breakfast', 'lunch', 'dinner', 'snack'];

  const mealLabels = {
    breakfast: '🌅 Breakfast',
    lunch: '☀️ Lunch',
    dinner: '🌙 Dinner',
    snack: '🍪 Snack'
  };

  return (
    <div className="meal-planner-page">
      <div className="page-header">
        <h1 className="page-title">Meal Planner 📅</h1>
        <p className="page-subtitle">Plan your weekly meals ahead</p>
      </div>

      {/* Week Navigation */}
      <div className="week-navigation">
        <button 
          className="week-btn"
          onClick={() => setCurrentWeek(currentWeek - 1)}
        >
          ← Previous Week
        </button>
        <span className="current-week">
          {currentWeek === 0 ? 'This Week' : currentWeek > 0 ? `${currentWeek} Week${currentWeek > 1 ? 's' : ''} Ahead` : `${Math.abs(currentWeek)} Week${Math.abs(currentWeek) > 1 ? 's' : ''} Ago`}
        </span>
        <button 
          className="week-btn"
          onClick={() => setCurrentWeek(currentWeek + 1)}
        >
          Next Week →
        </button>
      </div>

      {/* Meal Plan Grid */}
      <div className="meal-plan-container">
        <div className="meal-grid">
          {/* Header Row - Days */}
          <div className="grid-header day-header"></div>
          {weekDates.map((dateObj, index) => (
            <div key={index} className="grid-header day-column">
              <div className="day-name">{dateObj.day}</div>
              <div className="day-date">{dateObj.month} {dateObj.date}</div>
            </div>
          ))}

          {/* Meal Rows */}
          {meals.map(meal => (
            <React.Fragment key={meal}>
              {/* Meal Label */}
              <div className="meal-label">
                {mealLabels[meal]}
              </div>

              {/* Meal Cells for each day */}
              {weekDates.map((dateObj, index) => {
                const recipe = mealPlan[dateObj.full]?.[meal];
                
                return (
                  <div key={`${meal}-${index}`} className="meal-cell">
                    {recipe ? (
                      <div className="meal-card">
                        <Link to={`/recipe/${recipe.id}`} className="meal-link">
                          <div className="meal-img-container">
                            <img 
                              src={recipe.image || 'https://via.placeholder.com/150'} 
                              alt={recipe.name}
                              className="meal-img"
                            />
                          </div>
                          <div className="meal-name">{recipe.name}</div>
                        </Link>
                        <button 
                          className="remove-meal-btn"
                          onClick={() => removeMealPlan(dateObj.full, meal)}
                          aria-label="Remove meal"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="empty-meal">
                        <Link to="/recipes" className="add-meal-link">
                          ➕ Add Meal
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions-box">
        <h3>📝 How to Use Meal Planner:</h3>
        <ol>
          <li>Browse recipes and click "Add to Meal Plan" button</li>
          <li>Select the date and meal time (breakfast, lunch, dinner, or snack)</li>
          <li>Your meal will appear in the calendar above</li>
          <li>Click on any meal to view the full recipe</li>
          <li>Remove meals by clicking the "✕" button</li>
        </ol>
      </div>
    </div>
  );
};

export default MealPlanner;