import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './components/app/errorBoundary/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
