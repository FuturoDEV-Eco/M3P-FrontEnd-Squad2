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
            <input
              type='text'
              className={errors.place ? 'input-error' : ''}
              placeholder='Nome do ponto de coleta'
              {...register('place', {
                required: 'Dásh um nome para o ponto de coleta',
              })}
            />
            {errors.place && (
              <small className='error-message'>{errors.place.message}</small>
            )}

            <select
              className={errors.collect ? 'input-error' : ''}
              {...register('collect', {
                required: 'Os queridus querem saber o que coleta',
              })}
            >
              <option value=''> Tipo de Coleta</option>
              <option value='Animais Mortos'>Animais Mortos</option>
              <option value='Caixa de Gordura'>Caixa de Gordura</option>
              <option value='Cápsulas de café'>Cápsulas de café</option>
              <option value='Eletrônicos'>Eletrônicos</option>
              <option value='Lâmpadas'>Lâmpadas</option>
              <option value='Óleo de cozinha'>Óleo de cozinha</option>
              <option value='Perfurocortantes'>Perfurocortantes</option>
              <option value='Pilhas e baterias'>Pilhas e baterias</option>
              <option value='Plástico'>Plásticos</option>
              <option value='Remédios ou blisters3'>
                Remédios ou blisters
              </option>
              <option value='Resíduos Verdes(podas)'>
                Resíduos Verdes(podas)
              </option>
              <option value='Resíduos Volumosos'>Resíduos Volumosos</option>
              <option value='Vidros'>Vidros</option>
            </select>
            {errors.collect && (
              <small className='error-message'>{errors.collect.message}</small>
            )}

            <textarea
              className={errors.placeDescription ? 'input-error' : ''}
              placeholder='Descrição do local'
              {...register('placeDescription', {
                required: 'Aproveita e fala sobre o local',
              })}
            />
            {errors.placeDescription && (
              <small className='error-message'>
                {errors.placeDescription.message}
              </small>
            )}

            <InputMask
              mask='99999-999'
              placeholder='CEP'
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

            <input
              type='text'
              className={errors.street ? 'input-error' : ''}
              placeholder='Rua'
              {...register('street', { required: 'Esqueceu da Rua?' })}
            />
            {errors.street && (
              <small className='error-message'>{errors.street.message}</small>
            )}

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

            <input
              type='text'
              placeholder='Complemento'
              {...register('complement')}
            />

            <input
              type='text'
              className={errors.neighborhood ? 'input-error' : ''}
              placeholder='Bairro'
              {...register('neighborhood', {
                required: 'Os queridos querem saber da vizinhança!',
              })}
            />
            {errors.neighborhood && (
              <small className='error-message'>
                {errors.neighborhood.message}
              </small>
            )}

            <input
              type='text'
              className={errors.city ? 'input-error' : ''}
              placeholder='Cidade'
              {...register('city', {
                required: 'Cidade precisa, mesmo que seja em Floripa.',
              })}
            />
            {errors.city && (
              <small className='error-message'>{errors.city.message}</small>
            )}

            <input
              type='text'
              className={errors.state ? 'input-error' : ''}
              placeholder='Estado'
              {...register('state', {
                required: 'Faltou aquelas duas letrinhas do eshtado',
              })}
            />
            {errors.state && (
              <small className='error-message'>{errors.state.message}</small>
            )}

            <input
              type='text'
              className={errors.latitude ? 'input-error' : ''}
              placeholder='Latitude'
              {...register('latitude', {
                required: 'Latitude é obrigatória. O google maps te ajuda',
              })}
            />
            {errors.latitude && (
              <small className='error-message'>{errors.latitude.message}</small>
            )}

            <input
              type='text'
              className={errors.longitude ? 'input-error' : ''}
              placeholder='Longitude'
              {...register('longitude', {
                required: 'Longitude é obrigatória. O google maps te ajuda',
              })}
            />
            {errors.longitude && (
              <small className='error-message'>
                {errors.longitude.message}
              </small>
            )}

            <button type='submit'>Atualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCollectPlace;
