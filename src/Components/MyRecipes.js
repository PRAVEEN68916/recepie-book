import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";
import "./MyRecipes.css";

const MyRecipes = () => {
  const { customRecipes, deleteRecipe } = useRecipes();
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterDietary, setFilterDietary] = useState("all");

  // Filter recipes
  const filteredRecipes = customRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(search.toLowerCase()) ||
                         (recipe.cuisine && recipe.cuisine.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty = filterDifficulty === "all" || recipe.difficulty === filterDifficulty;
    const matchesDietary = filterDietary === "all" || recipe.dietary === filterDietary;
    
    return matchesSearch && matchesDifficulty && matchesDietary;
  });

  return (
    <div className="my-recipes-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Recipes 👨‍🍳</h1>
          <p className="page-subtitle">
            {customRecipes.length} {customRecipes.length === 1 ? 'recipe' : 'recipes'} in your collection
          </p>
        </div>
        <Link to="/add-recipe" className="add-recipe-btn">
          ➕ Add New Recipe
        </Link>
      </div>

      {customRecipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>No Recipes Yet!</h2>
          <p>Start building your personal recipe collection</p>
          <Link to="/add-recipe" className="primary-btn">
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="filters-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search your recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={filterDietary}
                onChange={(e) => setFilterDietary(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Dietary Types</option>
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Keto">Keto</option>
                <option value="Low-Carb">Low-Carb</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {filteredRecipes.length !== customRecipes.length && (
            <p className="results-count">
              Showing {filteredRecipes.length} of {customRecipes.length} recipes
            </p>
          )}

          {/* Recipe Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="no-results">
              <p>No recipes match your filters 😢</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearch("");
                  setFilterDifficulty("all");
                  setFilterDietary("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="recipe-grid">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  showActions={true}
                  onDelete={deleteRecipe}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyRecipes;