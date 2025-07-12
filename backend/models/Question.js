const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer", default: null },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
