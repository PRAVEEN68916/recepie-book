import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import "./ShoppingList.css";

const ShoppingList = () => {
  const { 
    shoppingList, 
    addSingleItem, 
    toggleShoppingItem, 
    removeShoppingItem, 
    clearCheckedItems,
    clearAllItems 
  } = useRecipes();

  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addSingleItem(newItem.trim());
      setNewItem("");
    }
  };

  // Filter items
  const filteredItems = shoppingList.filter(item => {
    if (filter === "active") return !item.checked;
    if (filter === "completed") return item.checked;
    return true;
  });

  const checkedCount = shoppingList.filter(item => item.checked).length;
  const uncheckedCount = shoppingList.length - checkedCount;

  return (
    <div className="shopping-list-page">
      <div className="shopping-container">
        <h1 className="page-title">Shopping List 🛒</h1>
        <p className="page-subtitle">
          {uncheckedCount} items to buy, {checkedCount} completed
        </p>

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            placeholder="Add new item... (e.g., 2 cups flour)"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="add-item-input"
          />
          <button type="submit" className="add-item-btn">
            ➕ Add
          </button>
        </form>

        {shoppingList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Your Shopping List is Empty!</h2>
            <p>Add items manually or from recipe ingredients</p>
          </div>
        ) : (
          <>
            {/* Filters and Actions */}
            <div className="list-controls">
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({shoppingList.length})
                </button>
                <button 
                  className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  To Buy ({uncheckedCount})
                </button>
                <button 
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Bought ({checkedCount})
                </button>
              </div>

              <div className="action-buttons">
                {checkedCount > 0 && (
                  <button 
                    className="clear-btn"
                    onClick={() => {
                      if (window.confirm(`Remove ${checkedCount} checked items?`)) {
                        clearCheckedItems();
                      }
                    }}
                  >
                    🗑️ Clear Checked
                  </button>
                )}
                {shoppingList.length > 0 && (
                  <button 
                    className="clear-all-btn"
                    onClick={() => {
                      if (window.confirm('Remove all items from shopping list?')) {
                        clearAllItems();
                      }
                    }}
                  >
                    🗑️ Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Shopping Items */}
            {filteredItems.length === 0 ? (
              <div className="no-items">
                <p>No items in this category</p>
              </div>
            ) : (
              <div className="shopping-items">
                {filteredItems.map(item => (
                  <div 
                    key={item.id} 
                    className={`shopping-item ${item.checked ? 'checked' : ''}`}
                  >
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleShoppingItem(item.id)}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <span className="item-name">{item.name}</span>

                    <button 
                      className="remove-item-btn"
                      onClick={() => removeShoppingItem(item.id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;