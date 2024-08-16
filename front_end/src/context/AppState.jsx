import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "../api/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//later i will segricate it aniket
const AppState = (props) => {
  const [products, setProducts] = useState([]); // for array of products
  const [user, setUser] = useState({}); // for single user
  // const [isAuthenticate, setIsAuthenticate] = useState(false); // he bagu nantar aniket
  const [cart, setCart] = useState([]); // for cart state aniket
  const [watchlist, setWatchList] = useState([]); // watchList
  const [filteredData, setfilteredData] = useState([]); // fileted data

  //otp generator

  // const [userOrder, setUserOrder] = useState([]);
  // const [allOrder, setAllOrder] = useState([]);
  // const [reload, setReload] = useState(false);
  // const [loading, setloading] = useState(true);
  // const [allUsers, setAllUsers] = useState([]);

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
      setfilteredData(api.data);
      // setloading(false);
    };
    fetchAllProduct();
    fetchCart();
    profile();
  
  }, []);

  
  const studentLogin = async () => {
    try {
      //    const response = await axios.post("/login", 
      //           JSON.stringify({ email: email, password: password }), // Correct field name here
      //           {
      //               headers: { 'Content-Type': 'application/json' },
      //               withCredentials: true
      //           }
      //       );
     
      // const studentData = response.data;
      // localStorage.setItem("student", JSON.stringify(studentData)); // Save StudentDTO to local storage

      const studentSTRING = localStorage.getItem("student");
const studentData=JSON.parse(studentSTRING);
      setUser(studentData);
   

  const profile = async () => {
    const api = await axios.get(`/students/:id`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("User Profile", api.data);
    setUser(api.data);
  };

  // const addProduct = async (
  //   title,
  //   description,
  //   price,
  //   image,
  //   item_duration,
  //   status,
  //   seller_id,
  //   cart_id,
  //   category_id,
  //   watchlist_id
  // ) => {
  //   const api = await axios.post(
  //     `${url}/item`,
  //     {
  //       title,
  //       description,
  //       price,
  //       image,
  //       item_duration,
  //       status,
  //       seller_id,
  //       cart_id,
  //       category_id,
  //       watchlist_id,
  //     },
  //     { headers: { "Content-Type": "application/json" }, withCredentials: true }
  //   );
 
  //   toast.success(api.data.message, {
  //     position: "top-right",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     transition: Bounce,
  //   });
  //   return api.data;
  // };

  // Update Item
  const editProuduct = async (
    id,
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
      `${url}/item/${id}`,
      {
        title,
        description,
        price,
        image,
        item_duration,
        status,
        seller_id,
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
 
   
    return api.data;
  };

  // delete Product
  const deleteProduct = async (id) => {
    const api = await axios.delete(`${url}/item/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
   
    return api.data;
  };


    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
};
