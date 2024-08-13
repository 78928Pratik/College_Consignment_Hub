import React from 'react'
import Navbar from './Navbar'
import Product from './Product'

const Home = (setData ,cart , items , setCart) => {
  return (
    <>
    <Navbar setData={setData} cart={cart}/>
    <Product items={items} cart={cart} setCart={setCart}/>
    </>
  )
}

export default Home