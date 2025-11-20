import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="recipe-details">
      <Link to="/" className="back-btn">⬅ Back</Link>

      <h1>{recipe.name}</h1>
     <img src={recipe.image} alt={recipe.name} className="details-img" />


      <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} min</p>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients?.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
