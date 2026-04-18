const express = require("express");
const router = express.Router();
const { getConversations, getMessages, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

// All routes protected by JWT
router.use(protect);

router.get("/conversations", getConversations);
router.get("/:userId", getMessages);
router.post("/send", sendMessage);

module.exports = router;
