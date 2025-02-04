import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="banner">
      <div
        style={{ width: "60%", height: "90%" }}
        className="d-flex align-items-center justify-content-center flex-column">
        <h1>
          <span style={{ color: "#F34C24", fontSize: "1.2em" }}>W</span>elcome
          to Our E-Commerce Store
        </h1>
        <button
          className="btn btn-success"
          style={{ padding: "10px 30px" }}
          onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
