import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Menu from "./Components/Menu";
import Recipes from "./Components/Recipes";
import Cart from "./Components/Cart";
import RecipeDetails from './Components/RecipeDetails';
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>

      </Router>
    </CartProvider>
  );
}

export default App;