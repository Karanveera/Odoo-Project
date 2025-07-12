const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  votes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
