// Estadisticas.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// import EstadisticasGraficos from './EstadisticasGraficos'; // COMENTADO: ERROR DE RESOLUCIÓN
// import { obtenerColorRiesgo } from './ConstFormulario'; // COMENTADO: ERROR DE RESOLUCIÓN

// Función Stub (temporal) para reemplazar obtenerColorRiesgo y evitar errores de compilación
const obtenerColorRiesgo = (nivelRiesgo) => {
    switch (nivelRiesgo) {
        case 'Bajo': return 'bg-green-200 text-green-800';
        case 'Moderado': return 'bg-yellow-200 text-yellow-800';
        case 'Alto': return 'bg-orange-200 text-orange-800';
        case 'Muy Alto': return 'bg-red-200 text-red-800';
        case 'Crítico': return 'bg-purple-200 text-purple-800';
        default: return 'bg-gray-200 text-gray-800';
    }
};

const apiBaseURL = '/api/pacientes'; 
const axiosInstance = axios.create({
    baseURL: 'https://rcv-production.up.railway.app', // Ajusta esto a tu baseURL real si es necesario
    // Otras configuraciones de Axios si las tienes
});

// Iconos simples para los botones de acción
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v4a1 1 0 001 1h4m-4 0h4m-4 0h4m4-4h4a1 1 0 011 1v12a1 1 0 01-1 1h-8a1 1 0 01-1-1v-4m-4-8h4m-4 0h4m-4 0h4m-4 0h4m-4-4h4a1 1 0 001-1V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v4" /></svg>;


