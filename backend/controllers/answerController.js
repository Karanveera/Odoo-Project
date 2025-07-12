const Answer = require("../models/Answer");
const Question = require("../models/Question");

// @desc    Post an answer
// @route   POST /api/answers/:questionId
const postAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = await Answer.create({
      content,
      question: questionId,
      user: req.user.id,
    });

    res.status(201).json(answer);
  } catch (err) {
    console.error("Post Answer Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all answers for a question
// @route   GET /api/answers/:questionId
const getAnswersForQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ question: questionId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (err) {
    console.error("Get Answers Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete an answer
// @route   DELETE /api/answers/:answerId
const deleteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await answer.deleteOne();
    res.status(200).json({ message: "Answer deleted" });
  } catch (err) {
    console.error("Delete Answer Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
};
