import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EstadisticasGraficos from './EstadisticasGraficos'; // Asegúrate de que la ruta sea correcta

function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({
    edad: '',
    genero: '',
    diabetes: '',
    fumador: '',
    presionArterial: '',
    colesterol: '',
    nivelColesterol: '', // Campo para el nivel específico de colesterol
    nivelRiesgo: '',
    ubicacion: '', // Nuevo campo para la ubicación
  });
  const [nivelColesterolConocido, setNivelColesterolConocido] = useState('todos'); // Estado para el conocimiento del nivel de colesterol
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/pacientes')
      .then(response => {
        setPacientes(response.data);
        setPacientesFiltrados(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los pacientes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    aplicarFiltros(); // Aplica filtros cada vez que cambian
  }, [filtros, nivelColesterolConocido]);

  const manejarSeleccionColesterol = (e) => {
    const valor = e.target.value;
    setNivelColesterolConocido(valor);
    if (valor === 'no') {
      setFiltros(prev => ({
        ...prev,
        nivelColesterol: '', // Resetea el nivel de colesterol específico si se selecciona "no"
      }));
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value || '', // Maneja el valor vacío como cadena vacía
    }));
  };

  const obtenerNivelColesterol = (valor) => {
    if (valor < 154) return 4;
    if (valor >= 155 && valor <= 192) return 5;
    if (valor >= 193 && valor <= 231) return 6;
    if (valor >= 232 && valor <= 269) return 7;
    return 8;
  };

  const aplicarFiltros = () => {
    const filtrados = pacientes.filter(paciente => {
      const edadFiltro = filtros.edad === '' ? null : filtros.edad;
      const presionArterialFiltro = filtros.presionArterial === '' ? null : filtros.presionArterial;
      const nivelColesterolFiltro = filtros.nivelColesterol === '' ? null : Number(filtros.nivelColesterol);
  
      const nivelColesterolPaciente = paciente.colesterol ? obtenerNivelColesterol(Number(paciente.colesterol)) : null;
  
      // Determinar categoría de IMC usando el valor calculado
      const imc = paciente.imc;
      const categoriaIMC = imc < 18.5 ? '<18.5' :
                           (imc >= 18.5 && imc <= 24.9) ? '18.5-24.9' :
                           (imc >= 25 && imc <= 29.9) ? '25-29.9' :
                           (imc >= 30 && imc <= 34.9) ? '30-34.9' :
                           (imc >= 35 && imc <= 39.9) ? '35-39.9' : '40+';
  
      return (
        (edadFiltro === null || paciente.edad.toString() === edadFiltro) &&
        (filtros.genero === '' || paciente.genero.toLowerCase() === filtros.genero.toLowerCase()) &&
        (filtros.diabetes === '' || paciente.diabetes.toLowerCase() === filtros.diabetes.toLowerCase()) &&
        (filtros.fumador === '' || paciente.fumador.toLowerCase() === filtros.fumador.toLowerCase()) &&
        (presionArterialFiltro === null || paciente.presionArterial.toString() === presionArterialFiltro) &&
        (
          nivelColesterolConocido === 'todos' || 
          (nivelColesterolConocido === 'no' && (paciente.colesterol === 'No' || paciente.colesterol === null)) ||
          (nivelColesterolConocido === 'si' && paciente.colesterol !== null && paciente.colesterol !== 'No' && (filtros.nivelColesterol === '' || nivelColesterolPaciente === nivelColesterolFiltro))
        ) &&
        (filtros.nivelRiesgo === '' || (paciente.nivelRiesgo && paciente.nivelRiesgo.toLowerCase() === filtros.nivelRiesgo.toLowerCase())) &&
        (filtros.ubicacion === '' || (paciente.ubicacion && paciente.ubicacion.toLowerCase() === filtros.ubicacion.toLowerCase())) &&
        (filtros.imc === '' || filtros.imc === categoriaIMC)
      );
    });
    setPacientesFiltrados(filtrados);
  };  

  const eliminarPaciente = (id) => {
    axios.delete(`/api/pacientes/${id}`)
      .then(() => {
        setPacientes(pacientes.filter(paciente => paciente.id !== id));
        setPacientesFiltrados(pacientesFiltrados.filter(paciente => paciente.id !== id));
      })
      .catch(error => console.error('Error al eliminar el paciente:', error));
  };

  const editarPaciente = (id) => {
    navigate(`/editar-paciente/${id}`);
  };

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

  const copiarDatos = (paciente) => {
    const datos = `
      ID: ${paciente.id}
      Edad: ${paciente.edad}
      Género: ${paciente.genero}
      Diabetes: ${paciente.diabetes}
      Fumador: ${paciente.fumador}
      Presión Arterial: ${paciente.presionArterial}
      Colesterol: ${paciente.colesterol}
      Nivel de Riesgo: ${paciente.nivelRiesgo}
      Ubicación: ${paciente.ubicacion}
      IMC: ${paciente.imc}
      PESO: ${paciente.peso}
      TALLA: ${paciente.talla}
      FECHA DE REGISTRO: ${paciente.fechaRegistro}
      MEDICAMENTOS: ${paciente.medicamentos}
      HIPERTENSO: ${paciente.hipertenso}
      ACV: ${paciente.acv}
      INFARTO: ${paciente.infarto}
    `;
    navigator.clipboard.writeText(datos)
      .then(() => alert('Datos copiados al portapapeles'))
      .catch(err => console.error('Error al copiar los datos:', err));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Estadísticas de Pacientes</h1>
      
      <div className="mb-6 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtros */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Edad</label>
              <select
                name="edad"
                value={filtros.edad || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Género</label>
              <select
                name="genero"
                value={filtros.genero || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Diabetes?</label>
              <select
                name="diabetes"
                value={filtros.diabetes || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Fumador?</label>
              <select
                name="fumador"
                value={filtros.fumador || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Presión Arterial (mmHg)</label>
              <select
                name="presionArterial"
                value={filtros.presionArterial || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="120">120</option>
                <option value="140">140</option>
                <option value="160">160</option>
                <option value="180">180</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Colesterol</label>
              <select
                name="colesterol"
                value={nivelColesterolConocido}
                onChange={manejarSeleccionColesterol}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {nivelColesterolConocido === 'si' && (
                <select
                  name="nivelColesterol"
                  value={filtros.nivelColesterol || ''}
                  onChange={manejarCambio}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Seleccione un Nivel</option>
                  <option value="4">Muy Bajo</option>
                  <option value="5">Bajo</option>
                  <option value="6">Moderado</option>
                  <option value="7">Alto</option>
                  <option value="8">Muy Alto</option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nivel de Riesgo</label>
              <select
                name="nivelRiesgo"
                value={filtros.nivelRiesgo || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="<10% Bajo">Bajo</option>
                <option value=">10% <20% Moderado">Moderado</option>
                <option value=">20% <30% Alto">Alto</option>
                <option value=">30% <40% Muy Alto">Muy Alto</option>
                <option value=">40% Crítico">Crítico</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ubicación</label>
              <select
                name="ubicacion"
                value={filtros.ubicacion || ''}
                onChange={manejarCambio}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="DEM NORTE">DEM NORTE</option>
                <option value="DEM CENTRO">DEM CENTRO</option>
                <option value="DEM OESTE">DEM OESTE</option>
                <option value="DAPS">DAPS</option>
                <option value="HPA">HPA</option>
                <option value="HU">HU</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700">IMC</label>
            <select
              name="imc"
              value={filtros.imc || ''}
              onChange={manejarCambio}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="<18.5">Menor a 18.5</option>
              <option value="18.5-24.9">Saludable (18.5 - 24.9)</option>
              <option value="25-29.9">Sobrepeso (25 - 29.9)</option>
              <option value="30-34.9">Obesidad 1 (30 - 34.9)</option>
              <option value="35-39.9">Obesidad 2 (35 - 39.9)</option>
              <option value="40+">Obesidad 3 (40+)</option>
            </select>
          </div>

          <button
            onClick={aplicarFiltros}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Gráficos */}
      <EstadisticasGraficos pacientesFiltrados={pacientesFiltrados} />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total de Personas que Coinciden con los Filtros: {pacientesFiltrados.length}</h2>
      </div>

      <div className="mt-6">
  <div className="hidden lg:block overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diabetes</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fumador</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presión Arterial</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colesterol</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Riesgo</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pacientesFiltrados.map(paciente => (
          <tr key={paciente.id}>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paciente.id}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.edad}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.genero}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.diabetes}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.fumador}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.presionArterial}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.colesterol}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${obtenerColorRiesgo(paciente.nivelRiesgo)}`}>
                {paciente.nivelRiesgo}
              </span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.ubicacion}</td>
            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => editarPaciente(paciente.id)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarPaciente(paciente.id)}
                className="ml-4 text-red-600 hover:text-red-900"
              >
                Eliminar
              </button>
              <button
                onClick={() => copiarDatos(paciente)}
                className="ml-4 text-blue-600 hover:text-blue-900"
              >
                Copiar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modo móvil */}
  <div className="lg:hidden">
    {pacientesFiltrados.map(paciente => (
      <div key={paciente.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">ID:</div>
          <div className="text-sm text-gray-500">{paciente.id}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Edad:</div>
          <div className="text-sm text-gray-500">{paciente.edad}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Género:</div>
          <div className="text-sm text-gray-500">{paciente.genero}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Diabetes:</div>
          <div className="text-sm text-gray-500">{paciente.diabetes}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Fumador:</div>
          <div className="text-sm text-gray-500">{paciente.fumador}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Presión Arterial:</div>
          <div className="text-sm text-gray-500">{paciente.presionArterial}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Colesterol:</div>
          <div className="text-sm text-gray-500">{paciente.colesterol}</div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Nivel de Riesgo:</div>
          <div className="text-sm text-gray-500">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${obtenerColorRiesgo(paciente.nivelRiesgo)}`}>
              {paciente.nivelRiesgo}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-gray-900">Ubicación:</div>
          <div className="text-sm text-gray-500">{paciente.ubicacion}</div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => editarPaciente(paciente.id)}
            className="text-indigo-600 hover:text-indigo-900 mr-4"
          >
            Editar
          </button>
          <button
            onClick={() => eliminarPaciente(paciente.id)}
            className="text-red-600 hover:text-red-900 mr-4"
          >
            Eliminar
          </button>
          <button
            onClick={() => copiarDatos(paciente)}
            className="text-blue-600 hover:text-blue-900"
          >
            Copiar
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  </div>
);
}

export default Estadisticas;
