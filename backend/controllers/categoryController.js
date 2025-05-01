const Category = require('../models/Category');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const { featured, active, parent } = req.query;
    
    // Build query
    const query = {};
    if (featured) query.featured = featured === 'true';
    if (active) query.isActive = active === 'true';
    if (parent) query.parentCategory = parent;

    const categories = await Category.find(query)
      .sort({ displayOrder: 1, name: 1 })
      .populate('parentCategory', 'name');

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parentCategory', 'name')
      .populate('products', 'name price image');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'thanda-house/categories',
      resource_type: 'auto'
    });

    const category = await Category.create({
      ...req.body,
      image: {
        public_id: result.public_id,
        url: result.url,
        secure_url: result.secure_url
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // If new image is provided, upload to Cloudinary and delete old one
    if (req.body.image) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(category.image.public_id);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'thanda-house/categories',
        resource_type: 'auto'
      });

      req.body.image = {
        public_id: result.public_id,
        url: result.url,
        secure_url: result.secure_url
      };
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has products
    const products = await Product.find({ category: category._id });
    if (products.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with products',
        productsCount: products.length
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(category.image.public_id);

    await category.remove();
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get category products
// @route   GET /api/categories/:id/products
// @access  Public
const getCategoryProducts = async (req, res) => {
  try {
    const { sort, limit = 10, page = 1 } = req.query;
    
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Build sort
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }

    const products = await Product.find({ category: category._id })
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments({ category: category._id });

    res.status(200).json({
      category: category.name,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products
    });
  } catch (error) {
    console.error('Error getting category products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts
}; 