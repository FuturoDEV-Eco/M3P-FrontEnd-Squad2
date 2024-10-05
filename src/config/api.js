import axios from 'axios';

// Função para obter o token armazenado no localStorage
const getToken = () => localStorage.getItem('authToken');

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ou a URL do backend em produção
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Adicionar o token JWT no cabeçalho Authorization em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log('Token JWT enviado:', token); // Verifica se o token está sendo adicionado corretamente
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
