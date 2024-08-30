import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Para redirigir al usuario después del login

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      console.log('Login exitoso');
      navigate('/'); // Redirige a la página principal o a donde necesites
    } catch (error) {
      console.error('Error en el login:', error.response?.data || error.message);
      if (error.response) {
        // Dependiendo del error puedes dar mensajes más específicos
        alert(`Error: ${error.response.data.message || 'Error desconocido'}`);
      } else {
        alert('Error de red o servidor');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center font-bold">Iniciar Sesión</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">Regístrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
