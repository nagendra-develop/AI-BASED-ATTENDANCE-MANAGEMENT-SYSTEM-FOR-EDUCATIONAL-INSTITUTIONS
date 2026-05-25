import axios from 'axios';

// The Flask Backend URL (change this to your actual deployment URL in production)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching auth tokens if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const attendanceAPI = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await apiClient.get('/attendance/stats');
    return response.data;
  },
  
  // Get detailed attendance records
  getRecords: async () => {
  const response = await apiClient.get('/attendance');
  return response.data;
},

  // Post a frame to the face recognition backend
  recognizeFace: async (frameDataUrl) => {
    // frameDataUrl is a base64 encoded image string
    const response = await apiClient.post('/recognize', { image: frameDataUrl });
    return response.data;
  }
};

export const userAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }
};

export default apiClient;
