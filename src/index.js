import React from 'react';
import ReactDOM from 'react-dom/client';

// provider
import { AuthProvider } from 'context/AuthContext';

// Application component
import App from './App';
// styling
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

