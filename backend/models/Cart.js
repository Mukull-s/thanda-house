const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        default: 1
    }
});

const cartSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            default: 0
        },
        totalItems: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Calculate total price and total items before saving
cartSchema.pre('save', function(next) {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    next();
});

module.exports = mongoose.model('Cart', cartSchema); 