import React, { useEffect, useState, useRef } from 'react';
import { cartAPI } from '../services/api';
import { Search, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartPage.css';
import Navbar from './Navbar';
import { useUser } from '../UserContext';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: { url: string };
  };
  quantity: number;
  _id: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: { url: string };
  category: string;
}

const CartPage = () => {
  const navigate = useNavigate();
  const { loading: userLoading } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const debounceTimers = useRef<{ [productId: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (userLoading) return; // Wait for user state
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await cartAPI.getCart();
        setCartItems(res.data.data.items || []);
        setLocalCart(res.data.data.items || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userLoading]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?limit=5');
        setRecommendedProducts(response.data.products);
      } catch (err) {
        console.error('Failed to fetch recommended products:', err);
      }
    };
    fetchRecommendedProducts();
  }, []);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const subtotal = localCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const discount = couponApplied ? subtotal * 0.2 : 0; // 20% discount for BEER20
  const total = subtotal + tax - discount;

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty < 1) return;
    setLocalCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQty } : item
      )
    );
    if (debounceTimers.current[productId]) {
      clearTimeout(debounceTimers.current[productId]);
    }
    debounceTimers.current[productId] = setTimeout(async () => {
      setLoading(true);
      try {
        await cartAPI.updateCartItem(productId, newQty);
        const res = await cartAPI.getCart();
        setCartItems(res.data.data.items || []);
      } catch (err) {
        setError('Failed to update quantity');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      setLoading(true);
      await cartAPI.removeFromCart(productId);
      const res = await cartAPI.getCart();
      setCartItems(res.data.data.items || []);
    } catch (err) {
      setError('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await cartAPI.addToCart(productId, 1);
      const res = await cartAPI.getCart();
      setCartItems(res.data.data.items || []);
    } catch (err) {
      setError('Failed to add to cart');
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'BEER20') {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.2);
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  return (
    <div className="cart-page">
      <Navbar />

      {/* Main Content */}
      <main className="cart-main">
        <h1 className="cart-title">My Cart</h1>
        <div className="cart-content">
          <section className="cart-items">
            {userLoading || loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div style={{ color: 'red' }}>{error}</div>
            ) : localCart.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              localCart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img 
                    src={item.product.image?.url} 
                    alt={item.product.name} 
                    className="cart-item-img"
                    onClick={() => handleProductClick(item.product._id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="cart-item-details">
                    <div 
                      className="cart-item-name"
                      onClick={() => handleProductClick(item.product._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.product.name}
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-qty-row">
                        <span className="cart-item-label">Quantity</span>
                        <button 
                          className="cart-qty-btn" 
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)} 
                          disabled={loading || item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="cart-qty">{item.quantity}</span>
                        <button 
                          className="cart-qty-btn" 
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)} 
                          disabled={loading}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-price-row">
                        <span className="cart-item-label">Price</span>
                        <span className="cart-item-price">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <button 
                        className="cart-item-remove" 
                        onClick={() => handleRemoveItem(item.product._id)} 
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
          {/* Order Summary */}
          <aside className="order-summary">
            <div className="order-summary-title">Order Summary</div>
            <div className="order-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="order-summary-row">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {couponApplied && (
              <div className="order-summary-row" style={{ color: 'green' }}>
                <span>Discount (20%)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="order-summary-row order-summary-total">
              <span>Total :</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="order-summary-row">
              <span>Apply Coupon</span>
              <div className="coupon-input-group">
                <input 
                  className="order-summary-coupon" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button 
                  className="apply-coupon-btn"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                >
                  Apply
                </button>
              </div>
            </div>
            <button className="order-summary-checkout">Checkout Securely</button>
          </aside>
        </div>
        {/* You may also like */}
        <section className="cart-recommend">
          <div className="cart-recommend-title">You may also like</div>
          <div className="cart-recommend-list">
            {recommendedProducts.map((product) => (
              <div key={product._id} className="recommend-product-card">
                <img 
                  src={product.image.url} 
                  alt={product.name} 
                  className="recommend-product-img"
                  onClick={() => handleProductClick(product._id)}
                />
                <div className="recommend-product-info">
                  <h3>{product.name}</h3>
                  <p>₹{product.price.toFixed(2)}</p>
                  <button 
                    className="recommend-add-to-cart"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CartPage;
