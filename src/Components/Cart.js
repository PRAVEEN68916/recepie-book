import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  // Calculate total price: sum of (price × quantity) for all items
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty">Cart is empty 😢</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt="" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="total">Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;