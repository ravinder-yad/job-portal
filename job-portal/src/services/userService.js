import axios from 'axios';

const API_URL = 'http://localhost:7001/api';

const getUserStats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/applications/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const getSavedCount = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/saved`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.length;
};

const getRecentApplications = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/applications/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.slice(0, 3);
};

const getSavedJobs = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/saved`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.slice(0, 3);
};

export { getUserStats, getSavedCount, getRecentApplications, getSavedJobs };
