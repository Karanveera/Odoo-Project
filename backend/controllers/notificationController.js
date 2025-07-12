const Notification = require("../models/Notification");

// @desc    Get all notifications for logged-in user
// @route   GET /api/notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Get Notifications Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, isRead: false }, { isRead: true });
    res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error("Mark Notifications Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserNotifications,
  markAllAsRead,
};
