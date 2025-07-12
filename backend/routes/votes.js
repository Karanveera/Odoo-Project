const express = require('express');
const router = express.Router();
const { voteAnswer } = require('../controllers/voteController');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ Make sure voteAnswer is a FUNCTION
router.post('/:answerId', verifyToken, voteAnswer);

module.exports = router;
