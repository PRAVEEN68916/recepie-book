import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";
import "./Favorites.css";

const Favorites = () => {
  const { favorites } = useRecipes();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Filter and sort favorites
  let filteredFavorites = favorites.filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) ||
    (recipe.cuisine && recipe.cuisine.toLowerCase().includes(search.toLowerCase()))
  );

  // Sort favorites
  if (sortBy === "name") {
    filteredFavorites = [...filteredFavorites].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "time") {
    filteredFavorites = [...filteredFavorites].sort((a, b) => 
      (a.cookTimeMinutes || 0) - (b.cookTimeMinutes || 0)
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Favorite Recipes ❤️</h1>
          <p className="page-subtitle">
            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h2>No Favorites Yet!</h2>
          <p>Start adding recipes to your favorites by clicking the heart icon</p>
        </div>
      ) : (
        <>
          {/* Search and Sort */}
          <div className="controls-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search favorites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="sort-box">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recent">Recently Added</option>
                <option value="name">Name (A-Z)</option>
                <option value="time">Cook Time</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {filteredFavorites.length === 0 ? (
            <div className="no-results">
              <p>No favorites match your search 😢</p>
              <button 
                className="reset-btn"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {filteredFavorites.length !== favorites.length && (
                <p className="results-count">
                  Showing {filteredFavorites.length} of {favorites.length} favorites
                </p>
              )}
              
              <div className="recipe-grid">
                {filteredFavorites.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;