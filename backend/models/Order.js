const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'upi'],
    default: 'cash'
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Calculate total price before saving
orderSchema.pre('save', async function(next) {
  if (!this.isModified('orderItems')) {
    return next();
  }

  // Calculate total price from order items
  this.totalPrice = this.orderItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  // Add tax (5% of total)
  this.taxPrice = Number((this.totalPrice * 0.05).toFixed(2));

  // Add shipping price (fixed for now)
  this.shippingPrice = 50;

  // Update total price with tax and shipping
  this.totalPrice = Number((this.totalPrice + this.taxPrice + this.shippingPrice).toFixed(2));

  next();
});

module.exports = mongoose.model('Order', orderSchema); 