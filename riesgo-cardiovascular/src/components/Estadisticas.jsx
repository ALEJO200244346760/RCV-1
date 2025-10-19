// Estadisticas.jsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import EstadisticasGraficos from './EstadisticasGraficos'; 
// Función Stub (temporal) para reemplazar obtenerColorRiesgo y evitar errores de compilación
const obtenerColorRiesgo = (nivelRiesgo) => {
    switch (nivelRiesgo) {
        case '<10% Bajo': return 'bg-green-500';
        case '>10% <20% Moderado': return 'bg-yellow-500';
        case '>20% <30% Alto': return 'bg-orange-500';
        case '>30% <40% Muy Alto': return 'bg-red-500';
        case '>40% Crítico': return 'bg-red-800';
        default: return 'bg-gray-200';
      }
};

const apiBaseURL = '/api/pacientes'; 
const axiosInstance = axios.create({
    baseURL: 'https://rcv-production.up.railway.app', // Ajusta esto a tu baseURL real si es necesario
    // Otras configuraciones de Axios si las tienes
});

// Iconos simples para los botones de acción
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>;

const EditIcon = ({ id }) => (
  <Link to={`/editar-paciente/${id}`}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    ><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  </Link>
);


const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v4a2 2 0 002 2h4a2 2 0 002-2V7m-4 6v-4m0 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2v-2" />
</svg>;


