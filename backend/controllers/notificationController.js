const Notification = require("../models/Notification");

/* GET ALL NOTIFICATIONS */
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      userId
    }).sort({
      createdAt: -1
    });

    return res.status(200).json(notifications);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* GET UNREAD COUNT */
const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const count = await Notification.countDocuments({
      userId,
      isRead: false
    });

    return res.status(200).json({
      count
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* MARK ALL AS READ */
const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      {
        userId,
        isRead: false
      },
      {
        isRead: true
      }
    );

    return res.status(200).json({
      message: "Notifications marked as read"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead
};