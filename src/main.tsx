import { StrictMode } from 'react';
import { Container, createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import ErrorBoundary from './app/ErrorBoundary.tsx';

const root: Container = document.getElementById('root') ?? document.body;
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
