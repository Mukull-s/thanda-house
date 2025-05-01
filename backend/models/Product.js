const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please provide a product category'],
        enum: {
            values: ['ice-cream', 'milkshake', 'smoothie', 'sundae', 'beverage'],
            message: 'Please select a valid category'
        }
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
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    numReviews: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot be more than 100']
    },
    ingredients: {
        type: [String],
        required: [true, 'Please provide ingredients']
    },
    allergens: {
        type: [String],
        default: []
    },
    nutritionalInfo: {
        calories: {
            type: Number,
            required: [true, 'Please provide calories']
        },
        protein: {
            type: Number,
            required: [true, 'Please provide protein content']
        },
        carbs: {
            type: Number,
            required: [true, 'Please provide carbs content']
        },
        fat: {
            type: Number,
            required: [true, 'Please provide fat content']
        }
    }
}, {
    timestamps: true
});

// Create text index for search functionality
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 