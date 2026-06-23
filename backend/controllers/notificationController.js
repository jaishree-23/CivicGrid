const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // DEBUG: check if API is receiving correct userId
    console.log("Fetching notifications for userId:", userId);

    if (!userId) {
      return res.status(400).json({
        message: "UserId is required"
      });
    }

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    console.log("Notifications found:", notifications.length);

    return res.status(200).json(notifications);

  } catch (error) {
    console.error("Notification fetch error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getNotifications
};