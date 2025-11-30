// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useRecipes } from "../context/RecipeContext";
// import RecipeCard from "./RecipeCard";
// import "./Home.css";

// const Home = () => {
//   const [search, setSearch] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { customRecipes } = useRecipes();

//   // Fetch recipes from API
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       try {
//         const query = search.trim();
//         const url = query 
//           ? `https://dummyjson.com/recipes/search?q=${query}`
//           : 'https://dummyjson.com/recipes?limit=8';
        
//         const res = await fetch(url);
//         const data = await res.json();
//         setRecipes(data.recipes || []);
//       } catch (err) {
//         console.error("Error fetching recipes:", err);
//       }
//       setLoading(false);
//     };

//     const timer = setTimeout(fetchRecipes, 300);
//     return () => clearTimeout(timer);
//   }, [search]);

//   return (
//     <>
//       <div className="home">
//         {/* Hero Section */}
//         <section className="hero">
//           <h1 className="hero-title">
//            Welcome to <span style={{color:"orange"}}>RecipeBook</span>
//           </h1>
//           <p className="hero-subtitle">
//             Discover, Create, and Enjoy Delicious Recipes from Around the World!
//           </p>

//           {/* Search Bar
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search recipes... (e.g., pasta, cake, biryani)"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div> */}

//           {/* Quick Actions */}
//           <div className="quick-actions">
//             <Link to="/add-recipe" className="action-btn">
//               ➕ Add Recipe
//             </Link>
//             <Link to="/meal-planner" className="action-btn">
//               📅 Plan Meals
//             </Link>
//             <Link to="/favorites" className="action-btn">
//               ❤️ Favorites
//             </Link>
//             <Link to="/shopping-list" className="action-btn">
//               🛒 Shopping List
//             </Link>
//           </div>
//         </section>

//         {/* Featured Recipes Section */}
//         <section className="section">
//           <h2 className="section-title">Featured Recipes ⭐</h2>
          
//           {loading && <p className="loading-text">Loading recipes...</p>}
          
//           {!loading && recipes.length === 0 && (
//             <p className="no-results">No recipes found 😢</p>
//           )}

//           <div className="recipe-grid">
//             {recipes.map((recipe) => (
//               <RecipeCard key={recipe.id} recipe={recipe} />
//             ))}
//           </div>
//         </section>

//         {/* Custom Recipes Section */}
//         {customRecipes.length > 0 && (
//           <section className="section">
//             <div className="section-header">
//               <h2 className="section-title">Your Custom Recipes 👨‍🍳</h2>
//               <Link to="/my-recipes" className="view-all-btn">
//                 View All →
//               </Link>
//             </div>
            
//             <div className="recipe-grid">
//               {customRecipes.slice(0, 4).map((recipe) => (
//                 <RecipeCard key={recipe.id} recipe={recipe} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Features Section */}
//         <section className="features-section">
//           <h2 className="section-title">Why RecipeBook? ✨</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">📝</div>
//               <h3>Create Custom Recipes</h3>
//               <p>Add your own recipes with ingredients, instructions, and photos</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">❤️</div>
//               <h3>Save Favorites</h3>
//               <p>Keep track of your favorite recipes in one place</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">📅</div>
//               <h3>Meal Planning</h3>
//               <p>Plan your weekly meals and stay organized</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🛒</div>
//               <h3>Shopping Lists</h3>
//               <p>Generate shopping lists from your recipes</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";
import "./Home.css";

const sliderImages = [
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", // pasta
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg", // burger
  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg", // pizza
  "https://images.pexels.com/photos/792024/pexels-photo-792024.jpeg", // biryani
  "https://images.pexels.com/photos/461326/pexels-photo-461326.jpeg", // curry
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", // noodles
  "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg", // dosa
  "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg", // cake
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg", // salad
  "https://images.pexels.com/photos/4110001/pexels-photo-4110001.jpeg"  // chicken curry
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { customRecipes } = useRecipes();

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const query = search.trim();
        const url = query
          ? `https://dummyjson.com/recipes/search?q=${query}`
          : "https://dummyjson.com/recipes?limit=8";

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

        {/* 🔥 Modern Slider with Arrows */}
        <div className="slider-container">

          {/* Slides */}
          <div
            className="slider-wrapper"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {sliderImages.map((img, i) => (
              <div className="slide" key={i}>
                <img src={img} alt={`slide-${i}`} />
              </div>
            ))}
          </div>

          {/* Arrow Buttons */}
          <button className="arrow-btn left" onClick={handlePrev}>
            ❮
          </button>
          <button className="arrow-btn right" onClick={handleNext}>
            ❯
          </button>

          {/* Dots */}
          <div className="slider-dots">
            {sliderImages.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">
            Welcome to <span style={{ color: "orange" }}>RecipeBook</span>
          </h1>
          <p className="hero-subtitle">
            Discover, Create, and Enjoy Delicious Recipes from Around the World!
          </p>

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

        {/* Featured Recipes */}
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

        {/* Custom Recipes */}
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

        {/* Features */}
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

