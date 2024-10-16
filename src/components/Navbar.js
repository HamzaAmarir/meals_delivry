import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {

  const cartmeals = useSelector(state => state.meals.cart);
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to='/'><h1 className="navbar-brand">Delicious Eats</h1></Link>
          <Link to='/Cart'>< FaShoppingCart  className="cart-icon" /> ({cartmeals.length})</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
