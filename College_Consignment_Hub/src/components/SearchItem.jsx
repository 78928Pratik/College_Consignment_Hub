import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import '../styles/SearchItem.css';

const SearchItem = ({ cart, setCart }) => { // ithe context api use karel
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filteredData = () => {
      const data = items.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilterData(data);
    };

    filteredData();
  }, [term]);

  return (
    <div className="search-results">
      <Product items={filterData} cart={cart} setCart={setCart} />
    </div>
  );
};

export default SearchItem;
