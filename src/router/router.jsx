import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateUsers from '../pages/CreateUsers';
import ListUsers from '../pages/ListUsers';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import EditUser from '../pages/EditUser';
import CreateCollectPlace from '../pages/CreateCollectPlace';
import ListCollectPlaces from '../pages/ListCollectPlaces';
import EditCollectPlace from '../pages/EditCollectPlace';
import ListCollectPlacesByUser from '../pages/ListCollectPlacesByUser';
import DetailsCollectPlace from '../pages/DetailsCollectPlace';
import RegionalExpressions from '../pages/RegionalExpressions';

let isLogged = JSON.parse(localStorage.getItem('isLogged')) || false;
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  return isLogged ? children : <Navigate to='/login' />;
};

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/users/create',
    element: <CreateUsers />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/users/list',
        element: <ListUsers />,
      },
      {
        path: '/users/edit/:id',
        element: <EditUser />,
      },
      {
        path: '/collectPlaces/create',
        element: <CreateCollectPlace />,
      },
      {
        path: '/collectPlaces/list',
        element: <ListCollectPlaces />,
      },
      {
        path: '/collectPlaces/details/:id',
        element: <DetailsCollectPlace />,
      },
      {
        path: '/collectPlaces/edit/:id',
        element: <EditCollectPlace />,
      },
      {
        path: '/collectPlaces/listbyuser/:user_id',
        element: <ListCollectPlacesByUser />,
      },
      {
        path: '/regional-expressions',
        element: <RegionalExpressions />,
      },
    ],
  },
]);

export default routes;
