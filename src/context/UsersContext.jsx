import { createContext, useEffect, useState } from 'react';
import api from '../config/api';

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuthentication();
    countUsers();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.admin) {
      getUsers();
    }
  }, [currentUser]);

  function isUserAuthenticated() {
    return currentUser !== null;
  }

  async function checkAuthentication() {
    try {
      const response = await api.get('/usuarios/logged-user');
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Usuário não autenticado:', error);
      setCurrentUser(null);
    }
  }

  async function userLogin(email, password) {
    try {
      const response = await api.post('/login', { email, password });

      // Armazenar os dados do usuário no estado
      setCurrentUser(response.data);

      // Redirecionar o usuário após o login, se necessário
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  async function userLogout() {
    try {
      await api.post('/logout');
      setCurrentUser(null);
      window.location.href = '/'; // direciona para a página inicial
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  async function getUsers() {
    try {
      const response = await api.get('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
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
    const userId = currentUser.id;

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
      const response = await api.put('/usuarios/logged-user', userData);
      setCurrentUser(response.data);
      await getUsers();
      return true;
    } catch (error) {
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
        `/usuarios/${currentUser.id}/count-collect-points`
      );
      return response.data.count;
    } catch (error) {
      console.error('Erro ao contar pontos de coleta do usuário:', error);
      return 0;
    }
  }

  async function deleteUser(id) {
    try {
      // Verifica se o usuário tem pontos de coleta usando countUserCollectionPoints
      const collectionPointsCount = await countUserCollectionPoints();

      // Se o usuário tiver pontos de coleta, bloqueia a deleção
      if (collectionPointsCount > 0) {
        alert(
          'ôh feio! O queridu tem pontos de coleta ainda. Nós não podemos te mandar embora assim.'
        );
        return;
      }

      // Se não tiver pontos de coleta, permite a deleção
      await api.delete(`/usuarios/${id}`);
      alert('Em dois toques deletou o queridu!');
      getUsers();

      // Após deletar o usuário, faz logout
      await api.post('/logout');
      window.location.href = '/'; // Redireciona para a página inicial após logout
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert(
        'Sabe aquele boca-moli do programador? Aquele que mora lá pelo Campeche? Pois errou de novo. Não deletou o queridu.'
      );
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
        currentUser,
        getUserById,
        updateCurrentUser,
        updateUser,
        userCount,
        deleteUser,
        isCPFValid,
        isUserAuthenticated,
        getUsers,
        countUserCollectionPoints,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