function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarGraficos, setMostrarGraficos] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false); 
  const [mensaje, setMensaje] = useState(null);

  // Estados de filtros actualizados con los nuevos campos
  const [filtros, setFiltros] = useState({
    edad: '',
    imc: '',
    conoceColesterol: '',
    nivelColesterol: '',
    tensionSistolica: '',
    fumador: '',
    tomaMedicacion: '',
    nivelRiesgo: '',
    actividadFisica: '',
    horasSueno: '',
    estresCronico: '',
    tumoresGinecologicos: '',
    enfermedadesAutoinmunes: '',
    tuvoHijos: '',
    ciclosMenstruales: '',
    histerectomia: '',
    menopausia: '',
    // --- NUEVOS FILTROS DE SALUD MAMARIA ---
    familiarCancerMama: '',
    puncionMama: '',
    mamaDensa: '',
    // ----------------------
  });

  const fetchPacientes = () => {
    setLoading(true);
    axiosInstance.get(apiBaseURL)
      .then(resp => {
        setPacientes(resp.data);
      })
      .catch(err => {
        console.error("Error al cargar pacientes:", err);
        setMensaje({ type: 'error', text: 'Error al cargar pacientes. Revisa la consola.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const clearFiltros = () => {
    setFiltros({
        edad: '', imc: '', conoceColesterol: '', nivelColesterol: '', tensionSistolica: '', 
        fumador: '', tomaMedicacion: '', nivelRiesgo: '', actividadFisica: '', horasSueno: '', 
        estresCronico: '', tumoresGinecologicos: '', enfermedadesAutoinmunes: '', tuvoHijos: '', 
        ciclosMenstruales: '', histerectomia: '', menopausia: '', 
        familiarCancerMama: '', puncionMama: '', mamaDensa: '', // Limpia los nuevos filtros
    });
  };
  
  // Función para manejar la eliminación de pacientes
  const handleDelete = async (id, dni) => {
    if (window.confirm(`¿Estás seguro de eliminar el paciente con DNI: ${dni}? Esta acción es irreversible.`)) {
        try {
            await axiosInstance.delete(`${apiBaseURL}/${id}`);
            
            // Si la eliminación fue exitosa, actualiza la lista
            setPacientes(prev => prev.filter(p => p.id !== id));
            setMensaje({ type: 'success', text: `Paciente con DNI ${dni} eliminado con éxito.` });

        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
            setMensaje({ type: 'error', text: `Error al eliminar el paciente con DNI ${dni}.` });
        }
        setTimeout(() => setMensaje(null), 3000); // Ocultar mensaje
    }
  };

  // Función para copiar datos de una tarjeta al portapapeles
  const handleCopy = (paciente) => {
    const dataToCopy = `
    DNI: ${paciente.dni}
    Edad: ${paciente.edad}
    Riesgo: ${paciente.nivelRiesgo}
    IMC: ${paciente.imc}
    Tensión Sistólica: ${paciente.tensionSistolica}
    Familiar Cáncer Mama: ${paciente.familiarCancerMama}
    Mama Densa: ${paciente.mamaDensa}
    Fuma: ${paciente.fumaDiario}
    ...
    `;
    
    // Usar execCommand ya que navigator.clipboard puede fallar en iframes
    const el = document.createElement('textarea');
    el.value = dataToCopy.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setMensaje({ type: 'success', text: `Datos del paciente ${paciente.dni} copiados al portapapeles.` });
    setTimeout(() => setMensaje(null), 3000);
  };


  // Lógica de filtrado de pacientes
  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(p => {
      // Función auxiliar para chequear si el campo tiene un valor y si no coincide
      const checkFilter = (field, filterValue) => {
        if (!filterValue) return true;
        
        // Manejo especial para campos que contienen arrays como string (ej. 'Diabetes, Otras')
        if (field === 'medicacionCondiciones' || field === 'tumoresTipo' || field === 'autoinmunesTipo') {
            const patientValue = p[field] || '';
            // Si el valor del filtro es 'Sí' o 'No' (para saber si tiene alguna condición)
            if (filterValue === 'Sí') return patientValue.length > 0 && patientValue !== 'No';
            if (filterValue === 'No') return patientValue.length === 0 || patientValue === 'No';
            // Para filtros específicos dentro del array (no implementado en el UI actual, pero seguro para el backend)
            return patientValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        const patientValue = String(p[field] || '').toLowerCase();
        return patientValue.includes(filterValue.toLowerCase());
      };
      
      const checkNumericFilter = (field, filterValue, operator = '>=') => {
          if (!filterValue) return true;
          const patientNum = parseFloat(p[field]);
          const filterNum = parseFloat(filterValue);

          if (isNaN(patientNum) || isNaN(filterNum)) return true; // Ignorar si no son números válidos

          if (operator === '>=') return patientNum >= filterNum;
          if (operator === '<=') return patientNum <= filterNum;
          if (operator === '===') return patientNum === filterNum;
          return true;
      };

      // 1. Filtros de String/Booleano (Sí/No/Valor)
      if (!checkFilter('fumaDiario', filtros.fumador)) return false;
      if (!checkFilter('tomaMedicacionDiario', filtros.tomaMedicacion)) return false;
      if (!checkFilter('nivelRiesgo', filtros.nivelRiesgo)) return false;
      if (!checkFilter('actividadFisica', filtros.actividadFisica)) return false;
      if (!checkFilter('horasSueno', filtros.horasSueno)) return false;
      if (!checkFilter('estresCronico', filtros.estresCronico)) return false;
      if (!checkFilter('tumoresGinecologicos', filtros.tumoresGinecologicos)) return false;
      if (!checkFilter('enfermedadesAutoinmunes', filtros.enfermedadesAutoinmunes)) return false;
      if (!checkFilter('tuvoHijos', filtros.tuvoHijos)) return false;
      if (!checkFilter('ciclosMenstruales', filtros.ciclosMenstruales)) return false;
      if (!checkFilter('histerectomia', filtros.histerectomia)) return false;
      if (!checkFilter('menopausia', filtros.menopausia)) return false;
      // --- NUEVOS FILTROS ---
      if (!checkFilter('familiarCancerMama', filtros.familiarCancerMama)) return false;
      if (!checkFilter('puncionMama', filtros.puncionMama)) return false;
      if (!checkFilter('mamaDensa', filtros.mamaDensa)) return false;

      // 2. Filtros Numéricos (Edad, Tensión Sistólica, Colesterol)
      // Se filtra por Edad mínima
      if (!checkNumericFilter('edad', filtros.edad)) return false;
      // Se filtra por Tensión Sistólica mínima
      if (!checkNumericFilter('tensionSistolica', filtros.tensionSistolica)) return false;

      // 3. Filtro de Colesterol
      if (filtros.conoceColesterol === 'Sí' && p.colesterol === 'No') return false;
      if (filtros.conoceColesterol === 'No' && p.colesterol !== 'No') return false;
      if (filtros.nivelColesterol && p.colesterol !== 'No' && !checkNumericFilter('colesterol', filtros.nivelColesterol)) return false;

      // 4. Filtro de IMC (se puede complicar si el IMC viene como string "25.5 (Sobrepeso)", pero filtramos por el valor numérico al inicio del string)
      if (filtros.imc) {
        const imcValue = p.imc ? parseFloat(p.imc.split(' ')[0]) : NaN;
        const filterNum = parseFloat(filtros.imc);
        if (!isNaN(imcValue) && !isNaN(filterNum) && imcValue < filterNum) return false;
      }
      
      return true;
    });
  }, [pacientes, filtros]);
  
  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold">Cargando datos de pacientes...</div>;
  }

  // Componente de Tarjeta de Paciente (Subcomponente interno)
  const PacienteCard = ({ p }) => {
    // Para manejar el caso donde los arrays vuelven como strings desde el backend (ej. "Diabetes, Hipertensión")
    const getListItems = (data) => data ? (Array.isArray(data) ? data.join(', ') : data) : 'N/A';
    
    // Función para navegación (simulada aquí, en una aplicación real usarías useRouter o similar)
    const handleEdit = (id) => {
        // En una aplicación real usarías un router, aquí simulamos la URL que mencionaste
        window.location.href = `/editar-paciente/${id}`; 
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:shadow-2xl transition duration-300">
            <div className="flex justify-between items-start mb-4 border-b pb-3">
                <h3 className="text-xl font-extrabold text-gray-800">Paciente: <span className="text-indigo-600">{p.dni}</span></h3>
                <div className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${obtenerColorRiesgo(p.nivelRiesgo)}`}>
                    {p.nivelRiesgo}
                </div>
            </div>
            
            <div className="space-y-1 text-sm text-gray-700">
                <div className="grid grid-cols-2 gap-x-4">
                    <p><strong>Edad:</strong> {p.edad} años</p>
                    <p><strong>Sexo:</strong> {p.genero}</p>
                    <p><strong>IMC:</strong> {p.imc}</p>
                    <p><strong>Tensión Sistólica:</strong> {p.tensionSistolica}</p>
                    <p><strong>Colesterol:</strong> {p.colesterol}</p>
                    <p><strong>Fuma:</strong> {p.fumaDiario}</p>
                </div>
                
                <hr className="my-2"/>
                <p className="font-semibold text-sm text-gray-600">Salud Mamaria:</p>
                
                {/* --- NUEVOS CAMPOS EN TARJETA --- */}
                <div className="grid grid-cols-2 gap-x-4">
                    <p><strong>Familiar Cáncer Mama:</strong> {p.familiarCancerMama}</p>
                    <p><strong>Punción Mama:</strong> {p.puncionMama}</p>
                    <p><strong>Mama Densa:</strong> {p.mamaDensa}</p>
                </div>
                
                <hr className="my-2"/>
                <p className="font-semibold text-sm text-gray-600">Otras Condiciones:</p>
                
                <div>
                  <strong>Medicación/Condiciones:</strong> {p.tomaMedicacionDiario} ({getListItems(p.medicacionCondiciones)})
                </div>
                <div>
                  <strong>Tumores ginecológicos:</strong> {p.tumoresGinecologicos}{' '}{p.tumoresGinecologicos === 'Sí' ? `(${getListItems(p.tumoresTipo)})` : ''}
                </div>

                <div>
                  <strong>Enf. autoinmunes:</strong> {p.enfermedadesAutoinmunes}{' '}{p.enfermedadesAutoinmunes === 'Sí' ? `(${getListItems(p.autoinmunesTipo)})` : ''}
                </div>
                
                <div className="pt-2 text-xs text-gray-500">Registrado: {p.fechaRegistro}</div>
            </div>

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                <button 
                    onClick={() => handleCopy(p)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="Copiar datos principales"
                >
                    <CopyIcon /> <span>Copiar</span>
                </button>
                <button 
                    onClick={() => handleEdit(p.id)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    title="Editar paciente"
                >
                    <EditIcon /> <span>Editar</span>
                </button>
                <button 
                    onClick={() => handleDelete(p.id, p.dni)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Eliminar paciente"
                >
                    <TrashIcon /> <span>Eliminar</span>
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Estadísticas y Gestión de Pacientes</h1>
      
      {/* Mensaje de éxito/error */}
      {mensaje && (
        <div className={`p-3 mb-4 rounded-lg text-white font-medium ${mensaje.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {mensaje.text}
        </div>
      )}

      {/* Botón para mostrar/ocultar filtros */}
      <div className="mb-4">
        <button 
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center"
        >
            {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${mostrarFiltros ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      {/* --- SECCIÓN DE FILTROS --- */}
      <div className={`bg-white p-6 rounded-xl shadow-lg mb-8 transition-all duration-500 ease-in-out overflow-hidden ${mostrarFiltros ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 p-0'}`}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Filtros de Pacientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Edad Mínima */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Edad Mínima:</label>
            <input type="number" name="edad" value={filtros.edad} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
          </div>
          
          {/* IMC Mínimo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">IMC Mínimo:</label>
            <input type="number" name="imc" value={filtros.imc} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
          </div>

          {/* Tensión Sistólica Mínima */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">T. Sistólica Mínima:</label>
            <input type="number" name="tensionSistolica" value={filtros.tensionSistolica} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
          </div>

          {/* Nivel de Riesgo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Nivel de Riesgo:</label>
            <select name="nivelRiesgo" value={filtros.nivelRiesgo} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Muy Alto">Muy Alto</option>
                <option value="Crítico">Crítico</option>
            </select>
          </div>

          {/* Fumador */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Fumador:</label>
            <select name="fumador" value={filtros.fumador} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>

          {/* Estrés Crónico */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Estrés Crónico:</label>
            <select name="estresCronico" value={filtros.estresCronico} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>
          
          {/* --- FILTROS DE SALUD MAMARIA --- */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Familiar Cáncer Mama:</label>
            <select name="familiarCancerMama" value={filtros.familiarCancerMama} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium">Punción de Mama:</label>
            <select name="puncionMama" value={filtros.puncionMama} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Mama Densa:</label>
            <select name="mamaDensa" value={filtros.mamaDensa} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="No recuerdo">No recuerdo</option>
                <option value="No sé lo que es">No sé lo que es</option>
            </select>
          </div>
          {/* --- FIN FILTROS NUEVOS --- */}


          {/* Tumores Ginecológicos */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Tumores Ginecológicos:</label>
            <select name="tumoresGinecologicos" value={filtros.tumoresGinecologicos} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>
          
          {/* Enf. Autoinmunes */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Enf. Autoinmunes:</label>
            <select name="enfermedadesAutoinmunes" value={filtros.enfermedadesAutoinmunes} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>
          
          {/* Resto de filtros... */}

        </div>
        <div className="mt-6 flex justify-end">
            <button 
                onClick={clearFiltros}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
                Limpiar Filtros
            </button>
        </div>
      </div>


      {/* --- BOTONES DE VISUALIZACIÓN --- */}
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Resultados ({pacientesFiltrados.length} pacientes)</h2>
          <button 
              onClick={() => setMostrarGraficos(!mostrarGraficos)} 
              className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition ${mostrarGraficos ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
              {mostrarGraficos ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
          </button>
      </div>

      {/* --- SECCIÓN DE GRÁFICOS --- */}
      {mostrarGraficos && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
              <EstadisticasGraficos pacientes={pacientesFiltrados} />
          </div>
      )}

      {/* --- LISTA DE PACIENTES (TARJETAS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pacientesFiltrados.length > 0 ? (
          pacientesFiltrados.map(p => (
            <PacienteCard key={p.id} p={p} />
          ))
        ) : (
          <p className="md:col-span-3 text-center text-lg text-gray-600">No se encontraron pacientes con los filtros aplicados.</p>
        )}
      </div>

    </div>
  );
}

export default Estadisticas;
