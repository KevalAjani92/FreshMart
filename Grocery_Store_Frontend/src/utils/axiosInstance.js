import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7188/api/',
  withCredentials: true // 🔥 important for cookies
});

export default api;