const express = require("express");
const router = express.Router();

const {
  getNotifications,
  getUnreadCount,
  markAsRead
} = require("../controllers/notificationController");

router.get("/unread/:userId", getUnreadCount);

router.put("/read/:userId", markAsRead);

router.get("/:userId", getNotifications);

module.exports = router;