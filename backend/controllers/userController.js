const User = require('../models/User');
const admin = require('../config/firebaseAdmin');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log('Registering user with data:', req.body);
    const { firebaseUid, email, name, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      firebaseUid,
      email,
      name,
      phone,
      address
    });

    console.log('User created successfully:', user);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        error: error.message 
      });
    }
    res.status(500).json({ 
      message: 'Error registering user',
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const firebaseUid = req.firebaseUser.uid;
    console.log('Getting profile for user:', firebaseUid);
    
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      console.log('User not found:', firebaseUid);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile found:', user);
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Error getting user profile',
      error: error.message 
    });
  }
};

module.exports = {
  registerUser,
  getUserProfile
}; 