import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Estadisticas from './components/Estadisticas';
import Formulario from './components/Formulario';
import EditarPaciente from './components/EditarPaciente';
import TomarPresion from './components/TomarPresion';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel'; // Verifica la importación
import Rcv from './components/Rcv'; // Importa el nuevo componente
import RoleProtectedRoute from './components/RoleProtectedRoute';
import { useAuth } from './context/AuthContext'; // Asegúrate de importar useAuth

function App() {
  const { token, roles } = useAuth();

  // Verificar si el usuario no está autenticado o si tiene rol 'ENFERMERO'
  const isUnauthenticatedOrNurse = !token || (Array.isArray(roles) && roles.includes('ENFERMERO'));

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={isUnauthenticatedOrNurse ? <Navigate to="/rcv" /> : <Formulario />} />
        <Route path="/rcv" element={<Rcv />} />
        <Route path="/tomarPresion" element={<TomarPresion />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route
          path="/editar-paciente/:id"
          element={
            <RoleProtectedRoute
              element={<EditarPaciente />}
              allowedRoles={['ROLE_CARDIOLOGO']}
            />
          }
        />
        <Route
          path="/admin-panel"
          element={
            <RoleProtectedRoute
              element={<AdminPanel />}
              allowedRoles={['ROLE_CARDIOLOGO']}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Ruta 404 */}
      </Routes>
    </Router>
  );
}

export default App;
