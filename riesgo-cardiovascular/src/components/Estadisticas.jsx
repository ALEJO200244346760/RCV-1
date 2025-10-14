import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Bar, Pie, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


// --- 1. FUNCIÓN DE UTILIDAD INTEGRADA (Reemplaza ./ConstFormulario) ---
const obtenerColorRiesgo = (nivelRiesgo) => {
    if (!nivelRiesgo) return 'bg-gray-200 text-gray-800';
    const riesgoLower = nivelRiesgo.toLowerCase();
    
    // Mapeo basado en las clasificaciones RCV comunes
    if (riesgoLower.includes('bajo')) return 'bg-green-200 text-green-800';
    if (riesgoLower.includes('moderado')) return 'bg-yellow-200 text-yellow-800';
    if (riesgoLower.includes('alto')) return 'bg-orange-200 text-orange-800';
    if (riesgoLower.includes('crítico') || riesgoLower.includes('muy alto')) return 'bg-red-200 text-red-800';
    return 'bg-gray-200 text-gray-800';
};

// --- 2. CONFIGURACIÓN DE AXIOS Y GLOBALES ---
const apiBaseURL = 'https://rcv-production.up.railway.app/api/pacientes'; 
const axiosInstance = axios.create({
    baseURL: 'https://rcv-production.up.railway.app',
});

// Iconos simples para los botones de acción
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v4a1 1 0 001 1h4m-4 0h4m-4 0h4m4-4h4a1 1 0 011 1v12a1 1 0 01-1 1h-8a1 1 0 01-1-1v-4m-4-8h4m-4 0h4m-4 0h4m-4-4h4a1 1 0 001-1V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v4" /></svg>;


// --- 3. COMPONENTE DE GRÁFICOS INTEGRADO (Reemplaza ./EstadisticasGraficos) ---

const BASE_COLORS = [
    '#60A5FA', '#34D399', '#FDE047', '#F97316', '#EF4444', '#B91C1C', '#8B5CF6', '#EC4899',
    '#06B6D4', '#F472B6', '#10B981', '#9333EA',
];

