const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

// @desc    Get basic platform stats
// @route   GET /api/admin/stats
const getUserStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const questions = await Question.countDocuments();
    const answers = await Answer.countDocuments();

    res.status(200).json({
      totalUsers: users,
      totalQuestions: questions,
      totalAnswers: answers,
    });
  } catch (err) {
    console.error("Stats Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Ban (delete) a user
// @route   DELETE /api/admin/ban/:userId
const banUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.status(200).json({ message: `User ${user.name} has been banned.` });
  } catch (err) {
    console.error("Ban User Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserStats,
  banUser,
};
