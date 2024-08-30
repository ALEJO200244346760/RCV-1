import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Decodificar el token JWT para obtener la carga útil
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({ nombre: '', apellido: '' });

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      setRoles(decodedToken?.roles || []);
      setUser({
        nombre: decodedToken?.nombre || '',
        apellido: decodedToken?.apellido || ''
      });
    } else {
      setRoles([]);
      setUser({ nombre: '', apellido: '' });
    }
  }, [token]);

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);

      const decodedToken = decodeToken(token);
      setRoles(decodedToken?.roles || []);
      setUser({
        nombre: decodedToken?.nombre || '',
        apellido: decodedToken?.apellido || ''
      });
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Re-lanzar el error para manejarlo en el componente de inicio de sesión
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]);
    setUser({ nombre: '', apellido: '' });
  };

  return (
    <AuthContext.Provider value={{ token, roles, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
