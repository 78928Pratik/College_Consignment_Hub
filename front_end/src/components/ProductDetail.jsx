import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data'; //for now static later i willl replace aniket
import { Link } from 'react-router-dom';
import '../styles/ProductDetail.css';


const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    const productData = items.find(item => item.id === parseInt(id, 10));
    if (productData) {
      setProduct(productData);
    } else {
      console.error('Product not found');
    }
  }, [id]);

  const addToCart = () => {
    if (product) {
      if (cart.find(cartItem => cartItem.id === product.id)) {
        alert('Item already in cart');
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
      <img src={product.imgSrc} alt={product.title} />
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>Description : {product.description}</p>
        <p>Price :₹ {product.price} </p>
        <button className="btn btn-add" onClick={addToCart}>Add to Cart</button>
        <Link to="/home" className="btn btn-back">Continue Shopping...</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
