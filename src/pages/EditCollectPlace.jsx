import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { FaMapMarkedAlt } from 'react-icons/fa';

function EditCollectPlace() {
  const { id } = useParams();
  const { getCollectPlaceById, updatePlace } = useContext(CollectPlaceContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchPlaceData() {
      try {
        const placeData = await getCollectPlaceById(id);
        reset(placeData);
        setTimeout(() => {
          setValue('zipCode', placeData.zipCode, { shouldValidate: true });
        }, 50);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do local de coleta:', error);
        setLoading(false);
      }
    }
    fetchPlaceData();
  }, [id, reset, getCollectPlaceById]);

  const cep = watch('zipCode');

  useEffect(() => {
    if (cep && cep.length === 9) {
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
        .catch((error) => console.error('Erro ao buscar CEP', error));
    }
  }, [cep, setValue]);

  const onSubmit = async (data) => {
    try {
      await updatePlace(id, data);
      alert('Dazumbanho! O local de coleta atualizou certinho!');
      navigate(`/collectPlaces/details/${id}`);
    } catch (error) {
      alert(
        'Sabe aquele boca-moli do programador? Aquele que mora lá pelo Campeche? Pois errou de novo. Erro ao atualizar local de coleta'
      );
      console.error('Erro ao atualizar local de coleta:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className='page-title'>
        <FaMapMarkedAlt /> <span>Alterar local de coleta</span>
      </div>
      <div className='container-form'>
        <div className='card-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
              <div className="form-field">
                <label htmlFor="">Nome do ponto de coleta *</label>
                <input
                  type='text'
                  className={errors.place ? 'input-error' : ''}
                  placeholder='Ponto de coleta do Centro'
                  {...register('place', {
                    required: 'Dásh um nome para o ponto de coleta',
                  })}
                />
                {errors.place && (
                  <small className='error-message'>{errors.place.message}</small>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">Tipo de Coleta *</label>
                <select
                  className={errors.collect ? 'input-error' : ''}
                  {...register('collect', {
                    required: 'Os queridus querem saber o que coleta',
                  })}
                >
                  <option value=''>Esolha uma opção</option>
                  <option value='Animais Mortos'>Animais Mortos</option>
                  <option value='Caixa de Gordura'>Caixa de Gordura</option>
                  <option value='Cápsulas de café'>Cápsulas de café</option>
                  <option value='Eletrônicos'>Eletrônicos</option>
                  <option value='Lâmpadas'>Lâmpadas</option>
                  <option value='Óleo de cozinha'>Óleo de cozinha</option>
                  <option value='Perfurocortantes'>Perfurocortantes</option>
                  <option value='Pilhas e baterias'>Pilhas e baterias</option>
                  <option value='Plástico'>Plásticos</option>
                  <option value='Remédios ou blisters'>Remédios ou blisters</option>
                  <option value='Resíduos Verdes(podas)'>Resíduos Verdes(podas)</option>
                  <option value='Resíduos Volumosos'>Resíduos Volumosos</option>
                  <option value='Vidros'>Vidros</option>
                </select>
                {errors.collect && (
                  <small className='error-message'>{errors.collect.message}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="">Descrição do local *</label>
                <textarea
                  className={errors.placeDescription ? 'input-error' : ''}
                  placeholder='Mi conta másh mó quiridu'
                  {...register('placeDescription', {
                    required: 'Aproveita e fala sobre o local',
                  })}
                />
                {errors.placeDescription && (
                  <small className='error-message'>
                    {errors.placeDescription.message}
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
                  placeholder='99999-999'
                  maskChar={null}
                  {...register('zipCode', {
                    required: 'Não amarra a cara, mas o CEP é obrigatório',
                    pattern: /^\d{5}-\d{3}$/,
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
                  className={errors.street ? 'input-error' : ''}
                  type='text'
                  placeholder='Rua das Perobas'
                  {...register('street', { required: 'Esqueceu da Rua?' })}
                />
                {errors.street && (
                  <small className='error-message'>{errors.street.message}</small>
                )}
              </div>
              <div className='form-field small'>
                <label htmlFor="">Número *</label>
                <input
                  className={errors.number ? 'input-error' : ''}
                  type='text'
                  placeholder='123'
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
                <label htmlFor="">Complemento</label>
                <input
                  type='text'
                  placeholder='próximo ao mercado'
                  {...register('complement')}
                />
              </div>
              <div className='form-field'>
                <label htmlFor="">Bairro *</label>
                <input
                  className={errors.neighborhood ? 'input-error' : ''}
                  type='text'
                  placeholder='Centro'
                  {...register('neighborhood', {
                    required: 'Os queridos querem saber da vizinhança!',
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
                  className={errors.city ? 'input-error' : ''}
                  type='text'
                  placeholder='Florianópolis'
                  {...register('city', {
                    required: 'Cidade precisa, mesmo que seja em Floripa.',
                  })}
                />
                {errors.city && (
                  <small className='error-message'>{errors.city.message}</small>
                )}
              </div>
              <div className='form-field small'>
                <label htmlFor="">Estado / UF *</label>
                <input
                    maxLength={2}
                    placeholder='SC'
                    className={errors.state ? 'input-error' : ''}
                    type='text'
                    {...register('state', {
                      required: 'Faltou aquelas duas letrinhas do eshtado',
                    })}
                  />
                  {errors.state && (
                    <small className='error-message'>{errors.state.message}</small>
                  )}
              </div>
            </div>
                
            <div className='form-row form-row-2columns'>
              <div className='form-field'>
                <label>Latitude *</label>
                <input
                  className={errors.latitude ? 'input-error' : ''}
                  type='text'
                  {...register('latitude', {
                    required: 'Latitude é obrigatória. O google maps te ajuda',
                  })}
                />
                {errors.latitude && (
                  <small className='error-message'>{errors.latitude.message}</small>
                )}
              </div>
              <div className='form-field'>
                <label>Longitude *</label>
                <input
                  className={errors.longitude ? 'input-error' : ''}
                  type='text'
                  {...register('longitude', {
                    required: 'Longitude é obrigatória. O google maps te ajuda',
                  })}
                />
                {errors.longitude && (
                  <small className='error-message'>
                    {errors.longitude.message}
                  </small>
                )}
              </div>
            </div>

            <button type='submit'>Atualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCollectPlace;
