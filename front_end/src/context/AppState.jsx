import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//later i will segricate it aniket
const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(" ");
  const [user, setUser] = useState({});
  const [filteredData, setfilteredData] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchAllProduct = async () => {
      const api = await axios.get(`${url}/item`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(api.data);
      setProducts(api.data);
      setfilteredData(api.data);
      setloading(false);
    };
    fetchAllProduct();
   // fetchCart();
    profile();
    //getUserOrder();
   // AllOrders();
   // AllUser();
  }, [reload]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      setIsAuthenticate(true);
      setReload(!reload);
    } else {
      setIsAuthenticate(false);
    }
    // console.log('token',localStorageToken)
  }, [token, isAuthenticate]);

  //This will be for register mi he already kele ahey axios api folder madhey

  const register = async(student_name, username, email, password, address)=>{
    const api =await axios.post(
`${url}/addstudent`,
{student_name, username, email, password, address},{
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
}
    );
    setReload(!reload);

    
    toast.success(api.data.message, {
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
  
      return api.data;
    };



    //logout

    const logout =()=>{
        toast.success("LogOut Successfully...!", {
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
          setReload(!reload);
          localStorage.removeItem("token");
          setIsAuthenticate(false);
          setToken("");

    };

    const profile =async()=>{
        const api=await axios.get(`${url}/students/:id`,{
            headers : {
                "Content-Type" : "application/json",
                Auth : token,

            },
            withCredentials : true,
        });

            console.log("User Profile",api.data);
            setUser(api.data);

    } ;


const addProduct=async (
    title,
    description,
    price,
    image,
    item_duration,
    status ,
   seller_id,
	cart_id,
	category_id,
	watchlist_id
    
)=>{
  const api = await axios.post(
    `${url}/item`,
    {
      title,
      description,
      price,
      image,
      item_duration,
     status ,
     seller_id,
     cart_id,
     category_id,
     watchlist_id
    },{headers :{ "Content-Type" : "application/json",},
  withCredentials:true,}
  );
  setReload (!reload);
  toast.success(api.data.message, {
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
  return api.data;
};

// Update Item
const editProuduct = async (
  id,
  title,
  description,
  price,
  image,
  item_duration,
 status ,
 seller_id,
 cart_id,
 category_id,
 watchlist_id
) => {
  const api = await axios.put(
    `${url}/item/${id}`,
    { title, description, price, image,
      item_duration,
     status ,
     seller_id,
     cart_id,
     category_id,
     watchlist_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  setReload(!reload);
  toast.success(api.data.message, {
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
  setReload(!reload);
  toast.success(api.data.message, {
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
  return api.data;
};

 // add To Cart that is add products
//  const addToCart = async (productId, title, price, qty, imgSrc) => {
//   const api = await axios.post(
//     `${url}/cart/add`,
//     { productId, title, price, qty, imgSrc },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Auth: token,
//       },
//       withCredentials: true,
//     }
//   );
//   // console.log(api.data)
//   setReload(!reload);

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
//   // console.log(api.data.cart)
//   // return api.data;
// };

const studentLogin = async (email, password) => {
  try {
      const response = await axios.post(`${url}/students/login`, { email, password }, {
          headers: {
              "Content-Type": "application/json",
          },
          withCredentials: true,
      });

      const studentData = response.data;
      localStorage.setItem("student", JSON.stringify(studentData)); // Save StudentDTO to local storage
      setIsAuthenticate(true);
      setUser(studentData);
      
      toast.success("Student login successfully", {
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


  }

