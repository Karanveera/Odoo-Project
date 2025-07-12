const express = require("express");
const router = express.Router();
const {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
} = require("../controllers/answerController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/:questionId", verifyToken, postAnswer);
router.get("/:questionId", getAnswersForQuestion);
router.delete("/:answerId", verifyToken, deleteAnswer);

module.exports = router;
