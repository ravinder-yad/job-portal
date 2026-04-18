const express = require("express");
const router = express.Router();
const { getNotifications, markAsRead, clearNotifications } = require("../controllers/notificationController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// All routes restricted to Admin
router.use(protect, isAdmin);

router.get("/", getNotifications);
router.patch("/mark-read/:id", markAsRead);
router.delete("/clear", clearNotifications);

module.exports = router;
