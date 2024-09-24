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

function Dashboard() {
  const { places, countPlaces } = useContext(CollectPlaceContext);
  const { users, countUsers, getUserById } = useContext(UsersContext);
  const numUsers = countUsers();
  const numPlaces = countPlaces();
  const [userNames, setUserNames] = useState({});

  const MapLink = ({ placeId, children }) => (
    <Link to={`/collectPlaces/details/${placeId}`}>{children}</Link>
  );

  useEffect(() => {
    places.forEach(async (place) => {
      if (place.user_id && !userNames[place.user_id]) {
        try {
          const user = await getUserById(place.user_id);
          setUserNames((prev) => ({ ...prev, [place.user_id]: user.name }));
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }
    });
  }, [places, getUserById, userNames]);

  return (
    <>
      <div className='boxes'>
        <div className='box color-place'>
          <div className='box-icon'>
            <HiMapPin />
          </div>
          <div className='box-number'>{numPlaces}</div>
          <div className='box-title'>Pontos Coleta</div>
        </div>
        <div className='box color-user'>
          <div className='box-icon'>
            <FaUsers />
          </div>
          <div className='box-number'>{numUsers}</div>
          <div className='box-title'>Mó Quiridus</div>
        </div>
      </div>
      <div className='page-title align-icon'>
        <HiMapPin /> <span>Pontos de coleta</span>
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
                    <strong>{place.place}</strong> <br />
                    <br /> {place.placeDescription}
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
                    <strong>{place.place}</strong> <br />
                    <br /> {place.placeDescription}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className='card-body'>
              <div className='align-icon success'>
                <HiMapPin /> <span className='primary-bold'>{place.place}</span>
              </div>
              <div className='align-icon success'>
                <FaArrowsSpin />{' '}
                <span className='primary-bold'>{place.collect}</span>
              </div>
              <div className='align-icon success'>
                <FaMapLocationDot />{' '}
                <small className='primary-bold'>{place.neighborhood}</small>
              </div>

              <div className='align-icon success'>
                <FaUser />{' '}
                <small className='primary-bold'>
                  {userNames[place.user_id] || 'Carregando...'}
                </small>
              </div>
              <div className='link-details'>
                <Link className='btn' to={`/collectPlaces/details/${place.id}`}>
                  <FaEye /> <small>detalhes</small>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
