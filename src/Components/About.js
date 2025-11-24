import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* LEFT SIDE — TEXT */}
      <div className="about-text">
        <h2>About RecipeBook 🍽️</h2>

        <p>
          RecipeBook is your personal cooking assistant with easy, quick, and
          delicious recipes from every corner of the world. Whether you’re a
          beginner or a home-chef, we help make cooking joyful, fast, and
          stress-free.
        </p>

        <h3>✨ Our Mission</h3>
        <ul>
          <li>Provide simple step-by-step recipes for everyone.</li>
          <li>Offer healthy, budget-friendly food ideas.</li>
          <li>Make people confident and creative in the kitchen.</li>
        </ul>

        <h3>👨‍🍳 What You’ll Find Here</h3>
        <ul>
          <li>Vegetarian & Non-Veg recipes</li>
          <li>Quick 10–20 minute meals</li>
          <li>Desserts, snacks & sweets</li>
          <li>Festival special dishes</li>
          <li>Diet-friendly items (Keto, High-Protein, Vegan)</li>
        </ul>

        <h3>🌍 The RecipeBook Journey</h3>
        <p>
          RecipeBook began as a small idea for sharing homemade recipes with
          friends. Today, it has grown into a global food-loving community filled
          with passionate home cooks, learners, and explorers.
        </p>

        <h3>🤝 Our Team</h3>
        <p>
          We are a small, passionate team dedicated to bringing you the best
          cooking experience through creativity, taste, and love for food.
        </p>
      </div>

      {/* RIGHT SIDE — ANIMATED IMAGE */}
      <div className="about-image">
        <video playsinline loop autoPlay muted style={{ width: "300px" }}>
          <source src="https://cdnl.iconscout.com/lottie/free/preview/free-cooking-animation-gif-download-12152527.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default About;
