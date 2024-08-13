import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ cart, setCart }) => {
  const handleRemove = (id) => {
    setCart(cart.filter(product => product.id !== id));
  };

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <Link to="/home" className="btn btn-continue">Continue Shopping...</Link>
        </div>
      ) : (
        cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <img src={product.imgSrc} alt={product.title} />
            <div className="cart-details">
              <h5>{product.title}</h5>
              <p>{product.description}</p>
              <div className="button-group">
                <button onClick={() => handleRemove(product.id)} className="btn btn-remove">Remove</button>
                <button className="btn btn-buy">Contact Now</button>
              </div>
            </div>
          </div>
        ))
      )}
      {cart.length !== 0 && (
        <div className="checkout">
          <button className="btn btn-checkout">Checkout</button>
          <button onClick={() => setCart([])} className="btn btn-clear">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
