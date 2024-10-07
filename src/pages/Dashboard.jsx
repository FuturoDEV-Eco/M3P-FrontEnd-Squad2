import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { FaArrowsSpin } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { HiMapPin } from 'react-icons/hi2';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaMapLocationDot } from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  const { places, placeCount } = useContext(CollectPlaceContext);
  const { userCount, getUserById } = useContext(UsersContext);

  const MapLink = ({ placeId, children }) => (
    <Link to={`/collectPlaces/details/${placeId}`}>{children}</Link>
  );

  return (
    <>
      <div className='container'>
        <Header actualPage='dashboard' />
        <div className='boxes'>
          <div className='box color-place'>
            <div className='box-icon'>
              <HiMapPin />
            </div>
            <div className='box-number'>{placeCount}</div>
            <div className='box-title'>Pontos Coleta</div>
          </div>
          <div className='box color-user'>
            <div className='box-icon'>
              <FaUsers />
            </div>
            <div className='box-number'>{userCount}</div>
            <div className='box-title'>Mó Quiridus</div>
          </div>
        </div>
        {/* mapa com todos locais */}
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
                center={[-27.6626, -48.49987]} // cordenadas iniciais para o mapa
                zoom={10}
                scrollWheelZoom={false}
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

        <div className='page-title align-icon'>
          <HiMapPin /> <span>Pontos de coleta</span>
        </div>
        <div className='section-cards'>
          {places.map((place) => (
            <div className='cards' key={place.id}>
              <div className='card-map'>
                <MapContainer
                  center={[place.latitude, place.longitude]}
                  scrollWheelZoom={false}
                  zoom={13}
                  style={{ height: '200px', width: '100%' }}
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
              <div className='card-body'>
                <div className='align-icon success'>
                  <HiMapPin />{' '}
                  <span className='primary-bold'>{place.name}</span>
                </div>
                <div className='align-icon success'>
                  <FaArrowsSpin />{' '}
                  <span className='primary-bold'>{place.recycle_types}</span>
                </div>
                <div className='align-icon success'>
                  <FaMapLocationDot />{' '}
                  <small className='primary-bold'>{place.neighborhood}</small>
                </div>

                <div className='align-icon success'>
                  <FaUser />{' '}
                  <small className='primary-bold'>
                    {place.user && place.user.name
                      ? place.user.name
                      : 'Usuário desconhecido'}
                  </small>
                </div>
                <div className='link-details'>
                  <Link
                    className='btn'
                    to={`/collectPlaces/details/${place.id}`}
                  >
                    <FaEye /> <small>detalhes</small>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
