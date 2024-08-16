import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext"; // Import AppContext
import axios from "axios";
import { BsFillCartCheckFill } from "react-icons/bs";
import "../styles/Navbar.css";

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useContext(AppContext); // Get products from context
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filterByCategory = (categoryId) => {
    const filteredItems = products.filter(
      (product) => product.category_id === categoryId
    );
    setData(filteredItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing authentication tokens or redirecting
    localStorage.removeItem("student");
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/home" className="brand">
          CCHub Logo
        </Link>

        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Products"
          />
        </form>

        <Link to="/cart" className="cart">
          <button className="btn-cart">
            <BsFillCartCheckFill />
            <span className="badge">{cart.length}</span>
          </button>
        </Link>
        <Link to="/sellitem">
          <button className="btn-sell-item">Sell Item</button>
        </Link>
        <Link to="/profile">
          <button className="btn-user-profile">User Profile</button>
        </Link>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {location.pathname === "/home" && (
        <div className="filter-menu">
          <button onClick={() => setData(products)}>No Filter</button>
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => filterByCategory(category.category_id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
