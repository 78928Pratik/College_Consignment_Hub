import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../context/AppContext"; // Import AppContext
import "../styles/ProductDetail.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useContext(AppContext); // Get products from context

  useEffect(() => {
    // Find the product from the context's product list
    const productData = products.find(
      (item) => item.item_id === parseInt(id, 10)
    );
    if (productData) {
      setProduct(productData);
    } else {
      console.error("Product not found");
    }
  }, [id, products]); // Add products to dependency array to react to updates

  const addToCart = () => {
    if (product) {
      if (cart.find((cartItem) => cartItem.item_id === product.item_id)) {
        alert("Item already in cart");
      } else {
        setCart([...cart, product]);
      }
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>Status: {product.status}</p>
        <p>Description: {product.description}</p>
        <p>Price: ₹{product.price}</p>
        <button className="btn-add" onClick={addToCart}>
          Add to Wishlist
        </button>
        <Link to="/home" className="btn-back">
          Continue Shopping...
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
