// backend/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const bookmarkRoutes = require('./routes/bookmarks');
const voteRoutes = require('./routes/votes');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app;
