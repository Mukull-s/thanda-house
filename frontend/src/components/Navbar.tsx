import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/Home.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

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
        <ShoppingBag className="nav-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }} />
        <button className="get-thanda-btn">Get Thanda</button>
        {user ? (
          <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
            <User
              className="nav-icon"
              style={{ marginLeft: 12, cursor: 'pointer' }}
              onClick={() => setDropdownOpen((open) => !open)}
            />
            {dropdownOpen && (
              <div className="user-dropdown" style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', borderRadius: 8, zIndex: 100, minWidth: 120 }}>
                <button
                  style={{ width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 16 }}
                  onClick={async () => {
                    await signOutUser();
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <span
            className="nav-link login-link"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Signup/Login
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 