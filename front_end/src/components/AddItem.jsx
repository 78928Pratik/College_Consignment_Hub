import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ADD_PRODUCT_URL = '/item';
const GET_CATEGORIES_URL = '/category';
const student = JSON.parse(localStorage.getItem("student"));

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    item_duration: "",
    status: "AVAILABLE",
    seller_id: student.student_id,
    cart_id: "",
    category_id: "",
    watchlist_id: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_CATEGORIES_URL);
        setCategories(response.data);

        const cartResponse = await axios.get(`/cart/student/${student.student_id}`);
        setProductData((prevData) => ({ ...prevData, cart_id: parseInt(cartResponse.data) }));

        const watchListResponse = await axios.get(`/watchlist/student/${student.student_id}`);
        setProductData((prevData) => ({ ...prevData, watchlist_id: parseInt(watchListResponse.data)}));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mycloud");
    data.append("cloud_name", "debpvptbi");

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/debpvptbi/image/upload', {
        method: "POST",
        body: data
      });
      const cloudData = await res.json();
      return cloudData.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
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

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    if (productData.category_id === "" || productData.category_id === "--Select Category--") {
      alert("Please select a category");
      return;
    }

    try {
      const imageUrl = await saveImage(); // Upload the image to Cloudinary
      const updatedProductData = { ...productData, image: imageUrl }; // Set the image URL to the productData
      await addProduct(updatedProductData); // Send the productData to the backend
    
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="container my-5 p-4" style={{ width: "580px", border: "1px solid yellow", borderRadius: "10px" }}>
      <h1 className="text-center">Add Product</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">Category</label>
          <select
            className="form-select"
            name="category_id"
            value={productData.category_id}
            onChange={onChangeHandler}
            id="category_id"
            required
          >
            <option value="">--Select Category--</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            name="title"
            value={productData.title}
            onChange={onChangeHandler}
            type="text"
            className="form-control"
            id="title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            name="description"
            value={productData.description}
            onChange={onChangeHandler}
            type="text"
            className="form-control"
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
            className="form-control"
            id="price"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="form-control"
            id="image"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="item_duration" className="form-label">Item Duration</label>
          <input
            name="item_duration"
            value={productData.item_duration}
            onChange={onChangeHandler}
            type="text"
            className="form-control"
            id="item_duration"
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
