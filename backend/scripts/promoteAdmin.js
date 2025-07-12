const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function promote() {
  try {
    const res = await User.updateOne(
      { email: 'veerakaran126@gmail.com' },
      { $set: { role: 'admin' } }
    );
    if (res.modifiedCount > 0) {
      console.log('✅ User promoted to admin');
    } else {
      console.log('ℹ️ No user updated — either not found or already admin');
    }
  } catch (err) {
    console.error('❌ Failed to promote user:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

promote();
