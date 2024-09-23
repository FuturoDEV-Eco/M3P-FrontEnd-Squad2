import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { useNavigate } from 'react-router-dom';
import { RiMapPinAddFill } from 'react-icons/ri';

function CreatePlaces() {
  let user_id = JSON.parse(localStorage.getItem('user_id'));
  const { createPlace } = useContext(CollectPlaceContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: user_id, // aqui vanda user_id como default após recuperar do localStorage
      collect: '',
    },
  });

  const cep = watch('zipCode');

  useEffect(() => {
    if (cep && cep.length === 9) {
      const apikey = import.meta.env.VITE_GEOCODEAPIKEY
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
          alert('Não amarrar a cara, mas o CEP não foi encontrado');
        }
      })
      .catch((error) =>
        console.error('Que tanso esse programador, erro ao buscar CEP', error)
      );
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setValue("latitude", lat);
          setValue("longitude", lng);
        } else {
          console.error("Nenhum resultado encontrado para o CEP fornecido.");
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados de geolocalização:", error);
      });
    }
  }, [cep, setValue]);

  const onSubmit = (data) => {
    
    createPlace(data);
    reset(); // limpa o formulário após enviar
    navigate('/collectPlaces/listbyuser/' + user_id);
  };

  return (
    <>
      <div className='container-form'>
        <div className='card-form'>
          <div className='page-title-form align-icon'>
            <RiMapPinAddFill /> <span>Cadastrar ponto de coleta</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >
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
              className={errors.street ? 'input-error' : ''}
              type='text'
              placeholder='Rua'
              {...register('street', { required: 'Esqueceu da Rua?' })}
            />
            {errors.street && (
              <small className='error-message'>{errors.street.message}</small>
            )}

            <input
              className={errors.number ? 'input-error' : ''}
              type='text'
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
              className={errors.neighborhood ? 'input-error' : ''}
              type='text'
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
              className={errors.city ? 'input-error' : ''}
              type='text'
              placeholder='Cidade'
              {...register('city', {
                required: 'Cidade precisa, mesmo que seja em Floripa.',
              })}
            />
            {errors.city && (
              <small className='error-message'>{errors.city.message}</small>
            )}
            <input
              className={errors.state ? 'input-error' : ''}
              type='text'
              placeholder='Estado'
              {...register('state', {
                required: 'Faltou aquelas duas letrinhas do eshtado',
              })}
            />
            {errors.state && (
              <small className='error-message'>{errors.state.message}</small>
            )}
            <input
              className={errors.latitude ? 'input-error' : ''}
              type='text'
              placeholder='Latitude'
              {...register('latitude', {
                required: 'Latitude é obrigatória. O google maps te ajuda',
              })}
            />
            {errors.latitude && (
              <small className='error-message'>{errors.latitude.message}</small>
            )}
            <input
              className={errors.longitude ? 'input-error' : ''}
              type='text'
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

            <button type='submit'>Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePlaces;
