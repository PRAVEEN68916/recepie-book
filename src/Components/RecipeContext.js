import React, { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  // Custom Recipes
  const [customRecipes, setCustomRecipes] = useState(() => {
    const saved = localStorage.getItem('customRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Meal Plan
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('mealPlan');
    return saved ? JSON.parse(saved) : {};
  });

  // Shopping List
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
  }, [customRecipes]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Recipe Functions
  const addRecipe = (recipe) => {
    const newRecipe = { 
      ...recipe, 
      id: Date.now(), 
      custom: true,
      createdAt: new Date().toISOString()
    };
    setCustomRecipes([...customRecipes, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id, updatedRecipe) => {
    setCustomRecipes(customRecipes.map(r => 
      r.id === id ? { ...r, ...updatedRecipe } : r
    ));
  };

  const deleteRecipe = (id) => {
    setCustomRecipes(customRecipes.filter(r => r.id !== id));
    // Also remove from favorites if exists
    setFavorites(favorites.filter(f => f.id !== id));
  };

  // Favorite Functions
  const toggleFavorite = (recipe) => {
    const isFav = favorites.find(f => f.id === recipe.id);
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(f => f.id === recipeId);
  };

  // Meal Plan Functions
  const addToMealPlan = (date, meal, recipe) => {
    setMealPlan({
      ...mealPlan,
      [date]: { 
        ...mealPlan[date], 
        [meal]: recipe 
      }
    });
  };

  const removeMealPlan = (date, meal) => {
    const updatedDay = { ...mealPlan[date] };
    delete updatedDay[meal];
    
    if (Object.keys(updatedDay).length === 0) {
      const updatedPlan = { ...mealPlan };
      delete updatedPlan[date];
      setMealPlan(updatedPlan);
    } else {
      setMealPlan({
        ...mealPlan,
        [date]: updatedDay
      });
    }
  };

  // Shopping List Functions
  const addToShoppingList = (items) => {
    const newItems = items.map(item => ({ 
      id: Date.now() + Math.random(), 
      name: typeof item === 'string' ? item : item.name,
      checked: false,
      addedAt: new Date().toISOString()
    }));
    setShoppingList([...shoppingList, ...newItems]);
  };

  const addSingleItem = (itemName) => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      checked: false,
      addedAt: new Date().toISOString()
    };
    setShoppingList([...shoppingList, newItem]);
  };

  const toggleShoppingItem = (id) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeShoppingItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const clearCheckedItems = () => {
    setShoppingList(shoppingList.filter(item => !item.checked));
  };

  const clearAllItems = () => {
    setShoppingList([]);
  };

  return (
    <RecipeContext.Provider value={{
      customRecipes,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      favorites,
      toggleFavorite,
      isFavorite,
      mealPlan,
      addToMealPlan,
      removeMealPlan,
      shoppingList,
      addToShoppingList,
      addSingleItem,
      toggleShoppingItem,
      removeShoppingItem,
      clearCheckedItems,
      clearAllItems
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};