import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <Link 
        to="/cart" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default Home;
