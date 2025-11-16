import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { addToCart } = useCart();

  // Fetching from API
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes.slice(0, 12)); // limit 12
      });
  }, []);

  return (
    <div className="recipes-page">
      <h2>Recipes 🍽️</h2>

      <div className="recipes-grid">
        {recipes.map((item) => (
          <div className="recipe-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p>₹{item.calories}</p>

            <button className="add-btn" onClick={() => addToCart(item)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;