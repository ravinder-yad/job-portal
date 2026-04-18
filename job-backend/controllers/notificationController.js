const AdminNotification = require("../models/AdminNotification");

// ✅ Get all notifications for admin
const getNotifications = async (req, res) => {
  try {
    const notifications = await AdminNotification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// ✅ Mark specific notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "all") {
      await AdminNotification.updateMany({ isRead: false }, { isRead: true });
    } else {
      await AdminNotification.findByIdAndUpdate(id, { isRead: true });
    }
    res.json({ message: "Notification(s) marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification" });
  }
};

// ✅ Clear all notifications
const clearNotifications = async (req, res) => {
  try {
    await AdminNotification.deleteMany({});
    res.json({ message: "Notifications cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing notifications" });
  }
};

// 🛠️ INTERNAL HELPER: Create notification (Used by other controllers)
const createAdminNotification = async (data) => {
  try {
    const notification = await AdminNotification.create(data);
    return notification;
  } catch (error) {
    console.error("Internal Notification Error:", error);
  }
};

module.exports = { 
  getNotifications, 
  markAsRead, 
  clearNotifications,
  createAdminNotification
};
