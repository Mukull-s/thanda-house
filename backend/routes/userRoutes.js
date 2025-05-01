const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const { isAdmin } = require('../middlewares/authMiddleware');
const {
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById
} = require('../controllers/userController');

// Public routes
router.post('/', registerUser);

// Protected routes
router.get('/profile', firebaseAuth, getUserProfile);
router.put('/profile', firebaseAuth, updateUserProfile);

// Admin routes
router.get('/', firebaseAuth, isAdmin, getUsers);
router.get('/:id', firebaseAuth, isAdmin, getUserById);
router.put('/:id', firebaseAuth, isAdmin, updateUser);
router.delete('/:id', firebaseAuth, isAdmin, deleteUser);

module.exports = router; 