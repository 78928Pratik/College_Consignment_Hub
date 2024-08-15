import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';
import '../styles/Navbar.css';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filterByCategory = (category) => {
    const filteredItems = items.filter((product) => product.category === category);
    setData(filteredItems);
  };

  const filterByPrice = (price) => {
    const filteredItems = items.filter((product) => product.price >= price);
    setData(filteredItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/home" className="brand">CCHub Logo</Link>
        
        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Products"
          />
          <button type="submit">Search</button>
        </form>
        
        <Link to="/cart" className="cart">
          <button className="btn-cart">
            <BsFillCartCheckFill />
            <span className="badge">{cart.length}</span>
          </button>
        </Link>
        <Link to="/home" className=""><button>Sell Item</button></Link> &nbsp; &nbsp;
        <Link to="/home" className=""><button>Profile</button></Link>

      </div>

      {location.pathname === '/home' && (
        <div className="filter-menu">
          <button onClick={() => setData(items)}>No Filter</button>
          <button onClick={() => filterByCategory('mobiles')}>Mobiles</button>
          <button onClick={() => filterByCategory('laptops')}>Laptops</button>
          <button onClick={() => filterByCategory('tablets')}>Tablets</button>
          <button onClick={() => filterByCategory('chair')}>Chair</button>
          <button onClick={() => filterByPrice(29999)}>{">="}29999</button>
          <button onClick={() => filterByPrice(49999)}>{">="}49999</button>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;