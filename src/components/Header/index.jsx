import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import logo from '../../assets/destinoCerto.png';
import { FaArrowsSpin } from 'react-icons/fa6';
import { FaUserGear } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { FaGears } from 'react-icons/fa6';
import { RiChatSmile2Line } from 'react-icons/ri';

let isAdmin = JSON.parse(localStorage.getItem('admin'));
let user_id = JSON.parse(localStorage.getItem('user_id'));

function Header(actualPage) {
  const { userLogout, isUserAuthenticated } = useContext(UsersContext);
  return (
    <header>
      <div className='header-container'>
        <div className={(!isUserAuthenticated() && (actualPage.actualPage === "userCreate" || actualPage.actualPage === "login")) ? 'logo-container center' : 'logo-container'}>
          <Link to='/'>
            <img src={logo} className='logo' alt='Destino certo' />
          </Link>
        </div>
          {(!isUserAuthenticated() && actualPage.actualPage === "dashboard") && (
            
                <div className='nav-container'>
                  <nav>
                    <ul className='nav-links'>
                      <li className='dropdown'>
                        <div className='dropdown-toggle flex-end'>      
                          <span className='primary'>
                            <Link to='/login'><FaUser /> Login/Cadastro</Link>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              )
            }
          {!!isUserAuthenticated() && (
            <div className='nav-container'>
              <nav>
                <ul className='nav-links'>
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
                  <li className='dropdown'>
                    <div className='dropdown-toggle'>
                      
                      <span className='primary'>
                        <Link to='/regional-expressions'><RiChatSmile2Line /> Expressões</Link>
                      </span>
                    </div>
                  </li>
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
                </ul>
              </nav>
            </div>
          )}
      </div>
    </header>
  );
}

export default Header;
