import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [filtros, setFiltros] = useState({
    edad: '',
    genero: '',
    diabetes: '',
    fuma: '',
    presion: '',
    colesterol: '',
    nivelRiesgo: '',
  });

  useEffect(() => {
    axios.get('/api/estadisticas')
      .then(response => setPacientes(response.data))
      .catch(error => console.error('Error al obtener los pacientes:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const aplicarFiltros = () => {
    return pacientes.filter(paciente => {
      return (
        (filtros.diabetes === '' || paciente.diabetes === filtros.diabetes) &&
        (filtros.nivelesColesterol === '' || paciente.nivelesColesterol === filtros.nivelesColesterol) &&
        (filtros.genero === '' || paciente.genero === filtros.genero) &&
        (filtros.tabaquismo === '' || paciente.tabaquismo === filtros.tabaquismo) &&
        (filtros.edad === '' || paciente.edad === parseInt(filtros.edad, 10)) &&
        (filtros.presionSistolica === '' || paciente.presionSistolica === parseInt(filtros.presionSistolica, 10)) &&
        (filtros.nivelRiesgo === '' || paciente.nivelRiesgo === filtros.nivelRiesgo)
      );
    });
  };

  const pacientesFiltrados = aplicarFiltros();

  const obtenerColorRiesgo = (nivel) => {
    switch (nivel) {
      case 'Poco':
        return 'bg-green-100 text-green-800';
      case 'Moderado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Alto':
        return 'bg-orange-100 text-orange-800';
      case 'Muy Alto':
        return 'bg-red-100 text-red-800';
      case 'Crítico':
        return 'bg-red-900 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Estadísticas de Pacientes</h1>
      
      <div className="mb-6 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtros */}
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Diabetes?</label>
              <select
                name="diabetes"
                value={filtros.diabetes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Niveles de Colesterol?</label>
              <select
                name="nivelesColesterol"
                value={filtros.nivelesColesterol}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Género</label>
              <select
                name="genero"
                value={filtros.genero}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tabaquismo</label>
              <select
                name="tabaquismo"
                value={filtros.tabaquismo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Edad</label>
              <input
                type="number"
                name="edad"
                value={filtros.edad}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Presión sistólica (mmHg)</label>
              <input
                type="number"
                name="presionSistolica"
                value={filtros.presionSistolica}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nivel de Riesgo</label>
              <select
                name="nivelRiesgo"
                value={filtros.nivelRiesgo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Poco">Poco</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Muy Alto">Muy Alto</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
          </div>
          <button
            onClick={aplicarFiltros}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total de Personas que Coinciden con los Filtros: {pacientesFiltrados.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presión Sistólica</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diabetes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveles de Colesterol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tabaquismo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Riesgo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pacientesFiltrados.map((paciente, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.edad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.presionSistolica}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.diabetes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.nivelesColesterol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.genero}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.tabaquismo}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${obtenerColorRiesgo(paciente.nivelRiesgo)}`}>
                  {paciente.nivelRiesgo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estadisticas;
