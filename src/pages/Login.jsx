import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../context/UsersContext';
import logo from '../assets/destinoCerto.png';
function Login() {
  const { userLogin } = useContext(UsersContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  async function makeLogin() {
    await userLogin(user.email, user.password);
  }

  return (
    <div className='login-main'>
      <div className='container-login'>
        <div className='header-container'>
          <div className='logo-container'>
            <img src={logo} className='logo' alt='Destino certo' />
          </div>
        </div>
        <div className='container-form'>
          <div className='card-form'>
            <span>Login</span>
            <form>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="">E-mail</label>
                  <input
                    type='email'
                    value={user.email}
                    onChange={(event) =>
                      setUser({ ...user, email: event.target.value })
                    }
                    id='email'
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="">Senha</label>
                  <input
                    type='password'
                    value={user.password}
                    onChange={(event) =>
                      setUser({ ...user, password: event.target.value })
                    }
                    id='password'
                  />
                </div>
              </div>
              
              
              <button
                className='button-login'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  makeLogin();
                }}
              >
                Entrar
              </button>
            </form>
            <div className='singin'>
              Mó Quiridu ainda não tem conta? <br />
              <Link to='/users/create'>Dázumbanho e te cadastra aqui!</Link>
            </div>
            
          </div>
          <div className='singin'>
            <small>
              {' '}
              Para testar como administrador utilize:
              <br />
              admin@admin.com senha: 123456
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
