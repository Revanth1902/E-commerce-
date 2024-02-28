import "./App.css";
import Details from "./Components/productdetailscomponent/details";
import Navbar from "./Navbar";
import Aboutus from "./aboutus";
import Cart from "./cart";

import ProductList from "./products";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Terms from "./terms";
import Login from "./login";
import Checkout from "./checkout";
import Profile from "./Components/productdetailscomponent/profile";
import OrderHistory from "./Components/productdetailscomponent/myorders";
import UserProfile from "./Components/productdetailscomponent/profile";
import WishlistPage from "./wishlist";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/myorders" Component={OrderHistory} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route exact path="/" Component={ProductList} />
          <Route path="/cart" Component={Cart} />
          <Route path="/login" Component={Login} />
          <Route path="/profile" Component={UserProfile} />
          <Route path="/productdetails/:id" Component={Details} />
          <Route path="/aboutus" Component={Aboutus} />
          <Route path="/checkout" Component={Checkout} />
          <Route path="/nav" Component={Navbar} />
          <Route path="/terms" Component={Terms} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
