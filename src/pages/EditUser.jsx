import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UsersContext } from '../context/UsersContext';
import { FaUserEdit } from 'react-icons/fa';
import '../forms.css'

let isAdmin = JSON.parse(localStorage.getItem('admin'));

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserById(id);
        reset(userData);
        setTimeout(() => {
          setValue('cpf', userData.cpf, { shouldValidate: true });
          setValue('zipCode', userData.zipCode, { shouldValidate: true });
        }, 50);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id, reset, setValue, getUserById]);
  const cep = watch('zipCode');
  useEffect(() => {
    if (cep && cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue('street', data.logradouro);
            setValue('complement', data.complemento);
            setValue('neighborhood', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
          } else {
            alert('Não amarrar a cara, mas o CEP não foi encontrado.');
          }
        })
        .catch((error) => console.error('Erro ao buscar CEP', error));
    }
  }, [cep, setValue]);

  const onSubmit = async (data) => {
    try {
      const updateSuccess = await updateUser(id, data);
      if (updateSuccess) {
        alert('Agora sim Mó Quiridu, conta atualizada com sucesso!');
        navigate(isAdmin ? '/users/list' : '/');
      }
    } catch (error) {
      alert(
        ' Oxi o Boca Moli do programador fez algo errado, tente novamente!'
      );
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
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">Usuário *</label>
                <input
                  type='text'
                  className={errors.name ? 'input-error' : ''}
                  placeholder=''
                  {...register('name', { required: 'Oh queridu o nome precisa.' })}
                />
                {errors.name && (
                  <small className='error-message'>{errors.name.message}</small>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">E-mail *</label>
                <input
                  type='text'
                  className={errors.email ? 'input-error' : ''}
                  placeholder=''
                  {...register('email', {
                    required: 'E-mail a gente manda cartinha pro boi de mamão',
                  })}
                />
                {errors.email && (
                  <small className='error-message'>{errors.email.message}</small>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">Gênero *</label>
                <div className="gender-field">
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
                  <small className='error-message'>{errors.gender.message}</small>
                )}
              </div>
            </div>
            

            <div className="form-row form-row-2columns">
              <div className='form-field'>
                <label htmlFor="">Documento</label>
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
                  <small className='error-message'>{errors.cpf.message}</small>
                )}
              </div>
              <div className='form-field'>
                <label htmlFor="">Data de Nascimento</label>
                <input
                  type='date'
                  className={errors.birthDate ? 'input-error' : ''}
                  {...register('birthDate', {
                    required: 'Dix aqui a data. Ninguém vai saber a idade.',
                  })}
                />
                {errors.birthDate && (
                  <small className='error-message'>
                    {errors.birthDate.message}
                  </small>
                )}
              </div>
            </div>
            

            <div className="divisor"></div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">CEP *</label>
                <InputMask
                  mask='99999-999'
                  placeholder='CEP'
                  maskChar={null}
                  {...register('zipCode', {
                    required: 'Não amarra a cara, mas o CEP é obrigatório',
                    pattern: /^\d{5}-\d{3}$/,
                    onBlur: (event) => {
                      const cep = getValues('zipCode');
                      if (cep && cep.length === 9) fetchCEP(cep);
                    },
                  })}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      type='text'
                      className={errors.zipCode ? 'input-error' : ''}
                    />
                  )}
                </InputMask>
                {errors.zipCode && (
                  <small className='error-message'>{errors.zipCode.message}</small>
                )}
              </div>
            </div>

            <div className="form-row form-row-2columns dinamicColumns">
              <div className='form-field'>
                <label htmlFor="">Rua *</label>
                <input
                  type='text'
                  className={errors.street ? 'input-error' : ''}
                  placeholder='Rua'
                  {...register('street', { required: 'Esqueceu da Rua?' })}
                />
                {errors.street && (
                  <small className='error-message'>{errors.street.message}</small>
                )}
              </div>
              <div className='form-field small'>
                <label htmlFor="">Número *</label>
                <input
                  type='text'
                  className={errors.number ? 'input-error' : ''}
                  placeholder='Número'
                  {...register('number', {
                    required: 'Se não tem número, coloca s/n',
                  })}
                />
                {errors.number && (
                  <small className='error-message'>{errors.number.message}</small>
                )}
              </div>
            </div>

            <div className="form-row form-row-2columns">
              <div className='form-field'>
                <label htmlFor="">Complmento</label>
                <input
                  type='text'
                  placeholder='Ao lado do mercado'
                  {...register('complement')}
                />
              </div>
              <div className='form-field'>
                <label htmlFor="">Bairro *</label>
                <input
                  type='text'
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

            <div className="form-row form-row-2columns dinamicColumns">
              <div className='form-field'>
                <label htmlFor="">Cidade *</label>
                <input
                  type='text'
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
              <div className="form-field small">
                <label htmlFor="">Estado *</label>
                <input
                  type='text'
                  className={errors.state ? 'input-error' : ''}
                  placeholder='Estado'
                  {...register('state', {
                    required: 'Faltou aquelas duas letrinhas do exhtado',
                  })}
                />
                {errors.state && (
                  <small className='error-message'>{errors.state.message}</small>
                )}
              </div>
            </div>

            {isAdmin && (
              <label>
                <input type='checkbox' {...register('admin')} /> Admin do
                Destino Certo
              </label>
            )}
            <button type='submit'>Salvar Alterações</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
