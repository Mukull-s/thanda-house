const express = require('express');
const router = express.Router();
const { registerUser, getUserProfile } = require('../controllers/userController');
const firebaseAuth = require('../middlewares/firebaseAuth');

// Public routes
router.post('/', firebaseAuth, registerUser);

// Protected routes
router.get('/profile', firebaseAuth, getUserProfile);

module.exports = router; 