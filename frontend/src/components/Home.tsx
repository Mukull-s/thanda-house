import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact us</Link>
        </div>
        <div className="navbar-center">
          <img src="/logo.png" alt="Thanda House Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <Search className="icon" />
          <ShoppingBag className="icon" />
          <button className="get-thanda-button">Get Thanda</button>
        </div>
      </nav>
      {/* Add your home page content here */}
    </div>
  );
};

export default Home;
