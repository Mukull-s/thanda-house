import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import '../styles/CartPage.css';
import bottleImg from '../assets/bottle.png';
import canImg from '../assets/Single can.png';

const CartPage = () => {
  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="navbar">
        {/* Left links */}
        <div className="navbar-left">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact us</a>
        </div>

        {/* Center logo */}
        <div className="navbar-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Right icons & buttons */}
        <div className="navbar-right">
          {/* Search icon */}
          <Search className="icon" />
          {/* Cart icon */}
          <ShoppingBag className="icon" />
          {/* Get Thanda button */}
          <button className="get-thanda-button">
            Get Thanda
          </button>
          {/* Signup/Login link */}
          <a href="#" className="nav-link">Signup/Login</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="cart-main">
        <h1 className="cart-title">My Cart</h1>
        <div className="cart-content">
          <section className="cart-items">
            {/* Cart Item 1 */}
            <div className="cart-item">
              <img src={bottleImg} alt="Thanda House Extreme Gold" className="cart-item-img" />
              <div className="cart-item-details">
                <div className="cart-item-name">Thanda House Extreme Gold</div>
                <div className="cart-item-info">
                  <div className="cart-item-qty-row">
                    <span className="cart-item-label">Quantity</span>
                    <button className="cart-qty-btn">-</button>
                    <span className="cart-qty">1</span>
                    <button className="cart-qty-btn">+</button>
                  </div>
                  <div className="cart-item-price-row">
                    <span className="cart-item-label">Price</span>
                    <span className="cart-item-price">$200</span>
                  </div>
                  <button className="cart-item-remove">Remove</button>
                </div>
              </div>
            </div>
            {/* Cart Item 2 */}
            <div className="cart-item">
              <img src={bottleImg} alt="Thanda House Extreme Black" className="cart-item-img" />
              <div className="cart-item-details">
                <div className="cart-item-name">Thanda House Extreme Black</div>
                <div className="cart-item-info">
                  <div className="cart-item-qty-row">
                    <span className="cart-item-label">Quantity</span>
                    <button className="cart-qty-btn">-</button>
                    <span className="cart-qty">1</span>
                    <button className="cart-qty-btn">+</button>
                  </div>
                  <div className="cart-item-price-row">
                    <span className="cart-item-label">Price</span>
                    <span className="cart-item-price">$400</span>
                  </div>
                  <button className="cart-item-remove">Remove</button>
                </div>
              </div>
            </div>
          </section>
          {/* Order Summary */}
          <aside className="order-summary">
            <div className="order-summary-title">Order Summary</div>
            <div className="order-summary-row">
              <span>subtotal</span>
              <span>$600</span>
            </div>
            <div className="order-summary-row">
              <span>Tax (5%)</span>
              <span>$30</span>
            </div>
            <div className="order-summary-row order-summary-total">
              <span>Total :</span>
              <span>$630</span>
            </div>
            <div className="order-summary-row">
              <span>Apply Coupon</span>
              <input className="order-summary-coupon" value="BEER20" readOnly />
            </div>
            <button className="order-summary-checkout">Checkout Securely</button>
          </aside>
        </div>
        {/* You may also like */}
        <section className="cart-recommend">
          <div className="cart-recommend-title">You may also like</div>
          <div className="cart-recommend-list">
            <img src={canImg} alt="Thanda House Premium Beer" className="cart-recommend-img" />
            <img src={canImg} alt="Thanda House Premium Beer" className="cart-recommend-img" />
            <img src={canImg} alt="Thanda House Premium Beer" className="cart-recommend-img" />
            <img src={canImg} alt="Thanda House Premium Beer" className="cart-recommend-img" />
            <img src={canImg} alt="Thanda House Premium Beer" className="cart-recommend-img" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default CartPage;
