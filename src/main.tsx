import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.scss';
import ErrorBoundary from './app/ErrorBoundary.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import NotFound from './pages/NotFound';
import PersonDetail from './widgets/PersonDetail';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="search" replace />,
    errorElement: <NotFound />,
  },
  {
    path: 'search/*',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: 'detail',
        element: <PersonDetail />,
      },
    ],
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
