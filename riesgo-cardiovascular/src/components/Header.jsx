// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-red-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">RCV</h1>
      <nav className="space-x-4">
        <Link to="/tomarPresion" className="hover:text-gray-300">Diagnostico</Link>
        <Link to="/formulario" className="hover:text-gray-300">RCV</Link>
        <Link to="/estadisticas" className="hover:text-gray-300">Estadísticas</Link>
        <Link to="/Login" className="hover:text-gray-300">Iniciar Sesión</Link>
      </nav>
    </header>
  );
};

export default Header;
