import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Asume que el rol se guarda en localStorage

  return (
    <header className="bg-red-600 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/formulario" className="text-2xl font-bold hover:text-gray-300">
        <h1>RCV</h1>
      </Link>
      <nav className="space-x-4">
        <Link to="/TomarPresion" className="hover:text-gray-300">Diagnóstico</Link>
        <Link to="/formulario" className="hover:text-gray-300">RCV</Link>
        {token && userRole === 'CARDIOLOGO' && (
          <Link to="/estadisticas" className="hover:text-gray-300">Estadísticas</Link>
        )}
        {!token ? (
          <Link to="/Login" className="hover:text-gray-300">Iniciar Sesión</Link>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              window.location.reload(); // Recarga la página para actualizar el estado del header
            }}
            className="hover:text-gray-300"
          >
            Cerrar Sesión
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
