const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts
} = require('../controllers/categoryController');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/products', getCategoryProducts);

// Admin routes
router.post('/', protect, isAdmin, createCategory);
router.put('/:id', protect, isAdmin, updateCategory);
router.delete('/:id', protect, isAdmin, deleteCategory);

module.exports = router; 