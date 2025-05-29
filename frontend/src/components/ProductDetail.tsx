import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../services/productService';
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/ProductDetail.css';
import { cartAPI } from '../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const [addCartMsg, setAddCartMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log('Product data received:', response.data);
        if (response.data && response.data._id) {
          setProduct(response.data);
          setError(null);
        } else {
          setError('Invalid product data received');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBack = () => {
    navigate('/shop');
  };

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    if (!product._id) {
      setAddCartMsg('Invalid product ID');
      return;
    }
    setAddCartLoading(true);
    setAddCartMsg(null);
    try {
      console.log('Product being added to cart:', {
        id: product._id,
        name: product.name,
        quantity
      });
      const response = await cartAPI.addToCart(product._id, quantity);
      console.log('Add to cart response:', response);
      setAddCartMsg('Added to cart!');
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      setAddCartMsg(typeof err === 'string' ? err : (err?.message || 'Failed to add to cart'));
    } finally {
      setAddCartLoading(false);
    }
  };

  if (loading) return <div className="product-detail-loading">Loading...</div>;
  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return <div className="product-detail-error">Product not found.</div>;

  return (
    <>
      <Navbar />
      <button className="product-detail-back-btn" onClick={handleBack}>&larr; Back to Shop</button>
      <div className="product-detail-container">
        <div className="product-detail-image-section">
          <div className="product-detail-image-bg"></div>
          <img src={product.image.url} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-detail-info-section">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-meta">
            <div><strong>Category:</strong> {product.category}</div>
            <div><strong>Price:</strong> ₹{product.price.toFixed(2)}</div>
            <div><strong>Stock:</strong> {product.stock}</div>
            <div><strong>Rating:</strong> {product.rating ?? 0} / 5</div>
            <div><strong>Ingredients:</strong> {product.ingredients.join(', ')}</div>
            {product.allergens && product.allergens.length > 0 && (
              <div><strong>Allergens:</strong> {product.allergens.join(', ')}</div>
            )}
            <div><strong>Nutritional Info:</strong> {product.nutritionalInfo.calories} kcal, {product.nutritionalInfo.protein}g protein, {product.nutritionalInfo.carbs}g carbs, {product.nutritionalInfo.fat}g fat</div>
          </div>
          <div className="product-detail-quantity-row">
            <button className="product-detail-qty-btn" onClick={handleDecrease}>-</button>
            <span className="product-detail-qty-value">{quantity}</span>
            <button className="product-detail-qty-btn" onClick={handleIncrease}>+</button>
          </div>
          <button className="product-detail-addcart-btn" onClick={handleAddToCart} disabled={addCartLoading}>Add to Cart</button>
          {addCartMsg && <div style={{ marginTop: 8, color: addCartMsg === 'Added to cart!' ? 'green' : 'red' }}>{addCartMsg}</div>}
          <button className="product-detail-buy-btn">Buy Now</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail; 