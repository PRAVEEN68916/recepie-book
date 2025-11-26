import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import "./Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes?limit=50')
      .then(res => res.json())
      .then(data => {
        // Add random difficulty and dietary info
        const enrichedRecipes = data.recipes.map(r => ({
          ...r,
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
          dietary: ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'][Math.floor(Math.random() * 5)]
        }));
        setRecipes(enrichedRecipes);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Get unique cuisines
  const cuisines = ['all', ...new Set(recipes.map(r => r.cuisine))];

  // Filter recipes
  let filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(search.toLowerCase()) ||
                         (recipe.cuisine && recipe.cuisine.toLowerCase().includes(search.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesDietary = selectedDietary === 'all' || recipe.dietary === selectedDietary;
    
    return matchesSearch && matchesCuisine && matchesDifficulty && matchesDietary;
  });

  // Sort recipes
  filteredRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'time') {
      return (a.cookTimeMinutes || 0) - (b.cookTimeMinutes || 0);
    } else if (sortBy === 'difficulty') {
      const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return order[a.difficulty] - order[b.difficulty];
    }
    return 0;
  });

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1 className="page-title">All Recipes 🍳</h1>
        <p className="page-subtitle">
          Explore {recipes.length} delicious recipes from around the world
        </p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="filters-grid">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Cuisines</option>
            {cuisines.slice(1).map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Dietary Types</option>
            <option value="None">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Keto">Keto</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Sort by Name</option>
            <option value="time">Sort by Cook Time</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {(search || selectedCuisine !== 'all' || selectedDifficulty !== 'all' || selectedDietary !== 'all') && (
          <div className="active-filters">
            <span className="filters-label">Active Filters:</span>
            {search && <span className="filter-tag">Search: "{search}"</span>}
            {selectedCuisine !== 'all' && <span className="filter-tag">Cuisine: {selectedCuisine}</span>}
            {selectedDifficulty !== 'all' && <span className="filter-tag">Difficulty: {selectedDifficulty}</span>}
            {selectedDietary !== 'all' && <span className="filter-tag">Dietary: {selectedDietary}</span>}
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearch('');
                setSelectedCuisine('all');
                setSelectedDifficulty('all');
                setSelectedDietary('all');
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="results-count">
        Showing {filteredRecipes.length} of {recipes.length} recipes
      </p>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredRecipes.length === 0 && (
        <div className="no-results">
          <h2>No recipes found 😢</h2>
          <p>Try adjusting your filters</p>
          <button 
            className="reset-btn"
            onClick={() => {
              setSearch('');
              setSelectedCuisine('all');
              setSelectedDifficulty('all');
              setSelectedDietary('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && filteredRecipes.length > 0 && (
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;