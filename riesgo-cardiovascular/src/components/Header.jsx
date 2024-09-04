// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Necesitarás instalar react-icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-red-600 text-white py-4 px-6 flex justify-between items-center relative">
      <Link to="/formulario" className="text-2xl font-bold hover:text-gray-300">
        <h1>RCV</h1>
      </Link>

      <button 
        onClick={toggleMenu} 
        className="lg:hidden flex items-center text-white"
      >
        {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      <nav className={`lg:flex lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <Link to="/tomarPresion" className="block lg:inline-block hover:text-gray-300">Diagnóstico</Link>
        <Link to="/formulario" className="block lg:inline-block hover:text-gray-300">RCV</Link>
        <Link to="/estadisticas" className="block lg:inline-block hover:text-gray-300">Estadísticas</Link>
        <Link to="/login" className="block lg:inline-block hover:text-gray-300">Iniciar Sesión</Link>
      </nav>
    </header>
  );
};

export default Header;
