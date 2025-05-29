import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/Home.css';
import { getAllProducts, Product } from '../services/productService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchActive(false);
        setShowSearchDropdown(false);
      }
    }
    if (dropdownOpen || showSearchDropdown || searchActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, showSearchDropdown, searchActive]);

  // Debounced search
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    setSearchLoading(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await getAllProducts(1, 10, { name: searchTerm });
        setSearchResults(res.products);
        setShowSearchDropdown(true);
      } catch (err) {
        setSearchResults([]);
        setShowSearchDropdown(false);
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <nav className="navbar" style={{ fontFamily: 'Satoshi, sans-serif' }}>
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
        <div className="navbar-search-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {!searchActive && (
            <Search className="nav-icon" style={{ cursor: 'pointer' }} onClick={() => { setSearchActive(true); setTimeout(() => searchInputRef.current?.focus(), 100); }} />
          )}
          {searchActive && (
            <input
              ref={searchInputRef}
              className="navbar-search-input"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowSearchDropdown(true)}
              style={{
                paddingLeft: 32,
                borderRadius: 18,
                border: '1px solid #ddd',
                height: 38,
                width: 220,
                background: 'var(--navbar-bg, #fff)',
                fontFamily: 'Satoshi, sans-serif',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            />
          )}
          {searchActive && (
            <Search className="nav-icon" style={{ position: 'absolute', left: 8, top: 8, pointerEvents: 'none', color: '#888' }} />
          )}
          {showSearchDropdown && searchActive && (
            <div className="navbar-search-dropdown" style={{ position: 'absolute', top: 44, left: 0, width: 280, background: '#fff', border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 100, fontFamily: 'Satoshi, sans-serif' }}>
              {searchLoading ? (
                <div style={{ padding: 12 }}>Searching...</div>
              ) : searchResults.length === 0 ? (
                <div style={{ padding: 12, color: '#888' }}>No products found</div>
              ) : (
                searchResults.map(product => (
                  <div
                    key={product._id}
                    className="navbar-search-result"
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #f3f3f3', transition: 'background 0.15s', minHeight: 48 }}
                    onMouseDown={() => {
                      navigate(`/shop/${product._id}`);
                      setShowSearchDropdown(false);
                      setSearchTerm('');
                      setSearchActive(false);
                    }}
                  >
                    <img src={product.image?.url} alt={product.name} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, background: '#f7f7f7', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>{product.name}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <ShoppingBag className="nav-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }} />
        <button className="get-thanda-btn" onClick={() => navigate('/shop')}>Get Thanda</button>
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