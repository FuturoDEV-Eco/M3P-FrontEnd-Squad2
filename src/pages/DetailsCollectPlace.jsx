import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams, Link } from 'react-router-dom';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { HiMapPin } from 'react-icons/hi2';
import { FaArrowsSpin } from 'react-icons/fa6';
import { MdEditSquare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdTextsms } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

function DetailsCollectPlace() {
  const { id } = useParams();
  const { getCollectPlaceById, deletePlace } = useContext(CollectPlaceContext);
  const { currentUser } = useContext(UsersContext);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // Busca o ponto de coleta com o usuário já incluído
        const fetchedPlace = await getCollectPlaceById(id);
        setPlace(fetchedPlace);
      } catch (error) {
        console.error('Falha ao recuperar informações:', error);
      }
    };
    fetchPlace();
  }, [id, getCollectPlaceById]);

  if (!place) {
    return <div>Carregando...</div>; // Mensagem de carregamento enquanto não tem dados
  }
  const position = [place.latitude, place.longitude];
  return (
    <>
      <div className='page-title'>
        <span>Detalhes do Ponto de Coleta</span>
      </div>
      <div className='card-detail'>
        <div className='card-detail-header'>
          <div>
            <div className='align-icon'>
              <HiMapPin /> <span>{place.name}</span>
            </div>
            <div className='align-icon'>
              <FaArrowsSpin /> <span>{place.recycle_types}</span>
            </div>
          </div>
          <div className='align-icon'>
            <span>
              <HiMapPin /> {place.neighborhood}
            </span>
          </div>
        </div>
        <div className='card-detail-map'>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <strong>{place.name}</strong> <br />
                <br /> {place.description}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className='card-detail-body'>
          <div className='card-detail-description'>
            <div className='card-detail-subtitle align-icon'>
              <MdTextsms /> <span>Ó-lhó-lhó</span>
            </div>
            {place.name} <br /> {place.description}
          </div>
          <div className='card-detail-address'>
            <div className='card-detail-subtitle align-icon'>
              <FaMapLocationDot /> <span>Segue reto toda vida</span>
            </div>
            <div className='card-detail-address-text'>
              <div>{`${place.street}, ${place.number} ${
                place.complement ? place.complement : ''
              }`}</div>
              <div>{`${place.city} - ${place.state}`}</div>
              <div>{` ${place.neighborhood} - ${place.postalcode}`}</div>
            </div>
          </div>
          <div className='card-detail-footer'>
            <div className='card-detail-user'>
              <div className='card-detail-subtitle align-icon'>
                <FaUser /> <span>Mó Quiridu</span>
              </div>
              <small>
                {' '}
                {place.user && place.user.name
                  ? place.user.name
                  : 'Usuário desconhecido'}
              </small>
            </div>
          </div>
        </div>
        <div className='divisor'></div>
        <div className='card-detail-actions'>
          {currentUser &&
            (currentUser.admin || currentUser.id === place.user_id) && (
              <>
                <Link
                  className='btn btn-danger'
                  title='Excluir ponto de coleta'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Tem certeza que deseja deletar este local de coleta?'
                      )
                    ) {
                      deletePlace(place.id);
                    }
                  }}
                >
                  <span>Remover</span>
                </Link>
                <Link
                  className='btn btn-primary'
                  to={`/collectPlaces/edit/${place.id}`}
                  title='Editar ponto de coleta'
                >
                  <span>Editar</span>
                </Link>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default DetailsCollectPlace;
