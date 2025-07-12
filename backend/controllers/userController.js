const User = require("../models/User");

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Get Profile Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };
