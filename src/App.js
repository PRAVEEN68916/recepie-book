import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Recipes from "./Components/Recipes";
import RecipeDetails from "./Components/RecipeDetails";
import AddRecipe from "./Components/AddRecipe";
import MyRecipes from "./Components/MyRecipes";
import Favorites from "./Components/Favorites";
import MealPlanner from "./Components/MealPlanner";
import ShoppingList from "./Components/ShoppingList";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

import { CartProvider } from "./context/CartContext";
import { RecipeProvider } from "./context/RecipeContext";
import { AuthProvider } from "./Components/AuthContext";   // ✅ FIXED: IMPORTED

import "./App.css";
import Footer from './Components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
   const hideLayout = ["/login", "/signup"].includes(location.pathname.toLowerCase());

  return (
    <RecipeProvider>
      <CartProvider>
        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
          </Routes>
          <Footer />
        </Router>
        <Footer />
      </CartProvider>
    </RecipeProvider>
  );
}
