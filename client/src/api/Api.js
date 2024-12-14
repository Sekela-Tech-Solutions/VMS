import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend base URL
});

// Add Authorization token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
