const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// Public routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Protected routes
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin routes
router.get('/', protect, isAdmin, getOrders);
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router; 