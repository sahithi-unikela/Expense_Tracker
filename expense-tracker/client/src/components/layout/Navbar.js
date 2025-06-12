import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  
  const onLogout = () => {
    logout();
  };
  
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/add-expense">Add Expense</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <a href="#!" onClick={onLogout}>Logout</a>
      </li>
    </ul>
  );
  
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-money-bill-wave"></i> Expense Tracker
        </Link>
      </h1>
      <div className="navbar-menu">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
