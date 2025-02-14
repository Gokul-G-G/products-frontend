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
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.name} has been added to your cart!`);
  };

  // Handle removing products from cart
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
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
                <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
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
