import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + Description */}
        <div className="footer-section">
          <h2 className="footer-logo">🍽️ RecipeBook</h2>
          <p className="footer-text">
            Your personal cookbook — discover, save, and cook delicious meals every day.
          </p>

          <div className="app-badges">
            <img src="https://img.icons8.com/color/48/google-play.png" alt="Play Store" />
            <img src="https://img.icons8.com/ios-filled/50/apple-app-store.png" alt="App Store" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/recipes">📚 All Recipes</Link></li>
            <li><Link to="/favorites">❤️ Favorites</Link></li>
            <li><Link to="/add-recipe">➕ Add Recipe</Link></li>
            <li><Link to="/shopping-list">🛒 Shopping List</Link></li>
            <li><Link to="/meal-plan">📅 Meal Planner</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Popular Categories</h3>
          <ul>
            <li><Link to="/category/breakfast">🌅 Breakfast</Link></li>
            <li><Link to="/category/lunch">☀️ Lunch</Link></li>
            <li><Link to="/category/dinner">🌙 Dinner</Link></li>
            <li><Link to="/category/snacks">🍪 Snacks</Link></li>
            <li><Link to="/category/desserts">🍰 Desserts</Link></li>
            <li><Link to="/category/healthy">🥗 Healthy</Link></li>
          </ul>
        </div>

        {/* Additional Info */}
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><Link to="/about">ℹ️ About Us</Link></li>
            <li><Link to="/contact">📩 Contact Us</Link></li>
            <li><Link to="/privacy">🔐 Privacy Policy</Link></li>
            <li><Link to="/terms">📜 Terms & Conditions</Link></li>
            <li><Link to="/help">❓ Help Center</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>

          <h3 className="newsletter-title">Newsletter</h3>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <hr className="footer-divider" />

      <p className="footer-bottom">
        © {new Date().getFullYear()} RecipeBook — Crafted with ❤️ for food lovers.
      </p>
    </footer>
  );
};

export default Footer;
