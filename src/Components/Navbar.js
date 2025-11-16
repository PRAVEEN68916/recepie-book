import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">🍽️ RecipeBook</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        
        {/* NEW LINKS */}
        <Link to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart 🛒</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
};

export default Navbar;