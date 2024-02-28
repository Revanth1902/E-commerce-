import React, { useState, useEffect } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { TailSpin, InfinitySpin } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [localData, setLocalData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlistColors, setWishlistColors] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();

      const localStorageData = JSON.parse(localStorage.getItem("cart"));

      const updatedWithCount = json.map((each) => ({
        ...each,
        count: 0,
      }));

      if (localStorageData !== null) {
        const updatedLocalStorage = updatedWithCount.map((each) => {
          const existingProduct = localStorageData.find(
            (item) => item.id === each.id
          );
          return existingProduct
            ? { ...each, count: existingProduct.count }
            : each;
        });

        setProducts(updatedLocalStorage);
      } else {
        setProducts(updatedWithCount);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addtoCart = (product) => {
    const userDataCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));

    if (!userDataCookie) {
      toast.error("Please login first!", {
        autoClose: 2000,
        onClose: () => {
          navigate("/login");
        },
      });
      return;
    }

    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].count = Math.min(
        10,
        existingCartItems[existingProductIndex].count + 1
      );
    } else {
      existingCartItems.push({ ...product, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCartItems));

    getProducts();
  };

  const updateCart = (productId, operation) => {
    const localData = JSON.parse(localStorage.getItem("cart"));
    const updatedProducts = localData.map((product) =>
      product.id === productId
        ? product.count === 1 && operation === -1
          ? null
          : {
              ...product,
              count: Math.min(10, Math.max(0, product.count + operation)),
            }
        : product
    );

    const updatedFilter = updatedProducts.filter((each) => each !== null);

    localStorage.setItem("cart", JSON.stringify(updatedFilter));
    getProducts();
  };
  const addToWishlist = async (productId) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = isItemInWishlist(productId);

    const userDataCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));

    if (!userDataCookie) {
      toast.error("Please log in first!", {
        autoClose: 2000,
        // Redirect to login page logic
        onClose: () => {
          navigate("/login");
        },
      });
      return;
    }

    if (isAlreadyInWishlist) {
      const updatedWishlist = wishlist.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.info("Item removed from Wishlist");
      setWishlistColors((prevColors) => ({
        ...prevColors,
        [productId]: undefined,
      }));
    } else {
      try {
        // Fetch product details from Fake Store API
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const productDetails = await response.json();

        // Add item to wishlist logic
        const updatedWishlist = [...wishlist, productDetails];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.success("Item added to Wishlist successfully");
        setWishlistColors((prevColors) => ({
          ...prevColors,
          [productId]: "#ff4081",
        }));
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Error adding item to Wishlist");
      }
    }
  };
  useEffect(() => {
    return () => setWishlistColors({});
  }, []);
  const isItemInWishlist = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((product) => product.id === productId);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const carousel = [
    { id: 1, content: "/SLIDEIMAGE1.jpg" },
    { id: 2, content: "/SLIDEIMAGE2.jpg" },
    { id: 3, content: "/SLIDEIMAGE3.jpg" },
  ];

  return (
    <>
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
        theme="colored"
      />
      <div className="bodys">
        <nav>
          <img className="logo" src="/ROLLOGO.png" alt="ROL Logo" />
          <ul className="nav-links">
            <li className="WTF">
              <a href="/">Home</a>
            </li>
            <li className="WTF">
              <a href="/myorders">My Orders</a>
            </li>
            <li className="WTF">
              <a href="/cart">Cart</a>
            </li>
            <li className="WTF">
              <a href="/profile">My Profile</a>
            </li>
            <li className="WTF">
              <a href="/wishlist">Wishlist</a>
            </li>
          </ul>
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
        </nav>
        <div className="carousel-container">
          <Slider {...settings}>
            {carousel.map((slide) => (
              <div key={slide.id} className="carousel-slide">
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={slide.content}
                  alt={`Slide ${slide.id}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="products-con">
          <ul className="main">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="ttle" key={product.id}>
                  <div className="title">
                    <div className="imagein">
                      <Link
                        to={`/productdetails/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          className="images"
                          src={product.image}
                          alt={product.title}
                        />
                      </Link>
                      <div
                        id={`wishlist-icon-${product.id}`}
                        className="wishlist-icon"
                        onClick={() => addToWishlist(product.id)}
                        style={{
                          color: isItemInWishlist(product.id)
                            ? "#ff4081"
                            : "#808080",
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                    </div>
                    <div className="forstyle">
                      <h3>{product.title}</h3>
                      <strong>${product.price}</strong>
                      <div className="btn">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/productdetails/${product.id}`}
                        >
                          <button className="buttons"> Product Details</button>
                        </Link>

                        {product.count === 0 ? (
                          <button
                            className="buttons2"
                            onClick={() => addtoCart(product)}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="all-buttons">
                            {" "}
                            <button onClick={() => updateCart(product.id, -1)}>
                              -
                            </button>{" "}
                            <p>{product.count}</p>{" "}
                            <button onClick={() => updateCart(product.id, 1)}>
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedProduct === product.id && (
                    <div>
                      <p>Details for {product.title}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Your JSX
              <p className="no-products">
                Sorry ! No products available at this Moment{" "}
                <span role="img" aria-label="Sad face">
                  😢
                </span>
              </p>
            )}
          </ul>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <h1 className="logo">
              <img src="/ROLLOGO.png" alt="ROL Logo" />
            </h1>
            <div className="footer-section about">
              <p id="parag" style={{ color: "#ffff", marginLeft: "0" }}>
                At ROL, our mission is to provide you with a seamless and
                delightful shopping experience. We strive to offer a vast
                selection of high-quality products, ensuring that you find
                everything you need in one place. Our commitment to customer
                satisfaction is at the heart of everything we do.
              </p>
              <div className="contact">
                <span>
                  <i className="fas fa-phone"></i>8309196817
                </span>
                <span>
                  <i className="fas fa-envelope"></i> revanth19a@gmail.com
                </span>
              </div>
              <div className="socials">
                <a href="https://www.facebook.com/profile.php?id=100073876999943&mibextid=ZbWKwL">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com/i_am_revanth19?igsh=MXI1OHZmNGlxeHA4OA==">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://x.com/REVANTH19r?t=jf0NpF-AgrH6Db8xNWo5JA&s=09">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>

            <div className="footer-section links">
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/myorders">My Orders</a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
                <li>
                  <a href="/profile">My Profile</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} ROL. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProductList;
