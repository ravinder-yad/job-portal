import axios from 'axios';

const API_URL = 'http://localhost:7001/api/messages';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const messageService = {
  // Get all conversation threads for admin
  getConversations: async () => {
    const response = await axios.get(`${API_URL}/conversations`, getAuthHeader());
    return response.data;
  },

  // Get chat history with a specific user
  getMessages: async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`, getAuthHeader());
    return response.data;
  },

  // Send a message via REST (fallback)
  sendMessage: async (messageData) => {
    const response = await axios.post(`${API_URL}/send`, messageData, getAuthHeader());
    return response.data;
  }
};
