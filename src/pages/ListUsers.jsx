import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../context/UsersContext';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { Link, useNavigate } from 'react-router-dom';
import simbol from '../assets/favicon.png';

function ListUsers() {
  const { users, deleteUser, decodedToken } = useContext(UsersContext);
  const { countPlacesByUserId } = useContext(CollectPlaceContext);
  const [placeCounts, setPlaceCounts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para a página inicial se o usuário não for administrador
    if (!decodedToken || !decodedToken.admin) {
      navigate('/');
    }
  }, [decodedToken, navigate]);

  useEffect(() => {
    const loadPlaceCounts = async () => {
      const counts = {};
      for (const user of users) {
        counts[user.id] = await countPlacesByUserId(user.id);
      }
      setPlaceCounts(counts);
    };

    if (users.length > 0) {
      loadPlaceCounts();
    }
  }, [users, countPlacesByUserId]);

  return (
    <>
      <div className='page-title align-icon'>
        <img src={simbol} height={35} alt='Destino certo' />
        <span>Área admin - Usuários</span>
      </div>
      <div className='section-cards'>
        {users.map((user) => (
          <div className='cards' key={user.id}>
            <div className='card-body flexible'>
              <div>
                <strong>ID:</strong> {user.id}
              </div>
              <div className='success'>
                <strong>Nome:</strong> {user.name}
              </div>
              <div className='success'>
                <strong>Sexo:</strong> {user.gender}
              </div>
              <div className='success'>
                <strong>CPF:</strong> {user.cpf}
              </div>
              <div className='success'>
                <strong>Data nascimento:</strong> {user.birthdate}
              </div>
              <div className='success'>
                <strong>Email:</strong> {user.email}
              </div>
              <div className='success'>
                <strong>Endereço:</strong>{' '}
                {`${user.street}, ${user.number} ${user.complement || ''}, ${
                  user.neighborhood
                }, ${user.city}, ${user.state}, ${user.postalcode}`}
              </div>
              <div className='success'>
                <strong>Administrador:</strong> {user.admin ? 'Sim' : 'Não'}
              </div>
              <div className='success'>
                <strong>
                  {placeCounts ? (
                    placeCounts[user.id] > 0 ? (
                      <Link
                        className='success'
                        to={`/collectPlaces/listbyuser/${user.id}`}
                        title='Ver coletas do usuário'
                      >
                        {placeCounts[user.id] > 1
                          ? `${placeCounts[user.id]} Coletas cadastradas`
                          : `${placeCounts[user.id]} Coleta cadastrada`}
                      </Link>
                    ) : (
                      `${placeCounts[user.id] || 0} Coletas cadastradas`
                    )
                  ) : (
                    'Carregando...'
                  )}
                </strong>
              </div>
            </div>
            {decodedToken && decodedToken.admin && (
              <>
                <div className='divisor'></div>
                <div className='link-details-users'>
                  <div className='card-detail-actions'>
                    <Link
                      className='btn btn-primary'
                      to={`/users/edit/${user.id}`}
                      title='Editar usuário'
                    >
                      <span>Editar</span>
                    </Link>
                    {placeCounts && placeCounts[user.id] === 0 && (
                      <Link
                        className='btn btn-danger'
                        to={`/users/delete/${user.id}`}
                        title='Excluir usuário'
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            window.confirm(
                              'Tem certeza que deseja deletar este usuário?'
                            )
                          ) {
                            deleteUser(user.id);
                          }
                        }}
                      >
                        <span>Remover</span>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListUsers;
