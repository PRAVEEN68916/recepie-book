import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Menu.css";

const menuItems = [
  {
    name: "Paneer Butter Masala",
    price: 150,
    type: "Veg",
    desc: "Rich & creamy paneer cooked in buttery tomato gravy.",
    img: "https://www.cookwithmanali.com/wp-content/uploads/2021/09/Paneer-Butter-Masala-Restaurant-Style.jpg"
  },
  {
    name: "Chicken Biryani",
    price: 200,
    type: "Non-Veg",
    desc: "Aromatic spiced rice layered with juicy chicken.",
    img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg"
  },
  {
    name: "Veg Biryani",
    price: 130,
    type: "Veg",
    desc: "Healthy, flavourful and aromatic vegetable biryani.",
    img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/veg-biryani-500x500.jpg"
  },
  {
    name: "Grilled Sandwich",
    price: 90,
    type: "Snack",
    desc: "Cheesy golden sandwich with crunchy veggies.",
    img: "https://www.cookwithkushi.com/wp-content/uploads/2023/11/best_grilled_cheese_sandwich_recipe.jpg"
  },
  {
    name: "French Fries",
    price: 70,
    type: "Snack",
    desc: "Crispy, golden and perfectly salted fries.",
    img: "https://static.toiimg.com/thumb/54659021.cms?width=1200&height=900"
  },
  {
    name: "Gulab Jamun",
    price: 60,
    type: "Dessert",
    desc: "Soft & juicy milk-solid balls soaked in sugar syrup.",
    img: "https://www.cookwithkushi.com/wp-content/uploads/2022/10/best_easy_milk_powder_gulab_jamun_recipe.jpg"
  },
  {
    name: "Chocolate Cake",
    price: 90,
    type: "Dessert",
    desc: "Super moist chocolate cake with creamy frosting.",
    img: "https://www.sharmispassions.com/wp-content/uploads/2022/02/ChocolateCake3.jpg"
  },
  {
    name: "Pasta Alfredo",
    price: 110,
    type: "Veg",
    desc: "Creamy, cheesy pasta made in Italian style.",
    img: "https://static.toiimg.com/photo/84786409.cms"
  },
  {
    name: "Cold Coffee",
    price: 80,
    type: "Beverage",
    desc: "Refreshing iced coffee blended with cream.",
    img: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/05/cold-coffee-3.jpg"
  },
  {
    name: "Mojito",
    price: 100,
    type: "Beverage",
    desc: "Cool refreshing mint-lime mojito.",
    img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Virgin-Mojito-Recipe.jpg"
  }
];

const categories = ["All", "Veg", "Non-Veg", "Snack", "Dessert", "Beverage"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const { addToCart, cartCount } = useCart();

  const filteredItems = menuItems
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.type === selectedCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="menu-page">

      {/* Floating chef GIF */}
      <img
        className="chef-gif"
        src="https://media.tenor.com/iM1g1a2JfP0AAAAi/chef-cooking.gif"
        alt="Chef Animation"
      />

      {/* Cart Count Bubble */}
      <div className="cart-bubble">🛒 {cartCount}</div>

      <h2 className="menu-title">Our Menu 🍴</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="menu-search"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Buttons */}
      <div className="menu-categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={selectedCategory === cat ? "active-category" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sorting */}
      <select
        className="sort-select"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
      </select>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item, index) => (
          <div className="menu-card fade-in" key={index}>
            <img src={item.img} alt={item.name} className="menu-img" />

            <div className="menu-info">
              <h3>{item.name}</h3>
              <p className="menu-type">{item.type}</p>

              <p className="menu-desc">{item.desc}</p>

              <div className="menu-bottom">
                <span className="menu-price">₹{item.price}</span>

                <button
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>

                <button
                  className="view-btn"
                  onClick={() => setSelectedItem(item)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="no-results">No items found 😢</p>
      )}

      {/* Popup Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.img} alt="" className="modal-img" />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.desc}</p>
            <h3>₹{selectedItem.price}</h3>

            <button
              className="modal-add"
              onClick={() => addToCart(selectedItem)}
            >
              Add to Cart 🛒
            </button>

            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;
