import React from "react";

const Navbar = () => {
  return (
    <nav>
      <img className="logo" src="/ROLLOGO.png" alt="ROL Logo" />
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
      </ul>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search" />
        <button className="search-btn">Search</button>
      </div>
    </nav>
  );
};
export default Navbar;
