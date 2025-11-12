import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";

const recipes = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    image:
      "https://images.unsplash.com/photo-1601050690597-df3e522f2d1d?auto=format&fit=crop&w=800&q=80",
    time: "30 min",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Veg Biryani",
    image:
      "https://images.unsplash.com/photo-1603899122628-3c4fdf9d726a?auto=format&fit=crop&w=800&q=80",
    time: "45 min",
    difficulty: "Hard",
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    image:
      "https://images.unsplash.com/photo-1604908176997-3f7b3e4c4a61?auto=format&fit=crop&w=800&q=80",
    time: "20 min",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    time: "60 min",
    difficulty: "Medium",
  },
];

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🍽️ Welcome to <span>RecipeBook</span>
        </motion.h1>
        <p>Discover, cook, and enjoy delicious homemade recipes!</p>

        {/* Search bar */}
        <motion.div
          className="search-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search your favorite recipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>
      </section>

      {/* Recipe Cards */}
      <motion.div
        className="recipe-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {filteredRecipes.map((recipe) => (
          <motion.div
            className="recipe-card"
            key={recipe.id}
            whileHover={{ scale: 1.05 }}
          >
            <img src={recipe.image} alt={recipe.name} />
            <div className="card-content">
              <h3>{recipe.name}</h3>
              <p>⏱️ {recipe.time} | 💪 {recipe.difficulty}</p>
              <button className="view-btn">View Recipe</button>
            </div>
          </motion.div>
        ))}

        {filteredRecipes.length === 0 && (
          <p className="no-results">No recipes found 😢</p>
        )}
      </motion.div>
    </div>
  );
};

export default Home;