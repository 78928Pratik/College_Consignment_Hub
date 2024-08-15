import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ADD_PRODUCT_URL = '/item'; // Update URL according to your backend

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    image: "",
    item_duration: "",
    status:"",
    cart_id:"",
    

  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post(ADD_PRODUCT_URL, product);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (productData.category === "--Select Category--" || productData.category === "") {
      alert("Please Select Category");
    } else {
      const { title, description, price, category, imgSrc, qty } = productData;
      const product = { title, description, price, category, imgSrc, qty };

      try {
        const result = await addProduct(product);
        alert(result.message); // Adjust based on your response
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } catch (error) {
        alert("Failed to add product");
      }
    }
  };

  return (
    <div className="container my-5 p-4" style={{ width: "580px", border: "1px solid yellow", borderRadius: "10px" }}>
      <h1 className="text-center">Add Product</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            name="title"
            value={productData.title}
            onChange={onChangeHandler}
            type="text"
            className="form-control bg-dark text-light"
            id="title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={onChangeHandler}
            className="form-control bg-dark text-light"
            id="description"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            name="price"
            value={productData.price}
            onChange={onChangeHandler}
            type="number"
            className="form-control bg-dark text-light"
            id="price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select bg-dark text-light"
            name="category"
            value={productData.category}
            onChange={onChangeHandler}
            id="category"
            required
          >
            <option>--Select Category--</option>
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Tablets</option>
            <option>Cameras</option>
            <option>Headphones</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="imgSrc" className="form-label">Image URL</label>
          <input
            name="imgSrc"
            value={productData.imgSrc}
            onChange={onChangeHandler}
            type="text"
            className="form-control bg-dark text-light"
            id="imgSrc"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">Quantity</label>
          <input
            name="qty"
            value={productData.qty}
            onChange={onChangeHandler}
            type="number"
            className="form-control bg-dark text-light"
            id="qty"
            required
          />
        </div>
        <div className="d-grid col-6 my-5 mx-auto">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
