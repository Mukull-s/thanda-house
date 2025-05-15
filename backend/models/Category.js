const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a category description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  image: {
    public_id: {
      type: String,
      required: [true, 'Please provide a Cloudinary public ID']
    },
    url: {
      type: String,
      required: [true, 'Please provide a Cloudinary URL']
    },
    secure_url: {
      type: String,
      required: [true, 'Please provide a Cloudinary secure URL']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  attributes: {
    temperature: {
      type: String,
      enum: ['hot', 'cold', 'both'],
      default: 'cold'
    },
    preparationTime: {
      type: Number, // in minutes
      default: 5
    },
    servingSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },
  nutritionalInfo: {
    calories: {
      type: Number,
      default: 0
    },
    sugar: {
      type: Number,
      default: 0
    },
    caffeine: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Create text index for search functionality
categorySchema.index({ name: 'text', description: 'text' });

// Virtual for getting all products in this category
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
});

module.exports = mongoose.model('Category', categorySchema); 