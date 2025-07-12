const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// ✅ Get all users (Admin access only)
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err.message);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;