const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const isCreator = require('../middleware/isCreator');

const User = require('../models/User');
const Question = require('../models/Question');


// ✅ Promote user to admin — only by Creator
router.put('/promote/:id', verifyToken, isCreator, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to promote user' });
  }
});


// ✅ Get admin stats — only by Admin
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const questions = await Question.countDocuments();
    res.json({ totalUsers: users, totalQuestions: questions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});


// ✅ Delete user by ID — only by Admin
router.delete('/user/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});


// ✅ Delete question by ID — only by Admin
router.delete('/question/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
});


// ✅ Delete all users except the creator — only by Creator
router.delete('/delete-all-users', verifyToken, isCreator, async (req, res) => {
  try {
    await User.deleteMany({ email: { $ne: 'veerakaran126@gmail.com' } });
    res.json({ message: 'All users deleted except creator' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete users' });
  }
});


module.exports = router;
