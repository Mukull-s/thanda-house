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
      <img src={primaryImage} alt={product.name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        {/* You can add more details like description or a button here */}
        {/* <p className="product-card-description">{product.description.substring(0, 60)}...</p> */}
        {/* <button className="product-card-btn">Add to Cart</button> */}
      </div>
    </div>
  );
};

export default ProductCard; 