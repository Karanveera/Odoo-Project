const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  markAllAsRead,
} = require("../controllers/notificationController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getUserNotifications);
router.put("/read", verifyToken, markAllAsRead);

module.exports = router;
