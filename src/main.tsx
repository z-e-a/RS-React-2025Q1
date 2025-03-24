import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.scss';
import ErrorBoundary from './app/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
