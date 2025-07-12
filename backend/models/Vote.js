// models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  value: { type: String, enum: ['up', 'down'], required: true }
});

module.exports = mongoose.model('Vote', voteSchema);
