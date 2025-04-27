const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [orderItemSchema],
        shippingInfo: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        },
        paymentInfo: {
            id: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            }
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing',
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
        },
        deliveredAt: Date
    },
    {
        timestamps: true
    }
);

// Calculate prices before saving
orderSchema.pre('save', function(next) {
    this.itemsPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.taxPrice = this.itemsPrice * 0.18; // 18% GST
    this.totalPrice = this.itemsPrice + this.taxPrice;
    next();
});

module.exports = mongoose.model('Order', orderSchema); 