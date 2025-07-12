const Question = require("../models/Question");
const Answer = require("../models/Answer");

// @desc    Ask a new question
// @route   POST /api/questions
const askQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const question = await Question.create({
      title,
      description,
      tags,
      user: req.user.id,
    });

    res.status(201).json(question);
  } catch (err) {
    console.error("Ask Question Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all questions
// @route   GET /api/questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (err) {
    console.error("Get Questions Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single question by ID
// @route   GET /api/questions/:id
const getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user", "name");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (err) {
    console.error("Get Single Question Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete question (only owner)
// @route   DELETE /api/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await question.deleteOne();
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    console.error("Delete Question Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Search questions by tag
// @route   GET /api/questions/search/tag?tag=React
const searchQuestions = async (req, res) => {
  try {
    const tag = req.query.tag;
    const questions = await Question.find({ tags: tag }).populate("user", "name");
    res.status(200).json(questions);
  } catch (err) {
    console.error("Search Questions Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Accept an answer
// @route   PUT /api/questions/:id/accept-answer/:answerId
const acceptAnswer = async (req, res) => {
  try {
    const { id, answerId } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the question owner can accept an answer" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer || answer.question.toString() !== id) {
      return res.status(400).json({ message: "Invalid answer for this question" });
    }

    question.acceptedAnswer = answerId;
    await question.save();

    res.status(200).json({ message: "Answer accepted", question });
  } catch (err) {
    console.error("Accept Answer Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
  searchQuestions,
  acceptAnswer,
};
