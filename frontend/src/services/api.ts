import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      console.log('Unauthorized - redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API functions
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  register: (data: any) => api.post('/users', data),
};

// Cart API functions
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: async (productId: string, quantity: number = 1) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      console.log('Adding to cart:', { productId, quantity });
      const response = await api.post('/cart', { 
        productId: productId.toString(),
        quantity: Number(quantity)
      });
      console.log('Add to cart response:', response.data);
      return response;
    } catch (err: any) {
      console.error('Add to cart error:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        throw new Error('Please log in to add items to cart');
      }
      throw err.response?.data?.message || 'Failed to add to cart';
    }
  },
  updateCartItem: async (productId: string, quantity: number) => {
    try {
      return await api.put(`/cart/${productId}`, { quantity });
    } catch (err: any) {
      throw err.response?.data?.message || 'Failed to update cart item';
    }
  },
  removeFromCart: async (productId: string) => {
    try {
      return await api.delete(`/cart/${productId}`);
    } catch (err: any) {
      throw err.response?.data?.message || 'Failed to remove from cart';
    }
  },
  clearCart: async () => {
    try {
      return await api.delete('/cart');
    } catch (err: any) {
      throw err.response?.data?.message || 'Failed to clear cart';
    }
  },
};

export default api; 