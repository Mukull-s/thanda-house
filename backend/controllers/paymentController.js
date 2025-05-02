const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const { AppError } = require('../utils/errorHandler');

// @desc    Create payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'inr' } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Handle successful payment
// @route   POST /api/payment/webhook
// @access  Public
const handlePaymentWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      throw new AppError('Webhook signature verification failed', 400);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Update order status to paid
        await Order.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { 
            status: 'paid',
            paidAt: new Date()
          }
        );
        break;
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        // Update order status to failed
        await Order.findOneAndUpdate(
          { paymentIntentId: failedPaymentIntent.id },
          { status: 'failed' }
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment methods
// @route   GET /api/payment/methods
// @access  Private
const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: req.firebaseUser.uid,
      type: 'card',
    });

    res.json({
      success: true,
      data: paymentMethods.data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add payment method
// @route   POST /api/payment/methods
// @access  Private
const addPaymentMethod = async (req, res, next) => {
  try {
    const { paymentMethodId } = req.body;

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: req.firebaseUser.uid,
    });

    // Set as default payment method
    await stripe.customers.update(req.firebaseUser.uid, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    res.json({
      success: true,
      data: { message: 'Payment method added successfully' }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove payment method
// @route   DELETE /api/payment/methods/:id
// @access  Private
const removePaymentMethod = async (req, res, next) => {
  try {
    const { id } = req.params;

    await stripe.paymentMethods.detach(id);

    res.json({
      success: true,
      data: { message: 'Payment method removed successfully' }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentIntent,
  handlePaymentWebhook,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod
}; 