import React from "react";
import "./Menu.css";

const menuItems = [
  { name: "Paneer Butter Masala", price: "₹150", type: "Veg" },
  { name: "Chicken Biryani", price: "₹200", type: "Non-Veg" },
  { name: "Veg Biryani", price: "₹130", type: "Veg" },
  { name: "Grilled Sandwich", price: "₹90", type: "Snack" },
  { name: "French Fries", price: "₹70", type: "Snack" },
  { name: "Gulab Jamun", price: "₹60", type: "Dessert" },
  { name: "Chocolate Cake", price: "₹90", type: "Dessert" },
  { name: "Pasta Alfredo", price: "₹110", type: "Veg" },
  { name: "Cold Coffee", price: "₹80", type: "Beverage" },
  { name: "Mojito", price: "₹100", type: "Beverage" },
];

const Menu = () => {
  return (
    <div className="menu-page">
      <h2>Our Menu 🍴</h2>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <h3>{item.name}</h3>
            <p>{item.type}</p>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;