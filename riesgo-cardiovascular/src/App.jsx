import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Importa el Header
import Estadisticas from './components/Estadisticas';
import Formulario from './components/Formulario';
import EditarPaciente from './components/EditarPaciente';
import TomarPresion from './components/tomarPresion';


function App() {
  return (
    <Router>
      <Header />  {/* Muestra el Header en todas las páginas */}
      <Routes>
        <Route path="/" element={<Formulario />} /> {/* Página principal */}
        <Route path="/tomarPresion" element={<TomarPresion />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/editar-paciente/:id" component={EditarPaciente} />
      </Routes>
    </Router>
  );
}

export default App;

