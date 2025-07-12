const User = require('../models/User');

const isCreator = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user && user.email === 'veerakaran126@gmail.com') {
    next();
  } else {
    return res.status(403).json({ message: 'Only creator access allowed' });
  }
};

module.exports = isCreator;
