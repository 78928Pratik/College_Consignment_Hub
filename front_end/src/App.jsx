import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Login from './components/Login';
import Register from './components/Register';
import { items } from './components/Data';
import AddItem from "./components/AddItem"
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [cart, setCart] = useState([]); // Nantar context api use kael good practice
  const [data, setData] = useState(items); // nantar aniket hyatun Context api db data bheten 
  
  const location = useLocation();
  
  const showNavbar = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {/* <ToastContainer /> */}
      {showNavbar && <Navbar setData={setData} cart={cart} />}
      <Routes>
        <Route path="/home" element={<Product items={data} cart={cart} setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/sellitem" element={<AddItem/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <ToastContainer />
    <App />
  </Router>
);

export default AppWrapper;
