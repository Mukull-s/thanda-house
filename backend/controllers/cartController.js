const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { AppError } = require('../utils/errorHandler');
const mongoose = require('mongoose');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    console.log('Getting cart for user:', req.firebaseUser.uid);
    const cart = await Cart.findOne({ user: req.firebaseUser.uid })
      .populate('items.product');

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          totalPrice: 0
        }
      });
    }

    // Calculate total price from populated products
    const totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * (item.product?.price || 0));
    }, 0);

    res.json({
      success: true,
      data: {
        items: cart.items,
        totalPrice
      }
    });
  } catch (error) {
    console.error('Error in getCart:', error);
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    console.log('Add to cart request body:', req.body);
    console.log('Firebase user:', req.firebaseUser);
    
    if (!req.firebaseUser || !req.firebaseUser.uid) {
      throw new AppError('User not authenticated', 401);
    }

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      throw new AppError('Product ID and quantity are required', 400);
    }

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error('Invalid product ID format:', productId);
      throw new AppError('Invalid product ID format', 400);
    }
    
    // Convert quantity to number
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      throw new AppError('Invalid quantity', 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found with ID:', productId);
      throw new AppError('Product not found', 404);
    }

    let cart = await Cart.findOne({ user: req.firebaseUser.uid });
    if (!cart) {
      console.log('Creating new cart for user:', req.firebaseUser.uid);
      cart = await Cart.create({
        user: req.firebaseUser.uid,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantityNum;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantityNum
      });
    }

    await cart.save();
    await cart.populate('items.product');
    
    // Calculate total price from populated products
    const totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * (item.product?.price || 0));
    }, 0);

    res.status(201).json({
      success: true,
      data: {
        items: cart.items,
        totalPrice
      }
    });
  } catch (error) {
    console.error('Error in addToCart:', error);
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.firebaseUser.uid });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      throw new AppError('Item not found in cart', 404);
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    // Calculate total price from populated products
    const totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * (item.product?.price || 0));
    }, 0);
    res.json({
      success: true,
      data: {
        items: cart.items,
        totalPrice
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.firebaseUser.uid });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    await cart.save();
    await cart.populate('items.product');
    // Calculate total price from populated products
    const totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * (item.product?.price || 0));
    }, 0);
    res.json({
      success: true,
      data: {
        items: cart.items,
        totalPrice
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.firebaseUser.uid });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }
    cart.items = [];
    await cart.save();
    res.json({
      success: true,
      data: {
        items: [],
        totalPrice: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}; 