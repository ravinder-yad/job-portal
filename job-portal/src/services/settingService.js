import axios from 'axios';

const API_URL = 'http://localhost:7001/api/settings';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const settingService = {
  getSettings: async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await axios.put(`${API_URL}/profile`, profileData, getAuthHeader());
    return response.data;
  },

  updateSecurity: async (securityData) => {
    const response = await axios.put(`${API_URL}/security`, securityData, getAuthHeader());
    return response.data;
  },

  updateSystem: async (systemData) => {
    const response = await axios.put(`${API_URL}/system`, systemData, getAuthHeader());
    return response.data;
  }
};
