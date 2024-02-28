import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./wishlist.css";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (product) => {
    if (document.cookie.includes("userData")) {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex === -1) {
        const newCartItem = {
          id: product.id,
          count: 1,
          title: product.title,
          price: product.price,
          image: product.image,
        };

        existingCart.push(newCartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        toast.success("Item added successfully to the cart");
      } else {
        toast.warning("Item is already in the cart");
      }
    } else {
      navigate("/login");
      toast.error("Please login first!");
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    toast.error("Please login first!");
  };

  return (
    <div className="wishlist-page">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <div className="product-details">
                <h3 style={{ fontSize: "0.8rem" }}>{product.title}</h3>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.title}
                    onClick={() => handleViewProduct(product.id)}
                  />
                  <div className="btname">
                    <p>${product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="wishlist-actions">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="remove-icon"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!document.cookie.includes("userData") && (
        <div className="login-message">
          <p>Please login first to view your wishlist.</p>
          <button onClick={handleLoginRedirect}>Login</button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
