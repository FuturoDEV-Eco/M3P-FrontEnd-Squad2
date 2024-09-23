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

let loggedId = JSON.parse(localStorage.getItem('user_id'));
let isAdmin = JSON.parse(localStorage.getItem('admin'));

function DetailsCollectPlace() {
  const { id } = useParams();
  const { getCollectPlaceById, deletePlace } = useContext(CollectPlaceContext);
  const { getUserById } = useContext(UsersContext);
  const [place, setPlace] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchPlaceAndUser = async () => {
      try {
        const fetchedPlace = await getCollectPlaceById(id);
        setPlace(fetchedPlace); // Atualiza o estado com os dados recebidos
        const user = await getUserById(fetchedPlace.user_id); // Assumindo que getUserById é assíncrona
        setUserName(user.name);
      } catch (error) {
        console.error('Falha ao recuperar informações:', error);
      }
    };
    console.log(place)
    fetchPlaceAndUser();
  }, [id, getCollectPlaceById, getUserById]);

  if (!place) {
    return <div>Carregando...</div>; // Mensagem de carregamento enquanto não tem dados
  }
  const position = [place.latitude, place.longitude];
  return (
    <>
      <div className='page-title align-icon'>
        <HiMapPin /> <span>{place.place}</span>
      </div>
      <div className='card-detail'>
        <div className='card-detail-header'>
          <div className='align-icon'>
            <FaArrowsSpin /> <span>{place.collect}</span>
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
                <strong>{place.place}</strong> <br />
                <br /> {place.placeDescription}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className='card-detail-body'>
          <div className='card-detail-description'>
            <div className='card-detail-subtitle align-icon'>
              <MdTextsms /> <span>Ó-lhó-lhó</span>
            </div>
            {place.place} <br /> {place.placeDescription}
          </div>
          <div className='card-detail-address'>
            <div className='card-detail-subtitle align-icon'>
              <FaMapLocationDot /> <span>Segue reto toda vida</span>
            </div>
            <div className='card-detail-address-text'>
              <div>{`${place.street}, ${place.number} ${place.complement}`}</div>
              <div>{`${place.city} - ${place.state}`}</div>
              <div>{` ${place.neighborhood} - ${place.zipCode}`}</div>
            </div>
          </div>
          <div className='card-detail-footer'>
            <div className='card-detail-user'>
              <div className='card-detail-subtitle align-icon'>
                <FaUser /> <span>Mó Quiridu</span>
              </div>
              <small>{userName || 'Carregando...'}</small>
            </div>
            <div className='card-detail-actions'>
              {(isAdmin || loggedId === place.user_id) && (
                <>
                  <Link
                    className='primary'
                    to={`/collectPlaces/edit/${place.id}`}
                    title='Editar ponto de coleta'
                  >
                    <MdEditSquare />
                  </Link>
                  <Link
                    className='danger'
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
                    <MdDelete />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsCollectPlace;
