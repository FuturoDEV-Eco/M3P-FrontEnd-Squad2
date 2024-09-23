import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../context/UsersContext';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { Link } from 'react-router-dom';
import simbol from '../assets/favicon.png';
import { MdEditSquare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
function ListUsers() {
  const { users, deleteUser } = useContext(UsersContext);
  const { countPlacesByUserId } = useContext(CollectPlaceContext);
  const [placeCounts, setPlaceCounts] = useState(null); // Inicializa como null

  useEffect(() => {
    const loadPlaceCounts = async () => {
      const counts = {};
      for (const user of users) {
        counts[user.id] = await countPlacesByUserId(user.id);
      }
      setPlaceCounts(counts); // Atualiza os contadores para cada usuário
    };

    if (users.length > 0) {
      loadPlaceCounts();
    }
  }, [users]); // Dependência do useEffect são os usuários

  return (
    <>
      <div className='page-title align-icon'>
        <img src={simbol} height={35} alt='Destino certo' />
        <span>Área admin - Usuários</span>
      </div>
      <div className='section-cards'>
        {users.map((user) => (
          <div className='cards' key={user.id}>
            <div className='card-body'>
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
                <strong>Data nascimento:</strong> {user.birthDate}
              </div>
              <div className='success'>
                <strong>Email:</strong> {user.email}
              </div>
              <div className='success'>
                <strong>Endereço:</strong>{' '}
                {`${user.street}, ${user.number} ${user.complement}, ${user.neighborhood}, ${user.city}, ${user.state}, ${user.zipCode}`}
              </div>
              <div className='success'>
                <strong>Administrador:</strong> {user.admin ? 'Sim' : 'Não'}
              </div>
              <div className='success'>
                <strong>
                  {placeCounts ? (
                    placeCounts[user.id] > 0 ? (
                      <Link
                        className='primary-bold'
                        to={`/collectPlaces/listbyuser/${user.id}`}
                        title='Ver coletas do usuário'
                      >
                        {placeCounts[user.id]}
                      </Link>
                    ) : (
                      placeCounts[user.id] || 0
                    )
                  ) : (
                    'Carregando...'
                  )}
                </strong>{' '}
                coleta cadastrada
              </div>
              <div className='link-details-users'>
                {JSON.parse(localStorage.getItem('admin')) && (
                  <>
                    <Link
                      className='primary'
                      to={`/users/edit/${user.id}`}
                      title='Editar usuário'
                    >
                      <MdEditSquare />
                    </Link>
                    {placeCounts && placeCounts[user.id] === 0 && (
                      <Link
                        className='danger'
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
                        <MdDelete />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListUsers;
