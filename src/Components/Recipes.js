import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch API
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        // Add random price because API doesn't provide price
        const updated = data.recipes.slice(0, 12).map((r) => ({
          ...r,
          price: Math.floor(Math.random() * 150) + 100, // ₹100–₹250
        }));
        setRecipes(updated);
        setLoading(false);
      });
  }, []);

  return (
    <div className="recipes-page">

      {/* Floating GIF Animation */}
      <div className="floating-gif">
        <img
          src="https://media.tenor.com/nf0WsE3-Bl4AAAAM/chef-cooking.gif"
          alt="Cooking Animation"
        />
      </div>

      <h2 className="recipes-title">Our Recipes 🍽️</h2>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="recipes-grid">
          {[...Array(8)].map((_, i) => (
            <div className="recipe-skeleton" key={i}></div>
          ))}
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((item) => (
            <div className="recipe-card fade-in" key={item.id}>
              <img src={item.image} alt={item.name} className="recipe-img" />

              <h3>{item.name}</h3>

              <p className="recipe-price">₹{item.price}</p>

              <button
                className="recipe-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
