const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { verifyToken } = require('../middleware/authMiddleware');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load questions' });
  }
});

// Get single question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get question' });
  }
});

// Create new question
router.post('/', verifyToken, async (req, res) => {
  const { title, description, tags, image } = req.body;
  try {
    const newQuestion = await Question.create({
      title,
      description,
      tags,
      image,
      user: req.user.id,
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post question' });
  }
});

// Update question
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update question' });
  }
});

// Delete question
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
});

module.exports = router;
