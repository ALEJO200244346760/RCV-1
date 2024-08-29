import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Estadisticas from './components/Estadisticas';
import Formulario from './components/Formulario';
import EditarPaciente from './components/EditarPaciente';
import TomarPresion from './components/tomarPresion';
import Login from './components/Login';
import Register from './components/Register'; // Importa el componente Register
import RoleProtectedRoute from './components/RoleProtectedRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/tomarPresion" element={<TomarPresion />} />
        <Route
          path="/estadisticas"
          element={<Estadisticas />}
              allowedRoles={['CARDIOLOGO']}
            />
        <Route
          path="/editar-paciente/:id"
          element={
            <RoleProtectedRoute
              element={<EditarPaciente />}
              allowedRoles={['CARDIOLOGO']}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Añade la ruta para el registro */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Ruta 404 */}
      </Routes>
    </Router>
  );
}

export default App;
