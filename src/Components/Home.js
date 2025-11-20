import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.css";
import About from "./About";
import Menu from "./Menu";
import { Link } from "react-router-dom";


const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 API Fetch function
  const fetchRecipes = async (query) => {
    setLoading(true);

    try {
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // 🔥 Auto-search when user types
  useEffect(() => {
    if (search.trim() === "") {
      // default items when search is empty
      fetch("https://dummyjson.com/recipes?limit=4")
        .then((res) => res.json())
        .then((data) => setRecipes(data.recipes));
      return;
    }

    const delay = setTimeout(() => {
      fetchRecipes(search);
    }, 600);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <>
      <div className="homepage">

        {/* HERO SECTION */}
        <section className="hero">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🍽️ Welcome to <span>RecipeBook</span>
          </motion.h1>

          <p>Discover, cook, and enjoy delicious homemade recipes!</p>

          {/* SEARCH BAR */}
          <motion.div
            className="search-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="text"
              placeholder="Search anything... (e.g., cake, biryani, pasta)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>
        </section>

        {/* AVAILABLE ITEMS SECTION */}
        <h2 className="section-title">Available Items ⭐</h2>

        <motion.div
          className="recipe-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >

          {loading && <p className="loading-text">Loading...</p>}

          {!loading && recipes.length === 0 && (
            <p className="no-results">No recipes found 😢</p>
          )}

        {!loading &&
  recipes.map((item) => (
    <motion.div
      className="recipe-card"
      key={item.id}
      whileHover={{ scale: 1.07, rotate: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <img src={item.image} alt={item.name} />

      <div className="card-content">
        <h3>{item.name}</h3>
        <p>
          ⏱ {item.cookTimeMinutes} min | 🍴 {item.cuisine}
        </p>

        <Link to={`/recipe/${item.id}`}>
          <button className="view-btn">View Recipe</button>
        </Link>
      </div>
    </motion.div>
  ))}

        </motion.div>

      </div>
      <About/>
      <Menu/>
    </>
  );
};

export default Home;