import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myorders.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const userDataCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));

    if (!userDataCookie) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      const userFromCookies = JSON.parse(
        decodeURIComponent(userDataCookie.split("=")[1])
      );
      setUserData(userFromCookies);

      const orderId =
        localStorage.getItem("orderId") || generateRandomOrderId();
      localStorage.setItem("orderId", orderId);

      const orderDetailsFromLocalStorage = JSON.parse(
        localStorage.getItem("orderDetails") || "{}"
      );

      const orderDataWithOrderId = {
        ...orderDetailsFromLocalStorage,
        orderId: orderId,
        orderStatus: "Success",
        estimatedDelivery: generateRandomDeliveryDate(),
      };

      setOrderData(orderDataWithOrderId);
    }
  };

  const generateRandomOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const generateRandomDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(
      currentDate.setDate(
        currentDate.getDate() + Math.floor(Math.random() * 7) + 1
      )
    );
    return deliveryDate.toDateString();
  };

  return (
    <div className="my-orders-container">
      {userData ? (
        <>
          <h1>Welcome, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          <p>Mobile: {orderData.mobile}</p>
          <div className="itemdetails">
            <h2>Your Order Details</h2>
            <div className="status">
              <p>Order ID: {orderData.orderId}</p>
              <p>Estimated Delivery: {orderData.estimatedDelivery}</p>
              <p>
                Order Status:{" "}
                {orderData.orderStatus === "Success" ? " Success🟢" : "🔴"}
              </p>
            </div>
            {orderData.cartItems.map((item, index) => (
              <div className="products" key={index}>
                <div className="product-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="detaling">
                  <p>Product: {item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
            <div className="end">
              <p>
                Total: ${orderData.total}
                <span
                  className="show-details"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? " ▲ Hide Details" : " ▼ Show Details"}
                </span>
              </p>
              {showDetails && (
                <>
                  <p>Item Price: ${orderData.subtotal}</p>
                  <p>Tax: ${orderData.tax}</p>
                  <p>Delivery Charge: ${orderData.deliveryCharge}</p>
                </>
              )}
              <p>Payment Mode: {orderData.paymentOption}</p>
              <p>Delivery Address: {orderData.address}</p>
              <p>Street Address: {orderData.street}</p>
              <p>Estimated Delivery: {orderData.estimatedDelivery}</p>
              <p>Order Status: {orderData.orderStatus}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Please log in firstly</p>
      )}
    </div>
  );
};

export default MyOrders;
