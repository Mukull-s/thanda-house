import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import '../styles/Home.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="nav-link">Home</a>
        <a href="/shop" className="nav-link">Shop</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact us</a>
      </div>
      <div className="navbar-center">
        <img src="/logo.png" alt="Thanda House Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <Search className="nav-icon" />
        <ShoppingBag className="nav-icon" />
        <button className="get-thanda-btn">Get Thanda</button>
        <a href="#" className="nav-link login-link">Signup/Login</a>
      </div>
    </nav>
  );
};

export default Navbar; 