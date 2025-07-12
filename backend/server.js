const express = require('express'); // ✅ Add this line
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

// ✅ Routes
const voteRoutes = require('./routes/votes');
app.use('/api/votes', voteRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const bookmarkRoutes = require('./routes/bookmarks');
app.use('/api/bookmarks', bookmarkRoutes);


const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);


const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

// ✅ Serve local image uploads
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
