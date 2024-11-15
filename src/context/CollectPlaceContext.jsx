import { createContext, useState, useEffect } from 'react';
import api from '../config/api';

export const CollectPlaceContext = createContext();

export const CollectPlaceContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [placeCount, setPlaceCount] = useState(0);

  useEffect(() => {
    getPlaces();
    countPlaces();
  }, []);

  async function getPlaces() {
    try {
      const response = await api.get('/local/all'); // Rota pública
      setPlaces(response.data);
    } catch (error) {
      console.error('Erro ao obter locais de coleta:', error);
    }
  }

  //para contar o numero de pontos de coleta
  async function countPlaces() {
    try {
      const response = await api.get('/local/count-all');
      setPlaceCount(response.data.count); // Atualiza o estado placeCount
    } catch (error) {
      console.error('Erro ao contar os pontos de coleta:', error);
    }
  }

  async function createPlace(place) {
    try {
      await api.post('/local', place);
      alert('Dáx um banho!  As tartarugas agradecem o novo ponto de coleta!');
      getPlaces();
    } catch (error) {
      console.error('Erro ao criar local de coleta:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Exibe o erro retornado pelo backend
      } else {
        alert('O Boca-moli do programador fez algo errado!');
      }
    }
  }

  async function getCollectPlaceById(id) {
    try {
      const response = await api.get(`/local/${id}`); // Aqui usamos o `api` já configurado com axios
      return response.data; // Retorna os dados do local de coleta
    } catch (error) {
      console.error('Erro ao buscar local de coleta:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        alert(error.response.data.mensagem); // Exibe o erro retornado pelo backend
      } else {
        alert('O Boca-moli do programador fez algo errado!');
      }
    }
  }

  async function countPlacesByUserId(user_id) {
    try {
      const response = await api.get(`local/collectPlaces?user_id=${user_id}`);
      return response.data.count || 0;
    } catch (error) {
      console.error('Erro ao contar locais de coleta por usuário:', error);
      return 0;
    }
  }

  async function updatePlace(id, placeData) {
    try {
      const response = await api.put(`/local/${id}`, placeData); // Usando o `api` configurado com axios
      if (response.status === 200) {
        alert('Local de coleta atualizado com sucesso!');
        getPlaces(); // Atualiza a lista de locais de coleta
      }
    } catch (error) {
      console.error('Erro ao atualizar local de coleta:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        alert(error.response.data.mensagem); // Exibe o erro retornado pelo backend
      } else {
        alert('O Boca-moli do programador fez algo errado!');
      }
    }
  }

  async function deletePlace(id) {
    try {
      // Fazendo a requisição DELETE usando axios
      await api.delete(`/local/${id}`);

      alert('Em dois toques acabou com o ponto de coleta');
      getPlaces(); // Atualiza a lista após a exclusão
      location.href = '/'
    } catch (error) {
      console.error('Erro ao deletar o local de coleta:', error);
      alert(
        'O Mandrião do programador fez algo errado de novo! Erro ao deletar o local de coleta'
      );
    }
  }
  // locais de coleta por usuário
  async function getCollectPlacesByUserId() {
    try {
      // Faz a requisição usando o `axios` configurado (que já envia o token automaticamente)
      const response = await api.get('/local');

      // Retorna os dados dos pontos de coleta
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar locais de coleta:', error);

      // Verifica se o backend retornou uma mensagem específica de erro
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        alert(error.response.data.mensagem); // Exibe o erro retornado pelo backend
      } else {
        alert('O Boca-moli do programador fez algo errado!'); // Exibe uma mensagem genérica
      }
    }
  }

  return (
    <CollectPlaceContext.Provider
      value={{
        places,
        createPlace,
        getCollectPlaceById,
        updatePlace,
        getCollectPlacesByUserId,
        deletePlace,
        placeCount,
        countPlacesByUserId,
      }}
    >
      {children}
    </CollectPlaceContext.Provider>
  );
};
