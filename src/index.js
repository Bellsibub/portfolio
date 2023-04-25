import React from 'react';
import ReactDOM from 'react-dom/client';

// provider
import { AuthProvider } from 'context/AuthContext';

// Application component
import App from './App';
// styling
import './index.css';
import { ViewportProvider } from 'context/ViewportContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ViewportProvider>
        <App />
      </ViewportProvider>
    </AuthProvider>
  </React.StrictMode>
);
