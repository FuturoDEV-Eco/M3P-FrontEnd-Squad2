import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ou a URL do backend em produção
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para enviar cookies
  timeout: 5000,
});

export default api;
