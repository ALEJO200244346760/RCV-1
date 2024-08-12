import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPaciente() {
  const { id } = useParams(); // Obtiene el ID del paciente desde la URL
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate
  const [paciente, setPaciente] = useState({
    nombre: '',
    edad: '',
    genero: '',
    diabetes: '',
    tabaquismo: '',
    presionSistolica: '',
    nivelesColesterol: '',
    nivelRiesgo: '',
  });

  useEffect(() => {
    axios.get(`/api/pacientes/${id}`)
      .then(response => setPaciente(response.data))
      .catch(error => console.error('Error al obtener los datos del paciente:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/pacientes/${id}`, paciente)
      .then(() => {
        navigate('/estadisticas'); // Redirige a la página de estadísticas
      })
      .catch(error => console.error('Error al actualizar el paciente:', error));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editar Paciente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={paciente.nombre}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={paciente.edad}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <select
            name="genero"
            value={paciente.genero}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diabetes</label>
          <select
            name="diabetes"
            value={paciente.diabetes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tabaquismo</label>
          <select
            name="tabaquismo"
            value={paciente.tabaquismo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Presión Sistolica</label>
          <input
            type="number"
            name="presionSistolica"
            value={paciente.presionSistolica}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Niveles de Colesterol</label>
          <select
            name="nivelesColesterol"
            value={paciente.nivelesColesterol}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Normal">Normal</option>
            <option value="Elevado">Elevado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel de Riesgo</label>
          <select
            name="nivelRiesgo"
            value={paciente.nivelRiesgo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Poco">Poco</option>
            <option value="Moderado">Moderado</option>
            <option value="Alto">Alto</option>
            <option value="Muy Alto">Muy Alto</option>
            <option value="Crítico">Crítico</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarPaciente;
