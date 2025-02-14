import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  // Load Cart from Local Storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save Cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle Login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Handle Adding to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // Clone previous cart to avoid mutating state directly
      let updatedCart = [...prevCart];

      // Check if product already exists in cart
      const existingProductIndex = updatedCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        // If product exists, increment quantity
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
      } else {
        // If product is new, add it to cart with quantity 1
        updatedCart.push({ ...product, quantity: 1 });
      }

      // Save updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });

    alert(`${product.name} has been added to your cart!`);
  };

  // Handle removing products from cart
  const handleRemoveFromCart = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };
  // Handle updating product quantity
  const handleUpdateQuantity = (_id, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      );

      // Save updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };


  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0 ">
          <div className="container-fluid">
            <ul className="navbar-nav me-auto p-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li>
                {!isAuthenticated ? (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                ) : (
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </li>
              {/* Conditionally render Cart Button */}
              {isAuthenticated && (
                <li className="nav-item justify-content-end">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Protected Route */}
          <Route
            path="/product"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Product onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/user" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart
                  cart={cart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
  function ProtectedRoute({ isAuthenticated, children }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
};

export default App;
