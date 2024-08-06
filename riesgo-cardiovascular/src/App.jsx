import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Importa el Header
import Estadisticas from './components/Estadisticas';
import Formulario from './components/Formulario';

function App() {
  return (
    <Router>
      <Header />  {/* Muestra el Header en todas las páginas */}
      <Routes>
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/" element={<Estadisticas />} /> {/* Página inicial */}
      </Routes>
    </Router>
  );
}

export default App;
