import React, { useState, useEffect } from "react";
import "./cart.css";

import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateQuantity = (id, newQuantity) => {
    newQuantity = Math.min(Math.max(newQuantity, 0), 10);

    const localData = {
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    };
    const updatedCart =
      newQuantity === 0
        ? localData.cartItems.filter((item) => item.id !== id)
        : localData.cartItems.map((item) =>
            item.id === id ? { ...item, count: newQuantity } : item
          );

    // Store the details in local storage along with the cart

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartItems(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05);
  };

  const getTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const deliveryCharge = 5;
    const tax = calculateTax();
    const total = Math.round(subtotal + deliveryCharge + tax);
    const cartDetails = {
      subtotal,
      deliveryCharge,
      tax,
      total,
    };
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
    return total;
  };

  useEffect(() => {
    getTotalPrice();
  });

  return (
    <div className="mains">
      <div className="cart-container">
        <h1>Cart Items</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li className="LIST" key={item.id}>
                  <img className="images" src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                  <div className="btnsforquantity">
                    <button
                      className="btnsforit"
                      onClick={() => updateQuantity(item.id, item.count - 1)}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="btnsforit"
                      onClick={() => updateQuantity(item.id, item.count + 1)}
                    >
                      +
                    </button>
                  </div>
                  <h5>Item Price: ${Math.round(item.price)}</h5>
                  <h5>
                    {" "}
                    Total Price(X{item.count}): $
                    {Math.round(item.price * item.count)}
                  </h5>
                </li>
              ))}
            </ul>
            <div className="total-section">
              <p>Subtotal : ${Math.round(calculateSubtotal())}</p>
              <p>Delivery Charge: $5</p>
              <p>Tax (gst +cgst)(5%): ${calculateTax()}</p>
              <p>Total: ${getTotalPrice()}</p>
            </div>
            <Link to="/checkout">
              <button>Continue</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
