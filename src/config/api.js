import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

//este arquivo vai ser aprimordo para o uso de tokens

export default api;
