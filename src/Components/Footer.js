import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Branding */}
        <div className="footer-section">
          <h2 className="footer-logo">RecipeBook 🍽️</h2>
          <p>
            Bringing flavors from around the world straight to your kitchen.
            Easy, quick, and delicious recipes for everyone — from beginners to experts!
          </p>
        </div>

        {/* Categories / Services */}
        <div className="footer-section">
          <h3>Top Categories</h3>
          <ul>
            <li><a href="#">🔥 Trending Recipes</a></li>
            <li><a href="#">🥗 Healthy Meals</a></li>
            <li><a href="#">🍰 Desserts</a></li>
            <li><a href="#">⏱ Quick & Easy</a></li>
            <li><a href="#">🌍 World Cuisine</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Join Our Newsletter</h3>
          <p>Get new recipes, cooking tips, and food hacks straight to your inbox.</p>

          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>

          <h3 style={{ marginTop: "20px" }}>Follow Us</h3>
          <div className="footer-socials">
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="Instagram">📸</a>
            <a href="#" title="Twitter">🐦</a>
            <a href="#" title="YouTube">▶️</a>
          </div>
        </div>
      </div>

      <hr />

      <p className="footer-bottom">
        © {new Date().getFullYear()} RecipeBook. All rights reserved.  
        Made with ❤️ by Food Lovers .
      </p>
    </footer>
  );
};

export default Footer;