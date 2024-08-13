import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Product.css';

const Product = ({ items, cart, setCart }) => {
  const addToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      alert('Item already in cart');
    } else {
      setCart([...cart, product]);
    }
  };

  return (
    <div className="product-container">
      {items.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imgSrc} alt={product.title} />
          <div className="product-details">
            <h5>{product.title}</h5>
            <p>Price: {product.price} ₹</p>
            <div className="button-group">
              <Link to={`/product/${product.id}`} className="btn btn-view">View</Link>
              <button onClick={() => addToCart(product)} className="btn btn-add">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