const EstadisticasGraficos = ({ pacientes: pacientesFiltrados = [] }) => {
    if (pacientesFiltrados.length === 0) {
        return <div className="p-4 text-center text-gray-500">No hay pacientes para generar gráficos. Ajusta los filtros.</div>;
    }

    // Función de agregación
    const aggregateData = (field, key = field) => {
        const aggregation = {};
        pacientesFiltrados.forEach(p => {
            let value = String(p[key] || 'N/A');

            // Intenta manejar arrays que vienen como strings (ej. "Diabetes, Hipertensión")
            try {
                if (value.startsWith('[') || value.startsWith('{')) {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        parsed.forEach(item => {
                            aggregation[item] = (aggregation[item] || 0) + 1;
                        });
                        return;
                    }
                }
            } catch (e) {
                // Si falla el parseo, lo trata como un valor único
            }

            aggregation[value] = (aggregation[value] || 0) + 1;
        });

        const labels = Object.keys(aggregation);
        const dataValues = Object.values(aggregation);
        
        return {
            aggregation,
            data: {
                labels: labels,
                datasets: [{
                    label: `Conteo por ${field}`,
                    data: dataValues,
                    backgroundColor: labels.map((_, i) => BASE_COLORS[i % BASE_COLORS.length]),
                    borderColor: labels.map((_, i) => BASE_COLORS[i % BASE_COLORS.length]),
                    borderWidth: 1,
                }],
            }
        };
    };

    // Opciones para gráficos circulares
    const pieOptions = (aggregation) => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = Object.values(aggregation).reduce((sum, current) => sum + current, 0);
                        const percentage = ((value / total) * 100).toFixed(1) + '%';
                        return `${label}: ${value} (${percentage})`;
                    }
                }
            }
        }
    });

    // Datos agregados
    const dataNivelRiesgo = aggregateData('Nivel de Riesgo', 'nivelRiesgo');
    const dataFumador = aggregateData('Fumador', 'fumaDiario');
    const dataEstres = aggregateData('Estrés Crónico', 'estresCronico');
    const dataTuvoHijos = aggregateData('Tuvo Hijos', 'tuvoHijos');
    const dataMenopausia = aggregateData('Menopausia', 'menopausia');
    const dataTumoresGinecologicos = aggregateData('Tumores Ginecológicos', 'tumoresGinecologicos');
    
    // Nuevos datos de Salud Mamaria
    const dataFamiliarCancerMama = aggregateData('Familiar Cáncer Mama', 'familiarCancerMama');
    const dataPuncionMama = aggregateData('Punción Mama', 'puncionMama');
    const dataMamaDensa = aggregateData('Mama Densa', 'mamaDensa');
    
    // Componente wrapper para gráficos
    const ChartWrapper = ({ title, data, options, chartType = 'Pie' }) => (
        <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <div className="h-64 flex justify-center items-center">
                {chartType === 'Pie' && data.data.labels.length > 0 ? (
                    <Pie data={data.data} options={options} />
                ) : (
                    <p className="text-gray-400">Datos insuficientes para el gráfico.</p>
                )}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* RIESGO Y HÁBITOS */}
            <ChartWrapper title="Nivel de Riesgo Cardiovascular" data={dataNivelRiesgo} options={pieOptions(dataNivelRiesgo.aggregation)} />
            <ChartWrapper title="Hábito de Fumar" data={dataFumador} options={pieOptions(dataFumador.aggregation)} />
            <ChartWrapper title="Estrés Crónico" data={dataEstres} options={pieOptions(dataEstres.aggregation)} />
            
            {/* SALUD FEMENINA */}
            <ChartWrapper title="Historial de Hijos" data={dataTuvoHijos} options={pieOptions(dataTuvoHijos.aggregation)} />
            <ChartWrapper title="Estado de Menopausia" data={dataMenopausia} options={pieOptions(dataMenopausia.aggregation)} />
            <ChartWrapper title="Tumores Ginecológicos" data={dataTumoresGinecologicos} options={pieOptions(dataTumoresGinecologicos.aggregation)} />
            
            {/* SALUD MAMARIA */}
            <ChartWrapper title="Antecedentes Cáncer Mama (Familiar)" data={dataFamiliarCancerMama} options={pieOptions(dataFamiliarCancerMama.aggregation)} />
            <ChartWrapper title="Punción Mamaria Previa" data={dataPuncionMama} options={pieOptions(dataPuncionMama.aggregation)} />
            <ChartWrapper title="Mama Densa (Reportado)" data={dataMamaDensa} options={pieOptions(dataMamaDensa.aggregation)} />
            
            {/* Puedes añadir más gráficos aquí según los campos que desees analizar (IMC, Edad, etc.) */}
        </div>
    );
};
// --- FIN COMPONENTE DE GRÁFICOS INTEGRADO ---


