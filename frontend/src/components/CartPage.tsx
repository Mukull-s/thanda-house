import React, { useEffect, useState } from 'react';
import { cartAPI } from '../services/api';
import { Search, ShoppingBag } from 'lucide-react';
import '../styles/CartPage.css';
import bottleImg from '../assets/bottle.png';
import canImg from '../assets/Single can.png';
import Navbar from './Navbar';

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

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await cartAPI.getCart();
        setCartItems(res.data.cartItems || []);
      } catch (err: any) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleUpdateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      setLoading(true);
      await cartAPI.updateCartItem(productId, newQty);
      const res = await cartAPI.getCart();
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      setError('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      setLoading(true);
      await cartAPI.removeFromCart(itemId);
      const res = await cartAPI.getCart();
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      setError('Failed to remove item');
    } finally {
      setLoading(false);
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
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div style={{ color: 'red' }}>{error}</div>
            ) : cartItems.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item.product.image?.url} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.product.name}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-qty-row">
                        <span className="cart-item-label">Quantity</span>
                        <button className="cart-qty-btn" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} disabled={loading || item.quantity <= 1}>-</button>
                        <span className="cart-qty">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} disabled={loading}>+</button>
                      </div>
                      <div className="cart-item-price-row">
                        <span className="cart-item-label">Price</span>
                        <span className="cart-item-price">${item.product.price}</span>
                      </div>
                      <button className="cart-item-remove" onClick={() => handleRemoveItem(item._id)} disabled={loading}>Remove</button>
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
              <span>subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="order-summary-row">
              <span>Tax (5%)</span>
              <span>${tax}</span>
            </div>
            <div className="order-summary-row order-summary-total">
              <span>Total :</span>
              <span>${total}</span>
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
