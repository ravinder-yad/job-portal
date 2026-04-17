export const mockChats = [
  {
    id: 1,
    user: {
      name: "Sarah Jenkins",
      avatar: "S",
      online: true,
      role: "Technical Recruiter @ Google"
    },
    unread: 2,
    lastMessage: "Are you available for a quick chat tomorrow?",
    lastTime: "10:30 AM",
    messages: [
      { id: 1, senderId: 1, text: "Hi there! I saw your profile and was really impressed with your React experience.", time: "10:20 AM" },
      { id: 2, senderId: 'me', text: "Hello Sarah! Thanks for reaching out. I'm glad to hear that.", time: "10:25 AM" },
      { id: 3, senderId: 1, text: "We have an opening for a Senior Frontend Engineer that might be a great fit.", time: "10:28 AM" },
      { id: 4, senderId: 1, text: "Are you available for a quick chat tomorrow?", time: "10:30 AM" }
    ]
  },
  {
    id: 2,
    user: {
      name: "David Chen",
      avatar: "D",
      online: false,
      role: "Engineering Manager @ Atlassian"
    },
    unread: 0,
    lastMessage: "Thanks for the resume, we'll review it.",
    lastTime: "Yesterday",
    messages: [
      { id: 1, senderId: 'me', text: "Hi David, I've just submitted my application for the Full Stack role.", time: "Yesterday, 2:00 PM" },
      { id: 2, senderId: 2, text: "Thanks for the resume, we'll review it.", time: "Yesterday, 3:15 PM" }
    ]
  },
  {
    id: 3,
    user: {
      name: "Alex Rivera",
      avatar: "A",
      online: true,
      role: "Startup Founder"
    },
    unread: 1,
    lastMessage: "Could you send me your portfolio link?",
    lastTime: "2 hours ago",
    messages: [
      { id: 1, senderId: 3, text: "Your recent post about Performance Optimization was solid.", time: "3 hours ago" },
      { id: 2, senderId: 'me', text: "Thanks Alex! Appreciate it.", time: "2 hours ago" },
      { id: 3, senderId: 3, text: "Could you send me your portfolio link? We might need some freelance help.", time: "2 hours ago" }
    ]
  }
];

export const getUnreadCount = () => {
  return mockChats.reduce((total, chat) => total + chat.unread, 0);
};
