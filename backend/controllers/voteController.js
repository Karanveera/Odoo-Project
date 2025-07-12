const Vote = require('../models/Vote');
const Answer = require('../models/Answer');

const voteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { value } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Vote.findOne({ user: userId, answer: answerId });

    if (existing) {
      if (existing.value === value) {
        return res.status(400).json({ message: 'Already voted' });
      } else {
        existing.value = value;
        await existing.save();
      }
    } else {
      await Vote.create({ user: userId, answer: answerId, value });
    }

    const upVotes = await Vote.countDocuments({ answer: answerId, value: 'up' });
    const downVotes = await Vote.countDocuments({ answer: answerId, value: 'down' });

    const answer = await Answer.findByIdAndUpdate(answerId, { votes: upVotes - downVotes }, { new: true });

    res.json({ message: 'Vote recorded', votes: answer.votes });
  } catch (err) {
    res.status(500).json({ message: 'Vote failed' });
  }
};

module.exports = { voteAnswer };
