import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { customRecipes } = useRecipes();

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const query = search.trim();
        const url = query 
          ? `https://dummyjson.com/recipes/search?q=${query}`
          : 'https://dummyjson.com/recipes?limit=8';
        
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchRecipes, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">
            🍽️ Welcome to <span>RecipeBook</span>
          </h1>
          <p className="hero-subtitle">
            Discover, Create, and Enjoy Delicious Recipes from Around the World!
          </p>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes... (e.g., pasta, cake, biryani)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/add-recipe" className="action-btn">
              ➕ Add Recipe
            </Link>
            <Link to="/meal-planner" className="action-btn">
              📅 Plan Meals
            </Link>
            <Link to="/favorites" className="action-btn">
              ❤️ Favorites
            </Link>
            <Link to="/shopping-list" className="action-btn">
              🛒 Shopping List
            </Link>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="section">
          <h2 className="section-title">Featured Recipes ⭐</h2>
          
          {loading && <p className="loading-text">Loading recipes...</p>}
          
          {!loading && recipes.length === 0 && (
            <p className="no-results">No recipes found 😢</p>
          )}

          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Custom Recipes Section */}
        {customRecipes.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Your Custom Recipes 👨‍🍳</h2>
              <Link to="/my-recipes" className="view-all-btn">
                View All →
              </Link>
            </div>
            
            <div className="recipe-grid">
              {customRecipes.slice(0, 4).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why RecipeBook? ✨</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Create Custom Recipes</h3>
              <p>Add your own recipes with ingredients, instructions, and photos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Save Favorites</h3>
              <p>Keep track of your favorite recipes in one place</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Meal Planning</h3>
              <p>Plan your weekly meals and stay organized</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Shopping Lists</h3>
              <p>Generate shopping lists from your recipes</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;