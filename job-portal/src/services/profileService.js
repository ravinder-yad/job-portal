import axios from 'axios';

const API_URL = 'http://localhost:7001/api/user';

const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const uploadPhoto = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axios.post(`${API_URL}/upload-image`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const uploadResume = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await axios.post(`${API_URL}/upload-resume`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  getProfile,
  updateProfile,
  uploadPhoto,
  uploadResume
};
