const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const adminRoutes = require('./routes/admin');
const answerRoutes = require('./routes/answers');
const bookmarkRoutes = require('./routes/bookmarks');
const voteRoutes = require('./routes/votes');
const aiRoutes = require('./routes/ai');
const userRoutes = require('./routes/users'); // ✅ ADD THIS

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes); // ✅ This will handle /api/users

module.exports = app;
