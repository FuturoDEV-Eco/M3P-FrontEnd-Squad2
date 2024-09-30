import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';
import { Link } from 'react-router-dom';
import logo from '../assets/destinoCerto.png';
import Footer from '../components/Footer';
import { FaUserPlus } from 'react-icons/fa';
import { RiCakeFill } from 'react-icons/ri';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';

function CreateUsers() {
  const { createUser } = useContext(UsersContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admin: false,
      accent: 1,
    },
  });
  const cep = watch('postalcode');
  const password = watch('password');

  useEffect(() => {
    if (cep && cep.length === 9) {
      // CEP completo com máscara
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue('street', data.logradouro);
            setValue('neighborhood', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
          } else {
            alert('Não amarrar a cara, mas o CEP não foi encontrado.');
          }
        })
        .catch((error) =>
          console.error('Que tanso esse programador, erro ao buscar CEP', error)
        );
    }
  }, [cep, setValue]);

  const onSubmit = (data) => {
    if (data.password !== data['confirmPassword']) {
      alert('Oh querido as senhas não batem!');
      return;
    }
    defaultValues: {
      admin: false;
      accent: 1;
      0;
    }
    createUser(data);
  };

  return (
    <div className='main'>
      <div className='container'>
        <div className='header-container'>
          <div className='logo-container'>
            <Link to='/'>
              {' '}
              <img src={logo} className='logo' alt='Destino certo' />{' '}
            </Link>
          </div>
        </div>

        <div className='container-form'>
          <div className='card-form'>
            <div className='page-title-form'>
              <FaUserPlus /> <span>Se cadatra Mó Quiridu!</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-row'>
                <span>Dados Pessoais</span>
              </div>

              <div className='form-row form-row-2columns'>
                <div className='form-field'>
                  <label htmlFor=''>Nome Completo</label>
                  <input
                    type='text'
                    className={errors.name ? 'input-error' : ''}
                    placeholder='João da Silva'
                    {...register('name', {
                      required: 'Oh queridu o nome precisa',
                    })}
                  />
                  {errors.name && (
                    <small className='error-message'>
                      {errors.name.message}
                    </small>
                  )}
                </div>
                <div className='form-field'>
                  <label htmlFor=''>Documento</label>
                  <InputMask
                    mask='999.999.999-99'
                    placeholder='CPF'
                    maskChar={null}
                    {...register('cpf', {
                      required: 'Aqueles números do CPF. Não tem? Coloca ai!',
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                        message: 'Formato de CPF inválido',
                      },
                    })}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type='text'
                        className={errors.cpf ? 'input-error' : ''}
                      />
                    )}
                  </InputMask>
                  {errors.cpf && (
                    <small className='error-message'>
                      {errors.cpf.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row form-row-2columns'>
                <div className='form-field'>
                  <label htmlFor=''>Gênero *</label>
                  <div className='gender-field'>
                    <select
                      className={errors.gender ? 'input-error' : ''}
                      {...register('gender', {
                        required: 'Se quex, quex, se não quex, dix',
                      })}
                    >
                      <option value=''>Esolha uma opção</option>
                      <option value='M'>Masculino</option>
                      <option value='F'>Feminino</option>
                      <option value='NI'>Não informado</option>
                    </select>
                  </div>

                  {errors.gender && (
                    <small className='error-message'>
                      {errors.gender.message}
                    </small>
                  )}
                </div>
                <div className='form-field'>
                  <label htmlFor=''>Data de Nascimento</label>
                  <input
                    type='date'
                    className={errors.birthdate ? 'input-error' : ''}
                    {...register('birthdate', {
                      required: 'Dix aqui a data. Ninguém vai saber a idade.',
                    })}
                  />
                  {errors.birthdate && (
                    <small className='error-message'>
                      {errors.birthdate.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row'>
                <span>Dados de Login</span>
              </div>

              <div className='form-row'>
                <div className='form-field'>
                  <label htmlFor=''>E-mail *</label>
                  <input
                    type='email'
                    className={errors.email ? 'input-error' : ''}
                    placeholder='exemplo@exemplo.com'
                    {...register('email', {
                      required: 'A gente manda cartinha pro boi de mamão',
                    })}
                  />
                  {errors.email && (
                    <small className='error-message'>
                      {errors.email.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row form-row-2columns'>
                <div className='form-field'>
                  <label htmlFor=''>Senha *</label>
                  <input
                    type='password'
                    className={errors.password ? 'input-error' : ''}
                    placeholder='Senha'
                    {...register('password', {
                      required: 'Dix uma senha não vai esquecer.',
                      minLength: 6,
                      message: 'É Seix letrinhas no mínimo.',
                    })}
                  />
                  {errors.password && (
                    <small className='error-message'>
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className='form-field'>
                  <label htmlFor=''>Confirme a Senha *</label>
                  <input
                    type='password'
                    className={errors.confirmPassword ? 'input-error' : ''}
                    placeholder='Confirmar senha'
                    {...register('confirmPassword', {
                      required: 'Oh queridu, confirma a senha.',
                      minLength: 6,
                      message: 'É Seix letrinhas no mínimo.',
                    })}
                  />
                  {errors.confirmPassword && (
                    <small className='error-message'>
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row'>
                <span>Endereço</span>
              </div>

              <div className='form-row'>
                <div className='form-field'>
                  <label htmlFor=''>CEP *</label>
                  <InputMask
                    mask='99999-999'
                    placeholder='99999-999'
                    maskChar={null}
                    {...register('postalcode', {
                      required: 'Não amarra a cara, mas o CEP é obrigatório',
                      pattern: /^\d{5}-\d{3}$/,
                    })}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type='text'
                        className={errors.postalcode ? 'input-error' : ''}
                      />
                    )}
                  </InputMask>
                  {errors.postalcode && (
                    <small className='error-message'>
                      {errors.postalcode.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row form-row-2columns dinamicColumns'>
                <div className='form-field'>
                  <label htmlFor=''>Logradouro *</label>
                  <input
                    type='text'
                    className={errors.street ? 'input-error' : ''}
                    placeholder='Rua das perobas'
                    {...register('street', { required: 'Esqueceu da Rua?' })}
                  />
                  {errors.street && (
                    <small className='error-message'>
                      {errors.street.message}
                    </small>
                  )}
                </div>
                <div className='form-field small'>
                  <label htmlFor=''>Número *</label>
                  <input
                    type='text'
                    className={errors.number ? 'input-error' : ''}
                    placeholder='123'
                    {...register('number', {
                      required: 'Se não tem número, coloca s/n',
                    })}
                  />
                  {errors.number && (
                    <small className='error-message'>
                      {errors.number.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row form-row-2columns'>
                <div className='form-field'>
                  <label htmlFor=''>Complemento *</label>
                  <input
                    type='text'
                    placeholder='Ao lado do mercado'
                    {...register('complement')}
                  />
                </div>
                <div className='form-field'>
                  <label htmlFor=''>Bairro *</label>
                  <input
                    type='text'
                    className={errors.neighborhood ? 'input-error' : ''}
                    placeholder='Centro'
                    {...register('neighborhood', {
                      required: 'Os queridus querem saber da vizinhança!',
                    })}
                  />
                  {errors.neighborhood && (
                    <small className='error-message'>
                      {errors.neighborhood.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='form-row form-row-2columns dinamicColumns'>
                <div className='form-field'>
                  <label htmlFor=''>Cidade *</label>
                  <input
                    type='text'
                    className={errors.city ? 'input-error' : ''}
                    placeholder='Florianópolis'
                    {...register('city', {
                      required: 'É em Floripa? Precisax dizer também.',
                    })}
                  />
                  {errors.city && (
                    <small className='error-message'>
                      {errors.city.message}
                    </small>
                  )}
                </div>
                <div className='form-field small'>
                  <label htmlFor=''>Estado *</label>
                  <input
                    type='text'
                    maxLength={2}
                    className={errors.state ? 'input-error' : ''}
                    placeholder='SC'
                    {...register('state', {
                      required: 'Faltou aquelas duas letrinhas do exhtado',
                    })}
                  />
                  {errors.state && (
                    <small className='error-message'>
                      {errors.state.message}
                    </small>
                  )}
                </div>
              </div>
              <button type='submit'>Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateUsers;