// Componente PacienteCard
const PacienteCard = React.memo(({ paciente: p, onDelete, onEdit, onCopy }) => {
    const formatTypes = (data) => {
        if (!data) return '';
        if (Array.isArray(data)) return data.join(', ');
        try {
            // Intentar parsear si viene como string JSON
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) return parsed.join(', ');
            return data;
        } catch {
            return data;
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
            {/* Encabezado y Riesgo */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Paciente ID: {p.id}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${obtenerColorRiesgo(p.nivelRiesgo)}`}>
                    Riesgo: {p.nivelRiesgo}
                </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">DNI:</span> {p.dni} |
                <span className="font-medium text-gray-700"> Edad:</span> {p.edad} |
                <span className="font-medium text-gray-700"> Tel:</span> {p.telefono}
            </p>

            <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Género:</strong> {p.genero}</p>
                <p><strong>Ubicación:</strong> {p.ubicacion}</p>
                <hr className="my-2"/>
                <p className="font-semibold text-sm text-gray-600">Mediciones y Riesgo:</p>
                <p><strong>Tensión Arterial:</strong> {p.tensionSistolica}/{p.tensionDiastolica}</p>
                <p><strong>Colesterol:</strong> {p.colesterol}</p>
                <p><strong>IMC:</strong> {p.imc}</p>
                <p><strong>Cintura:</strong> {p.cintura} cm</p>
                <hr className="my-2"/>
                <p className="font-semibold text-sm text-gray-600">Hábitos:</p>
                <p><strong>Fuma:</strong> {p.fumaDiario}</p>
                <p><strong>Medicación:</strong> {p.tomaMedicacionDiario} {p.medicacionCondiciones ? `(${formatTypes(p.medicacionCondiciones)})` : ''}</p>
                <p><strong>Actividad Física:</strong> {p.actividadFisica}</p>
                <p><strong>Sueño:</strong> {p.horasSueno} horas</p>
                <p><strong>Estrés Crónico:</strong> {p.estresCronico} {p.estresTipo ? `(${p.estresTipo})` : ''}</p>
                
                {/* --- Datos Femeninos (solo si es femenino) --- */}
                {p.genero === 'femenino' && (
                    <>
                        <hr className="my-2"/>
                        <p className="font-semibold text-sm text-gray-600">Salud Femenina y Mamaria:</p>
                        
                        {/* Nuevos campos de salud mamaria */}
                        <p><strong>Familiar Cáncer Mama:</strong> {p.familiarCancerMama}</p>
                        <p><strong>Punción de Mama:</strong> {p.puncionMama}</p>
                        <p><strong>Mama Densa:</strong> {p.mamaDensa}</p>

                        <div>
                            <strong>Tumores ginecológicos:</strong> {p.tumoresGinecologicos}{' '}
                            {(p.tumoresTipo && p.tumoresTipo.length > 0)
                                ? `(${formatTypes(p.tumoresTipo)})`
                                : ''}
                        </div>

                        <div>
                            <strong>Enf. autoinmunes:</strong> {p.enfermedadesAutoinmunes}{' '}
                            {(p.autoinmunesTipo && p.autoinmunesTipo.length > 0)
                                ? `(${formatTypes(p.autoinmunesTipo)})`
                                : ''}
                        </div>

                        <div><strong>Tuvo hijos:</strong> {p.tuvoHijos}
                            {p.tuvoHijos === 'Sí' ? ` (${p.cantidadHijos} hijos, Complicaciones: ${p.complicacionesEmbarazo || 'No especificado'})` : ` (${p.motivoNoHijos || 'No especificado'})`}
                        </div>
                        <div><strong>Ciclos menstruales:</strong> {p.ciclosMenstruales}</div>
                        <div><strong>Histerectomía:</strong> {p.histerectomia}</div>
                        <div><strong>Menopausia:</strong> {p.menopausia}
                            {p.menopausia === 'Sí' ? ` (Edad: ${p.edadMenopausia})` : ''}
                        </div>
                    </>
                )}
            </div>
            
            {/* Botones de Acción */}
            <div className="mt-6 flex gap-3">
                <button 
                    onClick={() => onEdit(p.id)} 
                    className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    <EditIcon /> Editar
                </button>
                <button 
                    onClick={() => onCopy(p)} 
                    className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                    <CopyIcon /> Copiar Data
                </button>
                <button 
                    onClick={() => onDelete(p.id)} 
                    className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    <TrashIcon /> Eliminar
                </button>
            </div>
        </div>
    );
});


function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarGraficos, setMostrarGraficos] = useState(false);
  // VOLVEMOS A AÑADIR EL ESTADO INDEPENDIENTE PARA LOS FILTROS
  const [mostrarFiltros, setMostrarFiltros] = useState(false); 

  // --- ESTADOS AÑADIDOS PARA EL MODAL DE CONFIRMACIÓN Y NOTIFICACIONES ---
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null); 
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null); 
  // -----------------------------------------------------------------------

  const [filtros, setFiltros] = useState({
    edad: '',
    imc: '',
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
    familiarCancerMama: '', 
    puncionMama: '',
    mamaDensa: '',
  });

  // --- FUNCIÓN PARA MOSTRAR EL MODAL DE CONFIRMACIÓN DE ELIMINACIÓN ---
  const handleDelete = (id) => {
    setPacienteAEliminar(id);
    setMostrarModalConfirmacion(true);
  };
  
  // --- FUNCIÓN PARA NAVEGAR A EDICIÓN (Placeholder) ---
  const handleEdit = (id) => {
    setMensajeNotificacion({ tipo: 'info', texto: `Navegando a edición del paciente: ${id}` });
    setTimeout(() => setMensajeNotificacion(null), 4000);
  };
  
  // --- FUNCIÓN PARA COPIAR DATOS DEL PACIENTE ---
  const handleCopy = (paciente) => {
    const dataToCopy = Object.entries(paciente)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n');

    navigator.clipboard.writeText(dataToCopy)
        .then(() => {
            setMensajeNotificacion({ tipo: 'success', texto: `Datos del paciente ID ${paciente.id} copiados al portapapeles.` });
        })
        .catch(err => {
            console.error('Error al copiar:', err);
            setMensajeNotificacion({ tipo: 'error', texto: 'Error al copiar datos. Revisa la consola.' });
        })
        .finally(() => {
            setTimeout(() => setMensajeNotificacion(null), 4000);
        });
  };

  // --- FUNCIÓN PARA CONFIRMAR Y EJECUTAR LA ELIMINACIÓN ---
  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) return;

    setMostrarModalConfirmacion(false);

    try {
        await axiosInstance.delete(`${apiBaseURL}/${pacienteAEliminar}`);
        setPacientes(prevPacientes => prevPacientes.filter(p => p.id !== pacienteAEliminar));
        setMensajeNotificacion({ tipo: 'success', texto: `Paciente ${pacienteAEliminar} eliminado con éxito.` });
    } catch (err) {
        console.error("Error al eliminar paciente:", err);
        setMensajeNotificacion({ tipo: 'error', texto: 'Error al eliminar paciente. Inténtalo de nuevo.' });
    } finally {
        setPacienteAEliminar(null);
        setTimeout(() => setMensajeNotificacion(null), 4000); 
    }
  };

  const cancelarEliminacion = () => {
    setMostrarModalConfirmacion(false);
    setPacienteAEliminar(null);
  };
  // ------------------------------------------------------------------

  useEffect(() => {
    axiosInstance.get(apiBaseURL)
      .then(resp => {
        setPacientes(resp.data);
      })
      .catch(err => {
        console.error("Error al cargar pacientes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  const limpiarFiltros = () => {
    setFiltros(Object.fromEntries(Object.keys(filtros).map(key => [key, ''])));
  };

  // Lógica de filtrado
  const pacientesFiltrados = useMemo(() => {
    let filtrados = pacientes;

    const normalizar = (value) => String(value).toLowerCase().trim();
    const isNumberFilter = (key) => ['edad', 'tensionSistolica', 'nivelColesterol'].includes(key);

    const aplicarFiltro = (paciente, key, filtroValue) => {
        if (!filtroValue) return true;
        const normalizedFilter = normalizar(filtroValue);
        
        if (isNumberFilter(key)) {
            const numFiltro = parseFloat(filtroValue);
            const numPaciente = parseFloat(paciente[key] || 0); 
            return !isNaN(numFiltro) ? numPaciente >= numFiltro : true;
        }

        if (key === 'imc') {
            return normalizar(paciente.imc || '').includes(normalizedFilter);
        }

        return normalizar(paciente[key] || '').includes(normalizedFilter);
    };

    Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
            filtrados = filtrados.filter(p => aplicarFiltro(p, key, filtros[key]));
        }
    });

    return filtrados;
  }, [pacientes, filtros]);


  if (loading) {
    return <div className="p-8 text-center text-xl text-blue-600">Cargando estadísticas...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Estadísticas y Gestión de Pacientes</h1>

      {/* --- BOTONES DE VISUALIZACIÓN --- */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Resultados ({pacientesFiltrados.length} pacientes)</h2>
          <div className="flex gap-4">
            {/* BOTÓN 1: FILTROS */}
            <button 
                onClick={() => setMostrarFiltros(!mostrarFiltros)} 
                className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition ${mostrarFiltros ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
            >
                {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
            
            {/* BOTÓN 2: GRÁFICOS */}
            <button 
                onClick={() => setMostrarGraficos(!mostrarGraficos)} 
                className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition ${mostrarGraficos ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
                {mostrarGraficos ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
            </button>
          </div>
      </div>

      {/* --- SECCIÓN DE FILTROS (Controlado por mostrarFiltros) --- */}
      {mostrarFiltros && (
        <div className="p-6 bg-white rounded-xl shadow-lg mb-8 transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Filtros de Búsqueda</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            
            {/* Edad */}
            <input 
              type="number" 
              name="edad" 
              placeholder="Edad Mínima" 
              value={filtros.edad} 
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Tensión Sistólica */}
            <input 
              type="number" 
              name="tensionSistolica" 
              placeholder="TAS Mínima" 
              value={filtros.tensionSistolica} 
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Nivel Colesterol (Mínimo) */}
            <input 
              type="number" 
              name="nivelColesterol" 
              placeholder="Colesterol Mínimo" 
              value={filtros.nivelColesterol} 
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* IMC */}
            <input 
              type="text" 
              name="imc" 
              placeholder="Clasificación IMC" 
              value={filtros.imc} 
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Nivel de Riesgo */}
            <select
              name="nivelRiesgo"
              value={filtros.nivelRiesgo}
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Riesgo (Todos)</option>
              <option value="Bajo">Bajo</option>
              <option value="Moderado">Moderado</option>
              <option value="Alto">Alto</option>
              <option value="Muy Alto">Muy Alto</option>
              <option value="Crítico">Crítico</option>
            </select>

            {/* Fumador */}
            <select
              name="fumador"
              value={filtros.fumador}
              onChange={handleFiltroChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Fuma (Todos)</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
              <option value="Ex">Ex-Fumador</option> 
            </select>

            {/* Hábitos de Vida */}
            <select name="actividadFisica" value={filtros.actividadFisica} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Act. Física (Todos)</option><option value="Sedentario">Sedentario</option><option value="Moderado">Moderado</option><option value="Activo">Activo</option></select>
            <select name="horasSueno" value={filtros.horasSueno} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Sueño (Todos)</option><option value="Menos de 6h">Menos de 6h</option><option value="6-8h">6-8h</option><option value="Más de 8h">Más de 8h</option></select>
            <select name="estresCronico" value={filtros.estresCronico} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Estrés Crónico (Todos)</option><option value="Sí">Sí</option><option value="No">No</option></select>
            
            {/* Salud Mamaria (Filtros) */}
            <select name="familiarCancerMama" value={filtros.familiarCancerMama} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Familiar Cáncer Mama</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="puncionMama" value={filtros.puncionMama} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Punción Mama</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="mamaDensa" value={filtros.mamaDensa} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Mama Densa</option><option value="Sí">Sí</option><option value="No">No</option><option value="No recuerdo">No recuerdo</option><option value="No sé lo que es">No sé lo que es</option></select>


            {/* Historial Ginecológico */}
            <select name="tumoresGinecologicos" value={filtros.tumoresGinecologicos} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Tumores Gin. (Todos)</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="enfermedadesAutoinmunes" value={filtros.enfermedadesAutoinmunes} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Enf. Autoinmunes (Todos)</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="tuvoHijos" value={filtros.tuvoHijos} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Tuvo Hijos (Todos)</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="ciclosMenstruales" value={filtros.ciclosMenstruales} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Ciclos Menstruales (Todos)</option><option value="Regulares">Regulares</option><option value="Irregulares">Irregulares</option><option value="Ausentes">Ausentes</option><option value="No aplica">No aplica</option></select>
            <select name="histerectomia" value={filtros.histerectomia} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Histerectomía (Todos)</option><option value="Sí">Sí</option><option value="No">No</option></select>
            <select name="menopausia" value={filtros.menopausia} onChange={handleFiltroChange} className="p-2 border rounded-lg"><option value="">Menopausia (Todos)</option><option value="Sí">Sí</option><option value="No">No</option><option value="No aplica">No aplica</option></select>
            
          </div>
          
          {/* Botón de Limpiar */}
          <div className="mt-4 flex justify-end">
              <button
                  onClick={limpiarFiltros}
                  className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                  Limpiar Filtros
              </button>
          </div>
        </div>
      )}

      {/* --- SECCIÓN DE GRÁFICOS (Controlado por mostrarGraficos) --- */}
      {mostrarGraficos && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
              <EstadisticasGraficos pacientes={pacientesFiltrados} />
          </div>
      )}

      {/* --- LISTA DE PACIENTES (TARJETAS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pacientesFiltrados.length > 0 ? (
          pacientesFiltrados.map(p => (
            <PacienteCard 
                key={p.id} 
                paciente={p} 
                onEdit={handleEdit} 
                onCopy={handleCopy} 
                onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 p-4 bg-white rounded-lg shadow-md">
            No se encontraron pacientes con los filtros aplicados.
          </p>
        )}
      </div>

      {/* --- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN --- */}
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <h3 className="text-xl font-bold text-red-600 mb-4">Confirmar Eliminación</h3>
                <p className="text-gray-700 mb-6">¿Estás seguro de que deseas eliminar al paciente ID <span className="font-semibold">{pacienteAEliminar}</span>? Esta acción es irreversible.</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={cancelarEliminacion}
                        className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmarEliminacion}
                        className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- MENSAJE DE NOTIFICACIÓN --- */}
      {mensajeNotificacion && (
        <div 
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 transition-opacity duration-300 
                ${mensajeNotificacion.tipo === 'success' ? 'bg-green-500' : mensajeNotificacion.tipo === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
            {mensajeNotificacion.texto}
        </div>
      )}
    </div>
  );
}

export default Estadisticas;