import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import logo from '../../assets/destinoCerto.png';
import { FaArrowsSpin, FaUserGear, FaGears, FaUser } from 'react-icons/fa6';
import { RiChatSmile2Line } from 'react-icons/ri';

function Header() {
  const {
    userLogout,
    isUserAuthenticated,
    countUserCollectionPoints,
    deleteUser,
    decodedToken,
  } = useContext(UsersContext);

  const [collectionPointsCount, setCollectionPointsCount] = useState(0);

  // Obtém os valores diretamente do token decodificado
  const isAdmin = decodedToken ? decodedToken.admin : false;
  const user_id = decodedToken ? decodedToken.id : null;

  const location = useLocation();

  // Verifica se a rota atual é a página de login ou cadastro
  const isLoginOrRegisterPage =
    location.pathname === '/login' || location.pathname === '/users/create';

  useEffect(() => {
    if (isUserAuthenticated() && decodedToken) {
      countUserCollectionPoints().then((count) => {
        setCollectionPointsCount(count);
      });
    }
  }, [isUserAuthenticated, decodedToken]);

  const handleDeleteAccount = () => {
    if (collectionPointsCount > 0) {
      alert(
        'ôh feio! O queridu tem pontos de coleta ainda. Nós não podemos te mandar embora assim.'
      );
      return;
    }

    if (window.confirm('Táis certo disso? ')) {
      deleteUser(user_id);
    }
  };

  return (
    <header>
      <div className='header-container'>
        <div
          className={
            !isUserAuthenticated() && isLoginOrRegisterPage
              ? 'logo-container center'
              : 'logo-container'
          }
        >
          <Link to='/'>
            <img src={logo} className='logo' alt='Destino certo' />
          </Link>
        </div>

        <div className='nav-container'>
          <nav>
            <ul className='nav-links'>
              {/* Exibe Login/Cadastro se o usuário não estiver autenticado e não estiver na página de login/cadastro */}
              {!isUserAuthenticated() && !isLoginOrRegisterPage && (
                <li>
                  <Link to='/login'>
                    <FaUser /> Login/Cadastro
                  </Link>
                </li>
              )}

              {/* Exibe menus se o usuário estiver autenticado */}
              {isUserAuthenticated() && (
                <>
                  {/* Menu Coletas */}
                  <li className='dropdown'>
                    <div className='dropdown-toggle'>
                      <FaArrowsSpin />
                      <span>Coletas</span>
                    </div>
                    <ul className='dropdown-content'>
                      <li>
                        <Link to='/collectPlaces/create'>Cadastrar</Link>
                      </li>
                      <li>
                        <Link to='/collectPlaces/list'>Listar</Link>
                      </li>
                    </ul>
                  </li>

                  {/* Menu Expressões */}
                  <li className='dropdown'>
                    <div className='dropdown-toggle'>
                      <RiChatSmile2Line />
                      <span>Expressões</span>
                    </div>
                    <ul className='dropdown-content'>
                      <li>
                        <Link to='/regional-expressions'>Ver Expressões</Link>
                      </li>
                    </ul>
                  </li>

                  {/* Menu Admin */}
                  {isAdmin && (
                    <li className='dropdown'>
                      <div className='dropdown-toggle'>
                        <FaGears />
                        <span>Admin</span>
                      </div>
                      <ul className='dropdown-content'>
                        <li>
                          <Link to='/users/list'>Listar Usuários</Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  {/* Menu Perfil */}
                  <li className='dropdown'>
                    <div className='dropdown-toggle'>
                      <FaUserGear />
                      <span>Perfil</span>
                    </div>
                    <ul className='dropdown-content'>
                      <li>
                        <Link to={`/users/edit/${user_id}`}>Editar Perfil</Link>
                      </li>
                      {collectionPointsCount > 0 ? (
                        <li>
                          <Link to={`/collectPlaces/listbyuser/${user_id}`}>
                            Meus Locais: {collectionPointsCount} pontos
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link to='/collectPlaces/create'>
                            Cadastrar Ponto
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          className='btn btn-danger'
                          title='Excluir conta'
                          onClick={handleDeleteAccount}
                        >
                          Encerrar conta
                        </button>
                      </li>
                      <li>
                        <Link
                          to='#'
                          onClick={(e) => {
                            e.preventDefault();
                            userLogout();
                          }}
                        >
                          Sair
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
