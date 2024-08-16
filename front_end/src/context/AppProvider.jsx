import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "../api/axios";

import React from "react";

const AppProvider = (props) => {
  const student = JSON.parse(localStorage.getItem("student"));
  const [products, setProducts] = useState([]); // for array of products
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [watchlist, setWatchList] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      const api = await axios.get("/item", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(api.data);
      setProducts(api.data);
      // setfilteredData(api.data);
      // setloading(false);
    };

    // Cart like all aniket
    const fetchCart = async () => {
      const api = await axios.get(`/cart/student/${student.student_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data);
      localStorage.setItem("cart", JSON.stringify(api.data));
    };

    const fetchWishlist = async () => {
      const api = await axios.get(`/watchlist/student/${student.student_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data);
      localStorage.setItem("watchlist", JSON.stringify(api.data));
    };

    const profile = () => {
      const studentSTRING = localStorage.getItem("student");
      const studentData = JSON.parse(studentSTRING);
      setUser(studentData);
    };

    fetchAllProduct();
    fetchCart();
    fetchWishlist();
    profile();
  }, []);

  const logout = () => {
    localStorage.removeItem("student");
  };

  const editProuduct = async (
    title,
    description,
    price,
    image,
    item_duration,
    status,
    seller_id,
    cart_id,
    category_id,
    watchlist_id
  ) => {
    const api = await axios.put(
      "/item/${id}",
      {
        title,
        description,
        price,
        image,
        item_duration,
        status,
        seller_id: student.student_id,
        cart_id,
        category_id,
        watchlist_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Update item ", api.data);
    return api.data;
  };

  const deleteProduct = async (id) => {
    const api = await axios.delete("/item/${id}", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Delet item ", api.data);
    return api.data;
  };

  const removeFromCart = async (id) => {
    console.log("productId", id);
    const api = await axios.delete(`/item/`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Remove from cart / inventory ", api.data);
    return api.data;
  };
};

export default AppProvider;
