import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { UsersContext } from '../context/UsersContext';
let loggedId = JSON.parse(localStorage.getItem('user_id'));
let isAdmin = JSON.parse(localStorage.getItem('admin'));
import { HiMapPin } from 'react-icons/hi2';
import { FaArrowsSpin } from 'react-icons/fa6';
import { MdEditSquare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdTextsms } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { PiWarningOctagonFill } from 'react-icons/pi';
function ListCollectPlacesByUser() {
  const { user_id } = useParams();
  const { getCollectPlacesByUserId, deletePlace } =
    useContext(CollectPlaceContext);
  const [userPlaces, setUserPlaces] = useState([]);
  const { getUserById } = useContext(UsersContext);

  useEffect(() => {
    getCollectPlacesByUserId(user_id)
      .then(setUserPlaces)
      .catch((error) => {
        console.error('Erro ao buscar locais de coleta:', error);
        alert(
          'Sabe aquele boca-mole do programador? Aquele que mora lá pelo Campeche? Pois errou de novo. Falha ao buscar locais de coleta.'
        );
      });
  }, [user_id, getCollectPlacesByUserId]);

  const [userNames, setUserNames] = useState({});

  // Para pegar o nome do usuário que registrou
  useEffect(() => {
    userPlaces.forEach(async (place) => {
      if (place.user_id && !userNames[place.user_id]) {
        try {
          const user = await getUserById(place.user_id);
          setUserNames((prev) => ({ ...prev, [place.user_id]: user.name }));
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }
    });
  }, [userPlaces, getUserById, userNames]);

  return (
    <>
      <div className='page-title align-icon'>
        <HiMapPin /> <span>Meus locais de coleta</span>
      </div>
      {userPlaces.length === 0 ? (
        <div className='card-detail'>
          <div className='card-detail-header'>
            <div className='align-icon'>
              <PiWarningOctagonFill />{' '}
              <span>Voce não possui locais de coleta</span>
            </div>
          </div>
          <div>
            Deseja cadastrar um?{' '}
            <Link to={`/collectPlaces/create`}>Clique aqui</Link>
          </div>
        </div>
      ) : (
        <div>
          {userPlaces.map((place) => (
            <div className='card-detail' key={place.id}>
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
              <div className='card-detail-body'>
                <div className='card-detail-map'>
                  <MapContainer
                    center={[place.latitude, place.longitude]}
                    zoom={13}
                    style={{ height: '400px', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[place.latitude, place.longitude]}>
                      <Popup>
                        <strong>{place.place}</strong> <br />
                        <br /> {place.placeDescription}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className='card-detail-description'>
                  <div className='card-detail-subtitle align-icon'>
                    <MdTextsms /> <span> Ó-lhó-lhó</span>
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
                    <small>{userNames[place.user_id] || 'Carregando...'}</small>
                  </div>
                  
                </div>
              </div>
              <div className="divisor"></div>
              <div className='card-detail-actions'>
                {(isAdmin || loggedId === place.user_id) && (
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
          ))}
        </div>
      )}
    </>
  );
}

export default ListCollectPlacesByUser;
