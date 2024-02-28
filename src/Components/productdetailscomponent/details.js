// Details.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
  const [newdata, setNewData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();

      if (!response.ok) {
        console.error("Network error");
      } else {
        setNewData(data);
      }
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  return (
    <div className="container">
      <h1>Product Details</h1>
      <img className="images" src={newdata.image} alt={newdata.title} />
      <div className="details-info">
        <div className="title">Title: {newdata.title}</div>
        <div>Description: {newdata.description}</div>
        <strong>Price: ${newdata.price}</strong>
      </div>
    </div>
  );
};

export default Details;