// --- 4. COMPONENTE PRINCIPAL ESTADISTICAS ---
function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarGraficos, setMostrarGraficos] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(true); // Mostrar filtros por defecto para empezar
  const [mensaje, setMensaje] = useState(null);

  // Estados de filtros actualizados con los nuevos campos
  const [filtros, setFiltros] = useState({
    dni: '',
    telefono: '',
    edadMinima: '', // Ahora es 'Minima' para hacer el chequeo
    imcMinimo: '',
    tensionSistolicaMinima: '',
    nivelRiesgo: '',
    fumador: '',
    tomaMedicacion: '',
    estresCronico: '',
    tumoresGinecologicos: '',
    enfermedadesAutoinmunes: '',
    menopausia: '',
    // Salud Mamaria
    familiarCancerMama: '',
    puncionMama: '',
    mamaDensa: '',
  });

  const fetchPacientes = () => {
    setLoading(true);
    axiosInstance.get(apiBaseURL)
      .then(resp => {
        // Asegurarse de que los datos tengan un ID si no lo tienen (por si acaso)
        const dataConId = resp.data.map(p => ({
            ...p,
            id: p.id || crypto.randomUUID() // Usar ID del backend o generar uno temporal
        }));
        setPacientes(dataConId);
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
        dni: '', telefono: '', edadMinima: '', imcMinimo: '', tensionSistolicaMinima: '', 
        nivelRiesgo: '', fumador: '', tomaMedicacion: '', estresCronico: '', 
        tumoresGinecologicos: '', enfermedadesAutoinmunes: '', menopausia: '', 
        familiarCancerMama: '', puncionMama: '', mamaDensa: '', 
    });
  };
  
  const handleDelete = async (id, dni) => {
    // Usar modal personalizado en lugar de window.confirm si es necesario, 
    // pero para este entorno usaremos una simulación de confirmación para ser robustos.
    if (confirm(`¿Estás seguro de eliminar el paciente con DNI: ${dni}? Esta acción es irreversible.`)) {
        try {
            // Utilizamos la URL completa si el baseURL de axios no es suficiente
            await axios.delete(`https://rcv-production.up.railway.app/api/pacientes/${id}`);
            
            // Si la eliminación fue exitosa, actualiza la lista
            setPacientes(prev => prev.filter(p => p.id !== id));
            setMensaje({ type: 'success', text: `Paciente con DNI ${dni} eliminado con éxito.` });

        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
            setMensaje({ type: 'error', text: `Error al eliminar el paciente con DNI ${dni}.` });
        }
        setTimeout(() => setMensaje(null), 3000); 
    }
  };

  const handleCopy = (paciente) => {
    const dataToCopy = `
DNI: ${paciente.dni}
Edad: ${paciente.edad}
Género: ${paciente.genero}
Riesgo RCV: ${paciente.nivelRiesgo}
IMC: ${paciente.imc}
T. Sistólica: ${paciente.tensionSistolica}
Fuma: ${paciente.fumaDiario}
Medicamentos: ${paciente.tomaMedicacionDiario}
Familiar Cáncer Mama: ${paciente.familiarCancerMama}
Mama Densa: ${paciente.mamaDensa}
    `;
    
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
      // Función auxiliar para chequear valores de tipo 'Sí'/'No' o valores de texto
      const checkFilter = (patientValue, filterValue) => {
        if (!filterValue) return true;
        
        // Asume que los valores de Sí/No son strings "Sí" o "No"
        return String(patientValue || '').toLowerCase().includes(filterValue.toLowerCase());
      };
      
      // Función para chequear valores numéricos mínimos
      const checkNumericMinFilter = (patientField, filterValue) => {
          if (!filterValue) return true;
          
          // Extrae el valor numérico (ej. de "25.5 (Sobrepeso)" o simplemente "25.5")
          const patientValueStr = String(p[patientField] || '').split(' ')[0];
          const patientNum = parseFloat(patientValueStr);
          const filterNum = parseFloat(filterValue);

          if (isNaN(patientNum) || isNaN(filterNum)) return true; // Ignorar si no son números válidos o el paciente no tiene dato
          
          return patientNum >= filterNum;
      };

      // 1. Filtro por DNI o Teléfono (búsqueda de texto)
      if (filtros.dni && !(p.dni && p.dni.toLowerCase().includes(filtros.dni.toLowerCase())) && !(p.telefono && p.telefono.toLowerCase().includes(filtros.dni.toLowerCase()))) {
          return false;
      }
      
      // 2. Filtros Numéricos Mínimos
      if (!checkNumericMinFilter('edad', filtros.edadMinima)) return false;
      if (!checkNumericMinFilter('imc', filtros.imcMinimo)) return false;
      if (!checkNumericMinFilter('tensionSistolica', filtros.tensionSistolicaMinima)) return false;

      // 3. Filtros de String/Booleano (Sí/No/Valor)
      if (!checkFilter(p.nivelRiesgo, filtros.nivelRiesgo)) return false;
      if (!checkFilter(p.fumaDiario, filtros.fumador)) return false;
      if (!checkFilter(p.tomaMedicacionDiario, filtros.tomaMedicacion)) return false;
      if (!checkFilter(p.estresCronico, filtros.estresCronico)) return false;

      // 4. Filtros de Salud Femenina (solo se aplican si el paciente es "femenino" o si el campo no es "No aplica" en el filtro)
      const isFemale = p.genero && p.genero.toLowerCase() === 'femenino';
      
      if (filtros.menopausia && isFemale && !checkFilter(p.menopausia, filtros.menopausia)) return false;
      if (filtros.tumoresGinecologicos && isFemale && !checkFilter(p.tumoresGinecologicos, filtros.tumoresGinecologicos)) return false;
      if (filtros.enfermedadesAutoinmunes && isFemale && !checkFilter(p.enfermedadesAutoinmunes, filtros.enfermedadesAutoinmunes)) return false;

      // 5. Filtros de Salud Mamaria (solo se aplican si el paciente es "femenino")
      if (isFemale) {
          if (!checkFilter(p.familiarCancerMama, filtros.familiarCancerMama)) return false;
          if (!checkFilter(p.puncionMama, filtros.puncionMama)) return false;
          if (!checkFilter(p.mamaDensa, filtros.mamaDensa)) return false;
      } else {
           // Si el paciente es masculino, nos aseguramos de que no haya filtros femeninos activos
           const activeFemaleFilter = filtros.menopausia || filtros.tumoresGinecologicos || filtros.enfermedadesAutoinmunes || filtros.familiarCancerMama || filtros.puncionMama || filtros.mamaDensa;
           if (activeFemaleFilter) return false;
      }
      
      return true;
    });
  }, [pacientes, filtros]);
  
  // Componente de Tarjeta de Paciente
  const PacienteCard = ({ p }) => {
    // Para manejar el caso donde los arrays vuelven como strings desde el backend (ej. "Diabetes, Hipertensión")
    const getListItems = (data) => {
        try {
            if (typeof data === 'string' && (data.startsWith('[') || data.startsWith('{'))) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed)) return parsed.join(', ');
                return data; 
            }
            if (Array.isArray(data)) return data.join(', ');
        } catch (e) {
            // Fallback si no es JSON válido
        }
        return data || 'N/A';
    };
    
    const handleEdit = (id) => {
        // En una aplicación real usarías un router (ej. react-router-dom)
        // Simulamos la navegación con la URL relativa
        window.location.href = `/editar-paciente/${id}`; 
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600 transform hover:shadow-2xl transition duration-300">
            <div className="flex justify-between items-start mb-4 border-b pb-3">
                <h3 className="text-xl font-extrabold text-gray-800">DNI: <span className="text-indigo-600">{p.dni}</span></h3>
                <div className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${obtenerColorRiesgo(p.nivelRiesgo)}`}>
                    {p.nivelRiesgo || 'N/A'}
                </div>
            </div>
            
            <div className="space-y-1 text-sm text-gray-700">
                <div className="grid grid-cols-2 gap-x-4">
                    <p><strong>Edad:</strong> {p.edad} años</p>
                    <p><strong>Sexo:</strong> {p.genero}</p>
                    <p><strong>IMC:</strong> {p.imc}</p>
                    <p><strong>T. Sistólica:</strong> {p.tensionSistolica}</p>
                    <p><strong>Colesterol:</strong> {p.colesterol}</p>
                    <p><strong>Fuma:</strong> {p.fumaDiario}</p>
                </div>
                
                <hr className="my-2 border-gray-100"/>
                <p className="font-semibold text-sm text-pink-600">Salud Mamaria y Ginecológica:</p>
                
                <div className="grid grid-cols-2 gap-x-4">
                    <p><strong>Familiar Cáncer:</strong> {p.familiarCancerMama}</p>
                    <p><strong>Punción Mama:</strong> {p.puncionMama}</p>
                    <p><strong>Mama Densa:</strong> {p.mamaDensa}</p>
                    <p><strong>Menopausia:</strong> {p.menopausia}</p>
                </div>
                
                <div className="pt-2 text-xs text-gray-500">
                    Registrado: {p.fechaRegistro} | Ubicación: {p.ubicacion}
                </div>
            </div>

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                <button 
                    onClick={() => handleCopy(p)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="Copiar datos principales"
                >
                    <CopyIcon /> <span className="hidden sm:inline">Copiar</span>
                </button>
                <button 
                    onClick={() => handleEdit(p.id)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    title="Editar paciente"
                >
                    <EditIcon /> <span className="hidden sm:inline">Editar</span>
                </button>
                <button 
                    onClick={() => handleDelete(p.id, p.dni)} 
                    className="flex items-center space-x-1 p-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Eliminar paciente"
                >
                    <TrashIcon /> <span className="hidden sm:inline">Eliminar</span>
                </button>
            </div>
        </div>
    );
  };

  if (loading) {
    return <div className="text-center p-8 text-2xl font-semibold text-indigo-600">Cargando datos de pacientes...</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Estadísticas y Gestión de Pacientes</h1>
      
      {/* Mensaje de éxito/error */}
      {mensaje && (
        <div className={`p-3 mb-4 rounded-lg text-white font-medium ${mensaje.type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-md`}>
          {mensaje.text}
        </div>
      )}

      {/* Botón para mostrar/ocultar filtros */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Filtros y {pacientesFiltrados.length} Resultados</h2>
        <button 
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center text-sm"
        >
            {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${mostrarFiltros ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      {/* --- SECCIÓN DE FILTROS --- */}
      <div className={`bg-white p-6 rounded-xl shadow-lg mb-8 transition-all duration-500 ease-in-out overflow-hidden ${mostrarFiltros ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 p-0'}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          
          {/* Búsqueda por DNI/Teléfono */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col">
            <label className="text-sm font-medium">DNI / Teléfono:</label>
            <input type="text" name="dni" value={filtros.dni} onChange={handleFiltroChange} placeholder="Buscar DNI o Teléfono..." className="mt-1 p-2 border rounded-md"/>
          </div>

          {/* Edad Mínima */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Edad Mínima:</label>
            <input type="number" name="edadMinima" value={filtros.edadMinima} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
          </div>
          
          {/* IMC Mínimo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">IMC Mínimo:</label>
            <input type="number" name="imcMinimo" value={filtros.imcMinimo} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
          </div>

          {/* Tensión Sistólica Mínima */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">T. Sistólica Mínima:</label>
            <input type="number" name="tensionSistolicaMinima" value={filtros.tensionSistolicaMinima} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md"/>
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
            <label className="text-sm font-medium text-pink-700">Familiar Cáncer Mama:</label>
            <select name="familiarCancerMama" value={filtros.familiarCancerMama} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-pink-700">Punción de Mama:</label>
            <select name="puncionMama" value={filtros.puncionMama} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-pink-700">Mama Densa:</label>
            <select name="mamaDensa" value={filtros.mamaDensa} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="No recuerdo">No recuerdo</option>
                <option value="No sé lo que es">No sé lo que es</option>
            </select>
          </div>
          
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
          
          {/* Menopausia */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Menopausia:</label>
            <select name="menopausia" value={filtros.menopausia} onChange={handleFiltroChange} className="mt-1 p-2 border rounded-md">
                <option value="">Todos</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
          </div>

        </div>
        <div className="mt-6 flex justify-end">
            <button 
                onClick={clearFiltros}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition shadow-md"
            >
                Limpiar Filtros
            </button>
        </div>
      </div>


      {/* --- BOTONES DE VISUALIZACIÓN --- */}
      <div className="flex justify-end items-center mb-6">
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
          <p className="md:col-span-3 xl:col-span-3 text-center text-lg text-gray-600 py-10 bg-white rounded-xl shadow-lg">
              No se encontraron pacientes con los filtros aplicados.
          </p>
        )}
      </div>

    </div>
  );
}

export default Estadisticas;
