const User = require('../models/User');
const Question = require('../models/Question');

const toggleBookmark = async (req, res) => {
  const userId = req.user.id;
  const { questionId } = req.params;

  try {
    const user = await User.findById(userId);
    const isSaved = user.savedQuestions.includes(questionId);

    if (isSaved) {
      user.savedQuestions.pull(questionId);
    } else {
      user.savedQuestions.push(questionId);
    }

    await user.save();
    res.json({ message: isSaved ? 'Bookmark removed' : 'Bookmarked' });
  } catch (err) {
    res.status(500).json({ message: 'Bookmark failed' });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedQuestions');
    res.json(user.savedQuestions);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookmarks' });
  }
};

module.exports = { toggleBookmark, getBookmarks };
