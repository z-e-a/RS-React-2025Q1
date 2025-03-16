import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import '../index.scss';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import { store } from './app/store';
import UncontrolledForm from './pages/UncontrolledForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" replace />,
    errorElement: <NotFound />,
  },
  {
    path: 'home/*',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: 'uncontrolled/*',
    element: <UncontrolledForm />,
    errorElement: <NotFound />,
  },
  {
    path: 'controlled/*',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
