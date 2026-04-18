const Message = require("../models/Message");
const User = require("../models/User");

// ✅ Get all users who have had a conversation with current user (Admin)
const getConversations = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Find all unique user IDs that the admin has sent messages to or received messages from
    const messages = await Message.find({
      $or: [{ sender: adminId }, { receiver: adminId }],
    }).sort({ createdAt: -1 });

    const userIds = new Set();
    messages.forEach((msg) => {
      userIds.add(msg.sender.toString());
      userIds.add(msg.receiver.toString());
    });

    userIds.delete(adminId.toString());

    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select("name email profilePicture");

    // Add last message snip to each user
    const conversationList = users.map((user) => {
      const lastMsg = messages.find(
        (m) => m.sender.toString() === user._id.toString() || m.receiver.toString() === user._id.toString()
      );
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        lastMessage: lastMsg ? lastMsg.content : "",
        lastMessageTime: lastMsg ? lastMsg.createdAt : null,
      };
    });

    res.json(conversationList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations" });
  }
};

// ✅ Get full chat history with a specific user
const getMessages = async (req, res) => {
  try {
    const adminId = req.user.id;
    const userId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: adminId, receiver: userId },
        { sender: userId, receiver: adminId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// ✅ Save message (often called via socket but can be used for REST fallback)
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};

module.exports = { getConversations, getMessages, sendMessage };
