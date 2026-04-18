import axios from 'axios';

const API_BASE_URL = 'http://localhost:7001/api/admin';
const COMPANY_API_URL = 'http://localhost:7001/api/companies';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const adminService = {
  // 📊 Stats & Overview
  getDashboardStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, getAuthHeader());
    return response.data;
  },
  
  getDetailedAnalytics: async () => {
    const response = await axios.get(`${API_BASE_URL}/analytics`, getAuthHeader());
    return response.data;
  },

  // 👥 User Management
  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`, getAuthHeader());
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, getAuthHeader());
    return response.data;
  },

  // 💼 Job Management
  getAllJobs: async () => {
    const response = await axios.get(`${API_BASE_URL}/jobs`, getAuthHeader());
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/jobs/${id}`, getAuthHeader());
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await axios.post(`http://localhost:7001/api/jobs/add`, jobData, getAuthHeader());
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await axios.put(`http://localhost:7001/api/jobs/${id}`, jobData, getAuthHeader());
    return response.data;
  },

  // 🏢 Company Management
  getAllCompanies: async () => {
    const response = await axios.get(`${API_BASE_URL}/companies`, getAuthHeader());
    return response.data;
  },

  getCompanyById: async (id) => {
    const response = await axios.get(`${COMPANY_API_URL}/${id}`, getAuthHeader());
    return response.data;
  },

  createCompany: async (companyData) => {
    const response = await axios.post(COMPANY_API_URL, companyData, getAuthHeader());
    return response.data;
  },

  updateCompany: async (id, companyData) => {
    const response = await axios.put(`${COMPANY_API_URL}/${id}`, companyData, getAuthHeader());
    return response.data;
  },

  deleteCompany: async (id) => {
    const response = await axios.delete(`${COMPANY_API_URL}/${id}`, getAuthHeader());
    return response.data;
  }
};
