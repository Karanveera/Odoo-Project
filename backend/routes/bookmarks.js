const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const Question = require('../models/Question');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ Add or remove a bookmark
router.post('/:id', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  try {
    const existing = await Bookmark.findOne({ user: userId, question: questionId });

    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id);
      return res.json({ message: 'Removed from bookmarks' });
    }

    const newBookmark = new Bookmark({ user: userId, question: questionId });
    await newBookmark.save();
    res.json({ message: 'Added to bookmarks' });

  } catch (err) {
    console.error('Bookmark toggle failed:', err);
    res.status(500).json({ message: 'Bookmark failed' });
  }
});

// ✅ Get all bookmarks of logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate('question');
    const savedQuestions = bookmarks.map(b => b.question);
    res.json(savedQuestions);
  } catch (err) {
    console.error('Bookmark fetch failed:', err);
    res.status(500).json({ message: 'Failed to load bookmarks' });
  }
});

module.exports = router;
