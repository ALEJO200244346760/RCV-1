import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [formData, setFormData] = useState({
    edad: '',
    genero: '',
    diabetes: '',
    fumador: '',
    presionArterial: '',
    colesterol: '',
    nivelRiesgo: '',
    ubicacion: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/pacientes/${id}`)
      .then(response => {
        setPaciente(response.data);
        setFormData({
          edad: response.data.edad || '',
          genero: response.data.genero || '',
          diabetes: response.data.diabetes || '',
          fumador: response.data.fumador || '',
          presionArterial: response.data.presionArterial || '',
          colesterol: response.data.colesterol || '',
          nivelRiesgo: response.data.nivelRiesgo || '',
          ubicacion: response.data.ubicacion || '',
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos del paciente:', error);
        setLoading(false);
      });
  }, [id]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || '',
    }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/pacientes/${id}`, formData)
      .then(() => {
        navigate('/estadisticas'); // Redirige a la página de estadísticas después de guardar
      })
      .catch(error => console.error('Error al actualizar el paciente:', error));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editar Paciente</h1>
      <form onSubmit={manejarSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="text"
            name="edad"
            value={formData.edad}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">¿Diabetes?</label>
          <input
            type="text"
            name="diabetes"
            value={formData.diabetes}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">¿Fumador?</label>
          <input
            type="text"
            name="fumador"
            value={formData.fumador}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Presión Arterial</label>
          <input
            type="text"
            name="presionArterial"
            value={formData.presionArterial}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Colesterol</label>
          <input
            type="text"
            name="colesterol"
            value={formData.colesterol}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel de Riesgo</label>
          <input
            type="text"
            name="nivelRiesgo"
            value={formData.nivelRiesgo}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={manejarCambio}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
