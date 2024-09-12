import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext'; // Asegúrate de la ruta correcta

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout, user } = useAuth(); // Fetch user data from useAuth
  const [userInitials, setUserInitials] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get initials
  const getInitials = (name, surname) => {
    if (!name || !surname) return '';
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  // When user logs in, set the initials
  useEffect(() => {
    if (user) {
      setUserInitials(getInitials(user?.nombre, user?.apellido));
    }
  }, [user]);

  const handleLoginLogout = () => {
    if (token) {
      logout();
    } else {
      window.location.href = '/login'; // O usar <Navigate to="/login" /> si estás en un componente
    }
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
        {token ? (
          <div className="flex items-center space-x-4">
            {/* User initials circle */}
            <div className="user-initials-circle bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
              {userInitials}
            </div>
            <button 
              onClick={handleLoginLogout} 
              className="block lg:inline-block hover:text-gray-300"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="block lg:inline-block hover:text-gray-300">
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
