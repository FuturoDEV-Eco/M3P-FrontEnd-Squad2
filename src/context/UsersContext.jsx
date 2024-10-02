import { createContext, useEffect, useState } from 'react';
import api from '../config/api';
export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUsers();
    countUsers();
    checkAuthentication();
  }, []);

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

  function getUsers() {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  //para contar o numero de usuários
  const countUsers = () => {
    api
      .get('/usuarios/count')
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.error('Ih, agora quem foi o tanso que não sabe contar', error);
      });
  };

  function createUser(user) {
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
    // valida se já existe o cpf
    const existingUser = users.find((u) => u.cpf === user.cpf);
    if (existingUser) {
      alert('Já tem um queridu com este CPF.');
      return;
    }
    // validar o email tb já que é usado para login
    const existingEmail = users.find((m) => m.email === user.email);
    if (existingEmail) {
      alert('Já tem um queridu com este E-mail.');
      return;
    }

    api
      .post('/usuarios/criar', user)
      .then(() => {
        alert('Arrombassi! Sua conta foi criada com sucesso');
        getUsers();
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          alert(
            'Sabe aquele boca-moli do programador? Aquele que mora lá pelo Campeche? Pois errou de novo.'
          );
        }
      });
  }

  //valida o cpf
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

  async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar usuário');
    }
    return response.json();
  }

  async function updateUser(id, userData) {
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
      (u) => u.cpf === userData.cpf && Number(u.id) !== Number(id)
    );
    if (existingCPF) {
      alert('Já tem um queridu com este CPF');
      return false;
    }

    // Verificação de duplicidade de email
    const existingEmail = users.find(
      (m) => m.email === userData.email && Number(m.id) !== Number(id)
    );
    if (existingEmail) {
      alert('JJá tem um queridu com este E-mail.');
      return false;
    }
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar usuário');
    }
    getUsers(); // Atualiza a lista de usuários após a atualização
    return true;
  }

  function deleteUser(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Em dois toques deletou o queridu!');
        getUsers(); // Atualiza a lista após a exclusão
      })
      .catch(() =>
        alert(
          'Sabe aquele boca-moli do programador? Aquele que mora lá pelo Campeche? Pois errou de novo. Não deletou o queridu.'
        )
      );
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
        updateUser,
        userCount,
        deleteUser,
        isCPFValid,
        isUserAuthenticated,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
