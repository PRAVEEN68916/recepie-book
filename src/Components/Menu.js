import React from "react";
import { motion } from "framer-motion";

const dishes = [
  { name: "Butter Chicken", price: "₹180", category: "Non-Veg" },
  { name: "Paneer Tikka", price: "₹150", category: "Veg" },
  { name: "Veg Biryani", price: "₹130", category: "Veg" },
  { name: "Fish Curry", price: "₹200", category: "Non-Veg" },
  { name: "Chocolate Cake", price: "₹90", category: "Dessert" },
];

const Menu = () => {
  return (
    <motion.div
      className="menu-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Our Menu 🍴</h2>
      <div className="menu-grid">
        {dishes.map((dish, index) => (
          <motion.div
            key={index}
            className="menu-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>{dish.name}</h3>
            <p>{dish.category}</p>
            <span>{dish.price}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Menu;