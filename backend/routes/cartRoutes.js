const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const firebaseAuth = require('../middlewares/firebaseAuth');

// All routes require authentication
router.use(firebaseAuth);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/:productId', cartController.updateCartItem);
router.delete('/:productId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router; 