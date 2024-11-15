import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrigido para jwtDecode
import api from '../config/api';

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    checkAuthentication();
    countUsers();
  }, []);

  useEffect(() => {
    if (decodedToken && decodedToken.admin) {
      getUsers();
    }
  }, [decodedToken]);

  function isUserAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  function getDecodedToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Uso correto de jwtDecode
        return decoded;
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
      }
    }
    return null;
  }

  async function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await api.get('/usuarios/logged-user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const decoded = jwtDecode(token); // Decodifica o token

        setDecodedToken(decoded); // Armazena o token decodificado
      } catch (error) {
        console.error('Usuário não autenticado:', error);
        localStorage.removeItem('authToken');
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }

  async function userLogin(email, password) {
    try {
      const response = await api.post('/login', { email, password });

      const token = response.data.token;

      localStorage.setItem('authToken', token);

      const decoded = jwtDecode(token);

      setDecodedToken(decoded);

      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  async function userLogout() {
    try {
      localStorage.removeItem('authToken'); // Remover o token do localStorage
      setDecodedToken(null);
      window.location.href = '/'; // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Para contar o número de usuários
  async function countUsers() {
    try {
      const response = await api.get('/usuarios/count');
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Ih, agora quem foi o tanso que não sabe contar', error);
    }
  }

  async function getUsers() {
    try {
      if (!decodedToken || !decodedToken.admin) {
        throw new Error(
          'Acesso negado. Apenas administradores podem acessar a lista de usuários.'
        );
      }

      const response = await api.get('/usuarios/users-list-all');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de usuários:', error);
      if (error.response && error.response.status === 403) {
        alert('Você não tem permissão para acessar esta lista.');
      } else {
        alert('Erro ao carregar a lista de usuários.');
      }
    }
  }

  async function createUser(user) {
    // Validações
    if (!user.name || user.name.trim() === '') {
      alert('O Querido deixa saberem quem tu és');
      return;
    }
    if (!user.cpf || user.cpf.trim() === '') {
      alert('Aqueles números do CPF. Não tem? Coloca ai!');
      return;
    }
    if (!isCPFValid(user.cpf)) {
      alert('Não amarrar a cara, mas o CPF tá errado');
      return;
    }
    // Validação de duplicidade de CPF
    const existingCPF = users.find((u) => u.cpf === user.cpf);
    if (existingCPF) {
      alert('Já tem um queridu com este CPF.');
      return;
    }
    // Validação de duplicidade de email
    const existingEmail = users.find((u) => u.email === user.email);
    if (existingEmail) {
      alert('Já tem um queridu com este E-mail.');
      return;
    }

    try {
      await api.post('/usuarios/criar', user);
      alert('Arrombassi! Sua conta foi criada com sucesso');
      getUsers();
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert(
          'Sabe aquele boca-moli do programador? Aquele que mora lá pelo Campeche? Pois errou de novo.'
        );
      }
    }
  }

  async function getUserById(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
      throw error;
    }
  }

  async function updateUser(userId, userData) {
    // Validações
    if (!userData.name || userData.name.trim() === '') {
      alert('O Querido deixa saberem quem tu és');
      return false;
    }
    if (!userData.cpf || userData.cpf.trim() === '') {
      alert('Aqueles números do CPF. Não tem? Coloca ai!');
      return false;
    }
    if (!isCPFValid(userData.cpf)) {
      alert('Não amarrar a cara, mas o CPF tá errado.');
      return false;
    }
    // Verificação de duplicidade de CPF
    const existingCPF = users.find(
      (u) => u.cpf === userData.cpf && Number(u.id) !== Number(userId)
    );
    if (existingCPF) {
      alert('Já tem um queridu com este CPF');
      return false;
    }
    // Verificação de duplicidade de email
    const existingEmail = users.find(
      (u) => u.email === userData.email && Number(u.id) !== Number(userId)
    );
    if (existingEmail) {
      alert('Já tem um queridu com este E-mail.');
      return false;
    }

    try {
      await api.put(`/usuarios/${userId}`, userData);
      await getUsers(); // Atualiza a lista de usuários após a atualização
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }

  async function updateCurrentUser(userData) {
    // Validações
    if (!userData.name || userData.name.trim() === '') {
      alert('O Querido deixa saberem quem tu és');
      return false;
    }
    if (!userData.cpf || userData.cpf.trim() === '') {
      alert('Aqueles números do CPF. Não tem? Coloca ai!');
      return false;
    }
    if (!isCPFValid(userData.cpf)) {
      alert('Não amarrar a cara, mas o CPF tá errado.');
      return false;
    }

    // Validação de duplicidade de CPF (Se necessário, caso tenha a lista de usuários localmente)
    const existingCPF = users?.find(
      (u) => u.cpf === userData.cpf && u.id !== decodedToken?.id
    );
    if (existingCPF) {
      alert('Já tem um queridu com este CPF');
      return false;
    }

    // Validação de duplicidade de email (Se necessário, caso tenha a lista de usuários localmente)
    const existingEmail = users?.find(
      (u) => u.email === userData.email && u.id !== decodedToken?.id
    );
    if (existingEmail) {
      alert('Já tem um queridu com este E-mail.');
      return false;
    }

    try {
      // Chamada à API para atualizar os dados do usuário
      const response = await api.put('/usuarios/logged-user', userData);

      return true;
    } catch (error) {
      // Tratamento de erro na atualização
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }

  async function countUserCollectionPoints() {
    if (!isUserAuthenticated()) {
      return 0; // Retorna 0 se o usuário não estiver autenticado
    }
    try {
      const response = await api.get(
        `/usuarios/${decodedToken.id}/count-collect-points`
      );
      return response.data.count;
    } catch (error) {
      console.error('Erro ao contar pontos de coleta do usuário:', error);
      return 0;
    }
  }

  async function deleteUser(id) {
    try {
      // Verifica se o usuário tem pontos de coleta
      const collectionPointsCount = await countUserCollectionPoints();

      if (collectionPointsCount > 0) {
        alert('Ôh feio! O queridu tem pontos de coleta ainda.');
        return;
      }

      // Deleta o usuário
      const response = await api.delete(`/usuarios/${id}`);

      if (response.status === 200) {
        alert('Em dois toques deletou o queridu!');

        // Se o usuário não for admin, realiza logout e redireciona
        if (!decodedToken.admin) {
          localStorage.removeItem('authToken'); // Remove o token
          window.location.href = '/'; // Redireciona para a página inicial
        } else {
          // Se for admin, atualiza a lista de usuários
          await getUsers(); // Atualiza os usuários
        }
      } else {
        alert('Falha ao deletar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao tentar deletar o queridu.');
    }
  }

  function isCPFValid(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0,
      remainder;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        createUser,
        userLogin,
        userLogout,
        getUserById,
        updateUser,
        userCount,
        deleteUser,
        isCPFValid,
        isUserAuthenticated,
        countUserCollectionPoints,
        updateCurrentUser,
        decodedToken,
        getDecodedToken,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
