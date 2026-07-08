import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api/scan',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const scanSingle = async (text) => {
  const response = await api.post('/single', { text });
  return response.data;
};

export const scanBatch = async (posts) => {
  const response = await api.post('/batch', { posts });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};
