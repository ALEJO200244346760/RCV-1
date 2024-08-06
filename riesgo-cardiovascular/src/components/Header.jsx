// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Riesgo Cardiovascular</h1>
      <nav className="space-x-4">
        <Link to="/formulario" className="hover:text-gray-300">Formulario</Link>
        <Link to="/estadisticas" className="hover:text-gray-300">Estadísticas</Link>
      </nav>
    </header>
  );
};

export default Header;
