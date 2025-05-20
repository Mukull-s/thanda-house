import React from 'react';
import { Product } from '../services/productService';
import '../styles/ProductCard.css';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryImage = product.image ? product.image.secure_url : '/placeholder.png';

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={primaryImage} alt={product.name} className="product-card-image" />
      </div>
      <div className="product-card-info">
        <div className="product-card-rating">
          {'★'.repeat(5)}
        </div>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-footer">
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          <div className="product-card-buttons">
            <button className="btn-cart" title="Add to Cart"></button>
            <button className="btn-share" title="Share">
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
