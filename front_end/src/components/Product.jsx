import React, {useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/Product.css';

const Product = () => {
  const { products, cart, addToCart } = useContext(AppContext); // Use context here

  useEffect(() => {
    console.log("Product list updated", products);
  }, [products]);

  const handleAddToCart = (product) => {
    if (cart.find((item) => item.item_id === product.item_id)) {
      alert('Item already in cart');
    } else {
      addToCart(product); // Use the context method to add items to the cart
    }
  };

  return (
    <div className="product-container">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div className="product-card" key={product.item_id}>
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h5>{product.title}</h5>
              <p>Price: {product.price} ₹</p>
              <div className="button-group">
                <Link to={`/product/${product.item_id}`} className="btn btn-view">View</Link>
                <button onClick={() => handleAddToCart(product)} className="btn btn-add">Add to Wishlist</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
