import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart();

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <video playsInline loop style={{ width: "50px" }} autoPlay muted>
                    <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/recipe-book-animation-gif-download-11163341.mp4" type="video/mp4" />
                </video>RecipeBook
            </Link>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
              

                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                <Link to="/recipes" onClick={() => setMenuOpen(false)}>All Recipes</Link>
                <Link to="/my-recipes" onClick={() => setMenuOpen(false)}>My Recipes</Link>
                {/* <Link to="/add-recipe" onClick={() => setMenuOpen(false)}>Add Recipe</Link> */}
                <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</Link>
                {/* <Link to="/meal-planner" onClick={() => setMenuOpen(false)}>Meal Plan</Link> */}
                <Link to="/shopping-list" onClick={() => setMenuOpen(false)}>Shopping</Link>
                {/* <Link to="/cart" onClick={() => setMenuOpen(false)} className="cart-link">
                    🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link> */}
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </div>

            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;