const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const User = require('../models/User');

// Protected route: Get Firebase user profile
router.get('/profile', firebaseAuth, (req, res) => {
  res.json({ user: req.firebaseUser });
});

// Create or update user in MongoDB using Firebase UID
router.post('/sync', firebaseAuth, async (req, res) => {
  const { name, email, phone, address } = req.body;
  const uid = req.firebaseUser.uid;
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { name, email, phone, address, uid },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing user', error: error.message });
  }
});

module.exports = router; 