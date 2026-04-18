import axios from 'axios';

const API_URL = 'http://localhost:7001/api/notifications';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const notificationService = {
  getNotifications: async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axios.patch(`${API_URL}/mark-read/${id}`, {}, getAuthHeader());
    return response.data;
  },

  clearNotifications: async () => {
    const response = await axios.delete(`${API_URL}/clear`, getAuthHeader());
    return response.data;
  }
};
