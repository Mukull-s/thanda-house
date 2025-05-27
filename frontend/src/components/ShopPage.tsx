import React, { useEffect, useState } from 'react';
import { Product, getAllProducts } from '../services/productService';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import '../styles/ShopPage.css';

const ShopPage: React.FC = () => {
  console.log('ShopPage component has rendered!'); // Debug log
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const limit = 10; // Products per page, can be made dynamic

  useEffect(() => {
    const fetchProducts = async (pageToFetch: number) => {
      try {
        setLoading(true);
        const response = await getAllProducts(pageToFetch, limit);
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setCurrentPage(Number(response.currentPage));
        setTotalProducts(response.count);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]); // Refetch when currentPage changes

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <div className="shop-page-message">Loading products...</div>;
  }

  if (error) {
    return <div className="shop-page-message error">{error}</div>;
  }

  if (totalProducts === 0 && !loading && !error) {
    return <div className="shop-page-message">No products found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="shop-page-container">
        <h1 className="shop-page-title">Our Products</h1>
        <p className="description">Discover a world of refreshing flavors, crafted to chill, perfect for every mood and moment."Let me know if you want a more playful, premium, or bold tone!</p>
        {/* Add filtering/sorting controls here if desired */}
        <div className="product-grid">
          {Array.isArray(products) && products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopPage; 