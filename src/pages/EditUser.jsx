import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';
import { FaUserEdit } from 'react-icons/fa';
import '../forms.css';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getUserById,
    updateUser,
    updateCurrentUser,
    currentUser,
    isUserAuthenticated,
  } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/login');
      return;
    }

    setIsAdmin(currentUser?.admin || false);

    async function fetchUserData() {
      try {
        let userData;
        if (id && isAdmin) {
          // Admin editando outro usuário
          userData = await getUserById(id);
        } else {
          // Usuário editando seus próprios dados
          userData = currentUser;
        }

        reset(userData);
        setTimeout(() => {
          setValue('cpf', userData.cpf, { shouldValidate: true });
          setValue('postalcode', userData.postalcode, { shouldValidate: true });
        }, 50);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [
    id,
    reset,
    setValue,
    getUserById,
    currentUser,
    isUserAuthenticated,
    navigate,
    isAdmin,
  ]);

  const cep = watch('postalcode');

  useEffect(() => {
    if (cep && cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue('street', data.logradouro || '');
            setValue('complement', data.complemento || '');
            setValue('neighborhood', data.bairro || '');
            setValue('city', data.localidade || '');
            setValue('state', data.uf || '');
          } else {
            alert('Não amarrar a cara, mas o CEP não foi encontrado.');
          }
        })
        .catch((error) => console.error('Erro ao buscar CEP', error));
    }
  }, [cep, setValue]);

  const onSubmit = async (data) => {
    try {
      // Remove os caracteres não numéricos do CPF e CEP
      const processedData = {
        ...data,
        cpf: data.cpf.replace(/[^\d]/g, ''),
        postalcode: data.postalcode.replace(/[^\d]/g, ''),
      };

      let updateSuccess;
      if (id && isAdmin) {
        // Admin atualizando outro usuário
        updateSuccess = await updateUser(id, processedData);
      } else {
        // Usuário atualizando seus próprios dados
        updateSuccess = await updateCurrentUser(processedData);
      }

      if (updateSuccess) {
        alert('Agora sim Mó Quiridu, conta atualizada com sucesso!');
        navigate(isAdmin ? '/users/list' : '/');
      }
    } catch (error) {
      alert('Oxi o Boca Moli do programador fez algo errado, tente novamente!');
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className='page-title'>
        <FaUserEdit /> <span>Atualizar dados</span>
      </div>
      <div className='container-form'>
        <div className='card-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo Nome */}
            <div className='form-row'>
              <div className='form-field'>
                <label htmlFor='name'>Usuário *</label>
                <input
                  type='text'
                  id='name'
                  className={errors.name ? 'input-error' : ''}
                  placeholder=''
                  {...register('name', {
                    required: 'Oh queridu o nome precisa.',
                  })}
                />
                {errors.name && (
                  <small className='error-message'>{errors.name.message}</small>
                )}
              </div>
            </div>

            {/* Campo Email */}
            <div className='form-row'>
              <div className='form-field'>
                <label htmlFor='email'>E-mail *</label>
                <input
                  type='email'
                  id='email'
                  className={errors.email ? 'input-error' : ''}
                  placeholder=''
                  {...register('email', {
                    required: 'E-mail a gente manda cartinha pro boi de mamão',
                  })}
                />
                {errors.email && (
                  <small className='error-message'>
                    {errors.email.message}
                  </small>
                )}
              </div>
            </div>

            {/* Campo Gênero */}
            <div className='form-row'>
              <div className='form-field'>
                <label>Gênero *</label>
                <div className='gender-field'>
                  <div>
                    <label className={errors.gender ? 'input-error' : ''}>
                      <input
                        {...register('gender', {
                          required: 'Se quex, quex, se não quex, dix',
                        })}
                        type='radio'
                        value='M'
                      />
                      Masculino
                    </label>
                  </div>
                  <div>
                    <label className={errors.gender ? 'input-error' : ''}>
                      <input
                        {...register('gender', {
                          required: 'Se quex, quex, se não quex, dix',
                        })}
                        type='radio'
                        value='F'
                      />
                      Feminino
                    </label>
                  </div>
                  <div>
                    <label className={errors.gender ? 'input-error' : ''}>
                      <input
                        {...register('gender', {
                          required: 'Se quex, quex, se não quex, dix',
                        })}
                        type='radio'
                        value='NI'
                      />{' '}
                      Não informado{' '}
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <small className='error-message'>
                    {errors.gender.message}
                  </small>
                )}
              </div>
            </div>

            {/* Campo CPF e Data de Nascimento */}
            <div className='form-row form-row-2columns'>
              <div className='form-field'>
                <label htmlFor='cpf'>Documento</label>
                <InputMask
                  mask='999.999.999-99'
                  placeholder='CPF'
                  maskChar={null}
                  {...register('cpf', {
                    required: 'Aqueles números do CPF. Não tem? Coloca ai!',
                    validate: {
                      isValidCPF: (value) => {
                        const numericCPF = value.replace(/[^\d]/g, '');
                        return (
                          numericCPF.length === 11 || 'Formato de CPF inválido'
                        );
                      },
                    },
                  })}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      type='text'
                      id='cpf'
                      className={errors.cpf ? 'input-error' : ''}
                    />
                  )}
                </InputMask>
                {errors.cpf && (
                  <small className='error-message'>{errors.cpf.message}</small>
                )}
              </div>
              <div className='form-field'>
                <label htmlFor='birthdate'>Data de Nascimento</label>
                <input
                  type='date'
                  id='birthdate'
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

            <div className='divisor'></div>

            {/* Campo CEP */}
            <div className='form-row'>
              <div className='form-field'>
                <label htmlFor='postalcode'>CEP *</label>
                <InputMask
                  mask='99999-999'
                  placeholder='CEP'
                  maskChar={null}
                  {...register('postalcode', {
                    required: 'Não amarra a cara, mas o CEP é obrigatório',
                    validate: {
                      isValidCEP: (value) => {
                        const numericCEP = value.replace(/[^\d]/g, '');
                        return (
                          numericCEP.length === 8 || 'Formato de CEP inválido'
                        );
                      },
                    },
                  })}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      type='text'
                      id='postalcode'
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

            {/* Campos Endereço */}
            <div className='form-row form-row-2columns dinamicColumns'>
              <div className='form-field'>
                <label htmlFor='street'>Rua *</label>
                <input
                  type='text'
                  id='street'
                  className={errors.street ? 'input-error' : ''}
                  placeholder='Rua'
                  {...register('street', { required: 'Esqueceu da Rua?' })}
                />
                {errors.street && (
                  <small className='error-message'>
                    {errors.street.message}
                  </small>
                )}
              </div>
              <div className='form-field small'>
                <label htmlFor='number'>Número *</label>
                <input
                  type='text'
                  id='number'
                  className={errors.number ? 'input-error' : ''}
                  placeholder='Número'
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

            {/* Campos Complemento e Bairro */}
            <div className='form-row form-row-2columns'>
              <div className='form-field'>
                <label htmlFor='complement'>Complemento</label>
                <input
                  type='text'
                  id='complement'
                  placeholder='Ao lado do mercado'
                  {...register('complement')}
                />
              </div>
              <div className='form-field'>
                <label htmlFor='neighborhood'>Bairro *</label>
                <input
                  type='text'
                  id='neighborhood'
                  className={errors.neighborhood ? 'input-error' : ''}
                  placeholder='Bairro'
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

            {/* Campos Cidade e Estado */}
            <div className='form-row form-row-2columns dinamicColumns'>
              <div className='form-field'>
                <label htmlFor='city'>Cidade *</label>
                <input
                  type='text'
                  id='city'
                  className={errors.city ? 'input-error' : ''}
                  placeholder=''
                  {...register('city', {
                    required: 'É em Floripa? Precisax dizer também.',
                  })}
                />
                {errors.city && (
                  <small className='error-message'>{errors.city.message}</small>
                )}
              </div>
              <div className='form-field small'>
                <label htmlFor='state'>Estado *</label>
                <input
                  type='text'
                  id='state'
                  className={errors.state ? 'input-error' : ''}
                  placeholder='Estado'
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

            {/* Campo Admin */}
            {isAdmin && (
              <div className='form-row'>
                <div className='form-field'>
                  <label>
                    <input type='checkbox' {...register('admin')} /> Admin do
                    Destino Certo
                  </label>
                </div>
              </div>
            )}

            <button type='submit'>Salvar Alterações</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
