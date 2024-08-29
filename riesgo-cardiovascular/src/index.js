import React from 'react';
import ReactDOM from 'react-dom/client'; // Actualiza la importación
import './index.css';
import App from './App';

// Crear la raíz del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
