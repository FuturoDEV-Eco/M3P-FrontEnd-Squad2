import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Adicionando useLocation para verificar a rota atual
import { UsersContext } from '../../context/UsersContext';
import logo from '../../assets/destinoCerto.png';
import { FaArrowsSpin, FaUserGear, FaUser } from 'react-icons/fa6';
import { RiChatSmile2Line } from 'react-icons/ri';

function Header(actualPage) {
  const { userLogout, isUserAuthenticated, currentUser } =
    useContext(UsersContext);
  const isAdmin = currentUser ? currentUser.admin : false;
  const user_id = currentUser ? currentUser.id : null;

  const location = useLocation(); // Usando useLocation para pegar a rota atual

  // Verifica se a rota atual é a página de login ou cadastro
  const isLoginOrRegisterPage =
    location.pathname === '/login' || location.pathname === '/users/create';

  return (
    <header>
      <div className='header-container'>
        <div
          className={
            !isUserAuthenticated() &&
            (actualPage.actualPage === 'userCreate' ||
              actualPage.actualPage === 'login')
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
              {/* Se não estiver autenticado e não estiver na página de login/cadastro, exibe o link de Login/Cadastro */}
              {!isUserAuthenticated() && !isLoginOrRegisterPage && (
                <li>
                  <Link to='/login'>
                    <FaUser /> Login/Cadastro
                  </Link>
                </li>
              )}
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
                  <li>
                    <Link to='/regional-expressions'>
                      <RiChatSmile2Line /> Expressões
                    </Link>
                  </li>

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
                      <li>
                        <Link to={`/collectPlaces/listbyuser/${user_id}`}>
                          Meus Locais
                        </Link>
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
