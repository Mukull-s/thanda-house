const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { AppError } = require('../utils/errorHandler');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.firebaseUser.uid })
      .populate('items.product', 'name price image');

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          totalPrice: 0
        }
      });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: req.firebaseUser.uid });

    if (!cart) {
      cart = await Cart.create({
        user: req.firebaseUser.uid,
        items: []
      });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity
      });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    await cart.save();

    res.status(201).json({
      success: true,
      data: cart
    });
  } catch (error) {
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

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate total price
    const product = await Product.findById(productId);
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    await cart.save();

    res.json({
      success: true,
      data: cart
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

    // Recalculate total price
    const products = await Product.find({
      _id: { $in: cart.items.map(item => item.product) }
    });

    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = products.find(p => p._id.toString() === item.product.toString());
      return total + (item.quantity * product.price);
    }, 0);

    await cart.save();

    res.json({
      success: true,
      data: cart
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
    cart.totalPrice = 0;

    await cart.save();

    res.json({
      success: true,
      data: cart
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