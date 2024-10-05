import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { Link } from 'react-router-dom';
import { HiMapPin } from 'react-icons/hi2';
import { FaArrowsSpin } from 'react-icons/fa6';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdTextsms } from 'react-icons/md';
import { FaUser, FaEye } from 'react-icons/fa';

function ListCollectPlaces() {
  const { places, deletePlace } = useContext(CollectPlaceContext);
  const { currentUser } = useContext(UsersContext);

  const MapLink = ({ placeId, children }) => (
    <Link to={`/collectPlaces/details/${placeId}`}>{children}</Link>
  );

  return (
    <>
      <div className='page-title align-icon'>
        <HiMapPin /> <span>Locais de coleta</span>
      </div>
      {/* Mapa com todos locais */}
      <div className='card-detail'>
        <div className='card-detail-header'>
          <div className='align-icon'>
            <FaArrowsSpin /> <span>Todos Pontos de Coleta</span>
          </div>
          <div className='align-icon'>
            <span>
              <HiMapPin /> Florianópolis
            </span>
          </div>
        </div>
        <div className='card-detail-body'>
          <div className='card-detail-map'>
            <MapContainer
              center={[-27.6626, -48.49987]} // Coordenadas iniciais para o mapa
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {places.map((place) => (
                <Marker
                  key={place.id}
                  position={[place.latitude, place.longitude]}
                >
                  <Popup>
                    <strong>{place.name}</strong> <br />
                    <br /> {place.description}
                    <br />
                    <br />
                    <MapLink placeId={place.id}>
                      <FaEye /> <small>detalhes</small>
                    </MapLink>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {places.map((place) => (
        <div className='card-detail' key={place.id}>
          <div className='card-detail-header'>
            <div className='align-icon'>
              <FaArrowsSpin /> <span>{place.recycle_types}</span>
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
                    <strong>{place.name}</strong> <br />
                    <br /> {place.description}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className='card-detail-description'>
              <div className='card-detail-subtitle align-icon'>
                <MdTextsms /> <span>Ó-lhó-lhó</span>
              </div>
              {place.name} <br />
              <small> {place.description}</small>
            </div>
            <div className='card-detail-address'>
              <div className='card-detail-subtitle align-icon'>
                <FaMapLocationDot /> <span>Segue reto toda vida</span>
              </div>
              <div className='card-detail-address-text'>
                <div>{`${place.street}, ${place.number} ${place.complement}`}</div>
                <div>{`${place.city} - ${place.state}`}</div>
                <div>{`${place.neighborhood} - ${place.postalcode}`}</div>
              </div>
            </div>
            <div className='card-detail-footer'>
              <div className='card-detail-user'>
                <div className='card-detail-subtitle align-icon'>
                  <FaUser /> <span>Mó Quiridu</span>
                </div>
                <small>
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
      ))}
    </>
  );
}

export default ListCollectPlaces;
