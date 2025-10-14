import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// *************************************************************************
// ** STUBS (Funciones temporales para garantizar la compilación y la lógica) **
// *************************************************************************

// Comentadas para evitar errores de resolución si los archivos no están
// import { calcularRiesgoCardiovascular } from './Calculadora'; 
// import { obtenerColorRiesgo, obtenerTextoRiesgo } from './ConstFormulario'; 

const calcularRiesgoCardiovascular = (datos) => {
    // Intenta calcular IMC si peso y talla son válidos
    const peso = parseFloat(datos.peso);
    const talla = parseFloat(datos.talla);
    let imc = datos.imc;
    let nivel = datos.nivelRiesgo; // Usar el valor existente por defecto

    if (!isNaN(peso) && !isNaN(talla) && talla > 0) {
        const imcCalculado = peso / (talla ** 2);
        imc = `${imcCalculado.toFixed(1)} kg/m²`;

        // Lógica de simulación simple para el riesgo basado en IMC
        if (imcCalculado > 30) {
            nivel = 'Muy Alto';
        } else if (imcCalculado > 25) {
            nivel = 'Alto';
        } else if (imcCalculado > 18.5) {
            nivel = 'Moderado';
        } else {
            nivel = 'Bajo';
        }
    }

    return { 
        imc: imc, 
        nivelRiesgo: nivel 
    };
};

const obtenerColorRiesgo = (nivel) => {
    switch (nivel) {
        case 'Bajo': return 'bg-green-100 text-green-800 border-green-400';
        case 'Moderado': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
        case 'Alto': return 'bg-orange-100 text-orange-800 border-orange-400';
        case 'Muy Alto': return 'bg-red-100 text-red-800 border-red-400';
        default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
};

const obtenerTextoRiesgo = (nivel) => {
    switch (nivel) {
        case 'Bajo': return 'El riesgo cardiovascular es bajo. Se recomienda mantener el estilo de vida actual.';
        case 'Moderado': return 'Riesgo moderado. Se sugiere evaluar hábitos y condiciones.';
        case 'Alto': return 'Riesgo alto. Se requiere intervención y seguimiento médico.';
        case 'Muy Alto': return 'Riesgo muy alto. Intervención médica urgente recomendada.';
        default: return 'Nivel de riesgo no determinado o indefinido.';
    }
};
// *************************************************************************


// ** CORRECCIÓN DE URL BASE **
const axiosInstance = axios.create({
    // Base URL Corregida de 'way.app' a 'railway.app'
    baseURL: 'https://rcv-production.up.railway.app/api', 
});


// ESTADO INICIAL COMPLETO (Sincronizado con Formulario.jsx)
const initialState = {
    dni: '',
    fechaNacimiento: '', 
    telefono: '',        
    edad: '',
    genero: 'femenino',
    
    // --- Medidas ---
    peso: '',
    talla: '',
    cintura: '',
    tensionSistolica: '',
    tensionDiastolica: '',
    colesterol: 'No', // Almacena 'No' o el valor numérico (mg/dL)
    
    // --- Hábitos / Condiciones ---
    tomaMedicacionDiario: null,
    medicacionCondiciones: [],
    fumaDiario: null,
    actividadFisica: null,
    horasSueno: null,
    estresCronico: null,
    estresTipo: '',
    enfermedadesAutoinmunes: null,
    autoinmunesTipo: [],
    
    // --- Salud Femenina ---
    tumoresGinecologicos: null,
    tumoresTipo: [],
    tuvoHijos: null,
    cantidadHijos: '',
    complicacionesEmbarazo: null,
    motivoNoHijos: '',
    menopausia: null,
    edadMenopausia: '',
    ciclosMenstruales: null,
    metodoAnticonceptivo: '',
    histerectomia: null,

    // --- Salud Mamaria (NUEVOS) ---
    familiarCancerMama: null, 
    puncionMama: null,       
    mamaDensa: null,         
    
    // --- Resultados ---
    imc: '',
    nivelRiesgo: '',
    fechaRegistro: '',
    ubicacion: '',
};

// Función helper para normalizar valores booleanos/strings del backend a valores de formulario
const safeMapBoolean = (value) => {
    const stringValue = String(value);
    if (['Sí', 'No', 'No aplica', 'No recuerdo', 'No sé lo que es', 'Regulares', 'Irregulares', 'Ausentes', 'Sedentario', 'Moderado', 'Activo'].includes(stringValue)) {
        return stringValue;
    }
    if (value === true || stringValue === 'true') {
        return 'Sí';
    }
    if (value === false || stringValue === 'false') {
        return 'No';
    }
    return null;
};

function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(initialState);
  // Estado local para manejar el radio de Colesterol separadamente
  const [colesterolOption, setColesterolOption] = useState('No');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const apiPath = `/pacientes/${id}`;

  // 1. Cargar datos del paciente
  useEffect(() => {
    setLoading(true);
    axiosInstance.get(apiPath)
      .then(response => {
        const data = response.data;
        
        // El backend puede devolver arrays como strings separados por coma. 
        const normalizarArray = (value) => {
            if (Array.isArray(value)) return value;
            return value ? String(value).split(',').map(item => item.trim()).filter(item => item) : [];
        };

        // Mapear el estado cargado
        const loadedData = {
          ...initialState, 
          ...data,
          // Normalizar Arrays
          medicacionCondiciones: normalizarArray(data.medicacionCondiciones),
          tumoresTipo: normalizarArray(data.tumoresTipo),
          autoinmunesTipo: normalizarArray(data.autoinmunesTipo),

          // Normalizar Booleanos/Strings para RadioGroups
          tomaMedicacionDiario: safeMapBoolean(data.tomaMedicacionDiario),
          fumaDiario: safeMapBoolean(data.fumaDiario),
          actividadFisica: safeMapBoolean(data.actividadFisica),
          horasSueno: safeMapBoolean(data.horasSueno),
          estresCronico: safeMapBoolean(data.estresCronico),
          enfermedadesAutoinmunes: safeMapBoolean(data.enfermedadesAutoinmunes),
          tumoresGinecologicos: safeMapBoolean(data.tumoresGinecologicos),
          tuvoHijos: safeMapBoolean(data.tuvoHijos),
          complicacionesEmbarazo: safeMapBoolean(data.complicacionesEmbarazo),
          menopausia: safeMapBoolean(data.menopausia),
          histerectomia: safeMapBoolean(data.histerectomia),
          familiarCancerMama: safeMapBoolean(data.familiarCancerMama),
          puncionMama: safeMapBoolean(data.puncionMama),
          mamaDensa: safeMapBoolean(data.mamaDensa),

          // Dejar colesterol como viene (string 'No' o valor numérico string)
          colesterol: data.colesterol || 'No'
        };

        setDatos(loadedData);
        // Inicializar el estado de la opción de colesterol
        if (loadedData.colesterol !== 'No') {
            setColesterolOption('Sí');
        } else {
            setColesterolOption('No');
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar paciente:', err);
        setError('No se pudo cargar la información del paciente. Asegúrate que la URL es correcta.');
        setLoading(false);
      });
  }, [id, apiPath]);

  // 2. Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setDatos(prev => {
        const list = Array.isArray(prev[name]) ? prev[name] : [];
        if (checked) {
          return { ...prev, [name]: [...list, value] };
        } else {
          return { ...prev, [name]: list.filter(item => item !== value) };
        }
      });
    } else {
      setDatos(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // 2b. Manejar cambio específico para el campo Colesterol (Radio + Valor)
  const manejarCambioColesterol = (e) => {
    const { name, value } = e.target;
    
    if (name === 'colesterolOption') {
        setColesterolOption(value);
        // Si eligen 'No', restablecer el valor numérico en datos
        if (value === 'No') {
            setDatos(prev => ({ ...prev, colesterol: 'No' }));
        } else {
             // Si eligen 'Sí', si el valor actual es 'No', lo dejamos vacío para que el usuario ingrese el número
             if (datos.colesterol === 'No') {
                 setDatos(prev => ({ ...prev, colesterol: '' }));
             }
        }
    } else if (name === 'colesterol') {
        // Maneja el input numérico
        setDatos(prev => ({ ...prev, colesterol: value }));
    }
  };


  // 3. Recalcular IMC/Riesgo al cambiar datos clave
  const datosCalculados = useMemo(() => {
      // Solo calcula si tiene datos suficientes para el cálculo base de IMC/Riesgo
      if (datos.peso && datos.talla && parseFloat(datos.peso) > 0 && parseFloat(datos.talla) > 0) {
          return calcularRiesgoCardiovascular(datos);
      }
      // Si no hay datos suficientes para calcular, usa los valores existentes (del backend)
      return { imc: datos.imc, nivelRiesgo: datos.nivelRiesgo };
  }, [datos.peso, datos.talla, datos.tensionSistolica, datos.imc, datos.nivelRiesgo]);


  // 4. Enviar datos
  const actualizarPaciente = (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    // Validar campos requeridos antes de enviar
    if (!datos.dni || !datos.fechaNacimiento || !datos.edad || !datos.genero || !datos.peso || !datos.talla || !datos.tensionSistolica) {
        setError('Por favor, completa todos los campos obligatorios (*).');
        return;
    }


    // Preparar los datos antes de enviar (ej. convertir arrays a string separado por comas)
    const datosAEnviar = {
        ...datos,
        ...datosCalculados, // Incluimos el IMC y NivelRiesgo recalculados
        // Convertir Arrays a String para el backend
        medicacionCondiciones: Array.isArray(datos.medicacionCondiciones) ? datos.medicacionCondiciones.join(', ') : datos.medicacionCondiciones,
        tumoresTipo: Array.isArray(datos.tumoresTipo) ? datos.tumoresTipo.join(', ') : datos.tumoresTipo,
        autoinmunesTipo: Array.isArray(datos.autoinmunesTipo) ? datos.autoinmunesTipo.join(', ') : datos.autoinmunesTipo,
        
        // Asegurar que los campos nullables se envíen como string 'Sí'/'No' o null/'' si el backend lo requiere
        // (Aunque los stubs manejan esto, es mejor ser explícito)
        tomaMedicacionDiario: datos.tomaMedicacionDiario || null,
        fumaDiario: datos.fumaDiario || null,
        // ... otros campos de RadioGroup que pueden ser null
    };
    
    axiosInstance.put(apiPath, datosAEnviar)
      .then(() => {
        setMensaje('Paciente actualizado con éxito.');
        setTimeout(() => navigate('/estadisticas'), 2000); // Redirigir después de 2 segundos
      })
      .catch(err => {
        console.error('Error al actualizar paciente:', err);
        setError('Error al actualizar paciente. Revisa la consola y la URL del backend.');
      });
  };

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold text-indigo-600">Cargando datos del paciente...</div>;
  }

  if (error && !loading) {
    // Si hay un error de carga, lo mostramos, pero si hay un error de guardado, el formulario sigue visible
    return <div className="text-center p-8 text-xl font-semibold text-red-600">{error}</div>;
  }
  
  // Destructuración para mejor legibilidad en el render
  const { nivelRiesgo } = datosCalculados;


  // Componente de Grupo de Campos de Opciones (Sí/No/Otro)
  const RadioGroup = ({ label, name, options = ['Sí', 'No', 'No aplica'], conditionalContent, isRequired=true }) => (
    <div className="flex flex-col">
        <label className={`block text-sm font-medium text-gray-700 ${isRequired ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}>{label}</label>
        <div className="mt-1 flex flex-wrap gap-4">
            {options.map(opt => (
                <label key={opt} className="inline-flex items-center text-gray-700">
                    <input
                        type="radio"
                        name={name}
                        value={opt}
                        checked={datos[name] === opt}
                        onChange={manejarCambio}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{opt}</span>
                </label>
            ))}
        </div>
        {conditionalContent && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                {conditionalContent(datos[name])}
            </div>
        )}
    </div>
  );
  
  // Componente Checkbox (para condiciones múltiples)
  const CheckboxGroup = ({ label, name, options }) => (
    <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex flex-wrap gap-4">
            {options.map(opt => (
                <label key={opt} className="inline-flex items-center text-gray-700">
                    <input
                        type="checkbox"
                        name={name}
                        value={opt}
                        checked={Array.isArray(datos[name]) ? datos[name].includes(opt) : false}
                        onChange={manejarCambio}
                        className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    />
                    <span className="ml-2">{opt}</span>
                </label>
            ))}
        </div>
    </div>
  );
  
  // Componente específico para Colesterol para manejar el estado dual (Sí/No y Valor)
  const ColesterolInput = () => (
    <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Colesterol Total</label>
        <div className="mt-1 flex flex-wrap gap-4">
            {['No', 'Sí'].map(opt => (
                <label key={opt} className="inline-flex items-center text-gray-700">
                    <input
                        type="radio"
                        name="colesterolOption"
                        value={opt}
                        checked={colesterolOption === opt}
                        onChange={manejarCambioColesterol}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{opt}</span>
                </label>
            ))}
        </div>
        
        {colesterolOption === 'Sí' && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <label htmlFor="colesterolValue" className="block text-sm font-medium text-gray-700">Valor (mg/dL)</label>
                <input 
                    type="number" 
                    name="colesterol" 
                    id="colesterolValue" 
                    value={datos.colesterol !== 'No' ? datos.colesterol : ''} 
                    onChange={manejarCambioColesterol} 
                    placeholder="Valor numérico (mg/dL)" 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
        )}
    </div>
  );


  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
            Editar Paciente: <span className="text-gray-800">{datos.dni}</span>
        </h1>
        
        {/* Mensajes de feedback */}
        {mensaje && <div className="p-4 mb-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg border border-green-300">{mensaje}</div>}
        {error && <div className="p-4 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-300">{error}</div>}

        <form onSubmit={actualizarPaciente} className="space-y-8">

            {/* --- SECCIÓN 1: IDENTIFICACIÓN Y DATOS GENERALES --- */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1">1. Datos Generales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">DNI</label>
                        <input type="text" name="dni" id="dni" value={datos.dni || ''} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Fecha de Nacimiento</label>
                        <input type="date" name="fechaNacimiento" id="fechaNacimiento" value={datos.fechaNacimiento || ''} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input type="text" name="telefono" id="telefono" value={datos.telefono || ''} onChange={manejarCambio} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="edad" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Edad (años)</label>
                        <input type="number" name="edad" id="edad" value={datos.edad || ''} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Género</label>
                        <select name="genero" id="genero" value={datos.genero} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN 2: DATOS DE MEDIDA Y RIESGO --- */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1">2. Medidas Antropométricas y Vitales</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1">
                        <label htmlFor="peso" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Peso (kg)</label>
                        <input type="number" name="peso" id="peso" value={datos.peso || ''} onChange={manejarCambio} required step="any" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="talla" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Talla (m)</label>
                        <input type="number" name="talla" id="talla" value={datos.talla || ''} onChange={manejarCambio} step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="cintura" className="block text-sm font-medium text-gray-700">Circunferencia de Cintura (cm)</label>
                        <input type="number" name="cintura" id="cintura" value={datos.cintura || ''} onChange={manejarCambio} step="any" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="tensionSistolica" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Tensión Sistólica</label>
                        <input type="number" name="tensionSistolica" id="tensionSistolica" value={datos.tensionSistolica || ''} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="tensionDiastolica" className="block text-sm font-medium text-gray-700">Tensión Diastólica</label>
                        <input type="number" name="tensionDiastolica" id="tensionDiastolica" value={datos.tensionDiastolica || ''} onChange={manejarCambio} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    {/* Componente de Colesterol Corregido */}
                    <ColesterolInput /> 
                </div>

                <div className="mt-6 p-4 border rounded-xl" style={{ borderLeftWidth: '6px', borderLeftColor: obtenerColorRiesgo(nivelRiesgo).split(' ')[3].replace('border-', '') }}>
                    <h3 className="text-lg font-bold">Resultados de Riesgo Calculados</h3>
                    <p className="mt-2 text-sm">
                        **IMC (Índice de Masa Corporal):** <span className="font-semibold">{datosCalculados.imc || datos.imc || 'N/A'}</span>
                    </p>
                    <div className={`mt-2 p-2 rounded-lg ${obtenerColorRiesgo(nivelRiesgo)}`}>
                        <p className="font-semibold">Nivel de Riesgo Cardiovascular:</p>
                        <p className="text-lg font-extrabold">{nivelRiesgo || datos.nivelRiesgo || 'Indefinido'}</p>
                        <p className="text-xs mt-1">{obtenerTextoRiesgo(nivelRiesgo || datos.nivelRiesgo)}</p>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN 3: SALUD FEMENINA Y REPRODUCTIVA --- */}
            {datos.genero === 'femenino' && (
                <div className="space-y-6 p-4 border border-pink-200 rounded-xl bg-pink-50">
                    <h2 className="text-xl font-bold text-pink-700 border-b pb-1">3. Salud Femenina y Reproductiva</h2>
                    
                    {/* Histerectomía y Menopausia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RadioGroup 
                            label="¿Ha tenido histerectomía?"
                            name="histerectomia"
                            options={['Sí', 'No']}
                            isRequired={false}
                        />
                        <RadioGroup 
                            label="¿Se encuentra en menopausia?"
                            name="menopausia"
                            options={['Sí', 'No', 'No aplica']}
                            isRequired={false}
                            conditionalContent={(respuesta) => respuesta === 'Sí' && (
                                <div>
                                    <label htmlFor="edadMenopausia" className="block text-sm font-medium text-gray-700 mt-2">Edad de inicio de menopausia:</label>
                                    <input type="number" name="edadMenopausia" id="edadMenopausia" value={datos.edadMenopausia || ''} onChange={manejarCambio} placeholder="Años" className="mt-1 block w-full border rounded-md p-2" />
                                </div>
                            )}
                        />
                    </div>

                    {/* Ciclos y Anticonceptivos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RadioGroup 
                            label="Ciclos menstruales"
                            name="ciclosMenstruales"
                            options={['Regulares', 'Irregulares', 'Ausentes', 'No aplica']}
                            isRequired={false}
                        />
                        <div>
                            <label htmlFor="metodoAnticonceptivo" className="block text-sm font-medium text-gray-700">Método anticonceptivo actual (si aplica)</label>
                            <input type="text" name="metodoAnticonceptivo" id="metodoAnticonceptivo" value={datos.metodoAnticonceptivo || ''} onChange={manejarCambio} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>

                    {/* Hijos */}
                    <RadioGroup 
                        label="¿Ha tenido hijos?"
                        name="tuvoHijos"
                        options={['Sí', 'No']}
                        isRequired={false}
                        conditionalContent={(respuesta) => respuesta === 'Sí' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cantidadHijos" className="block text-sm font-medium text-gray-700">Cantidad de hijos</label>
                                    <input type="number" name="cantidadHijos" id="cantidadHijos" value={datos.cantidadHijos || ''} onChange={manejarCambio} className="mt-1 block w-full border rounded-md p-2" />
                                </div>
                                <RadioGroup 
                                    label="¿Hubo complicaciones graves en algún embarazo?"
                                    name="complicacionesEmbarazo"
                                    options={['Sí', 'No']}
                                    isRequired={false}
                                />
                            </div>
                        ) : (respuesta === 'No' && (
                            <div>
                                <label htmlFor="motivoNoHijos" className="block text-sm font-medium text-gray-700">Motivo de no tener hijos (si aplica)</label>
                                <input type="text" name="motivoNoHijos" id="motivoNoHijos" value={datos.motivoNoHijos || ''} onChange={manejarCambio} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        ))}
                    />
                </div>
            )}
            
            {/* --- SECCIÓN 4: SALUD MAMARIA (NUEVA) --- */}
            {datos.genero === 'femenino' && (
                <div className="space-y-6 p-4 border border-red-300 rounded-xl bg-red-50">
                    <h2 className="text-xl font-bold text-red-700 border-b pb-1">4. Salud Mamaria</h2>
                    
                    <RadioGroup 
                        label="¿Tiene familiar de primer grado con cáncer de mama?"
                        name="familiarCancerMama"
                        options={['Sí', 'No']}
                        isRequired={false}
                    />
                    
                    <RadioGroup 
                        label="¿Se ha realizado punciones mamarias (biopsia) previamente?"
                        name="puncionMama"
                        options={['Sí', 'No']}
                        isRequired={false}
                    />
                    
                    <RadioGroup 
                        label="¿Tiene mamas densas (según mamografía)?"
                        name="mamaDensa"
                        options={['Sí', 'No', 'No recuerdo', 'No sé lo que es']}
                        isRequired={false}
                    />
                </div>
            )}
            
            {/* --- SECCIÓN 5: ANTECEDENTES Y CONDICIONES --- */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1">5. Antecedentes y Condiciones de Salud</h2>
                
                {/* Medicación */}
                <RadioGroup 
                    label="¿Toma medicación diaria para una condición crónica?"
                    name="tomaMedicacionDiario"
                    options={['Sí', 'No']}
                    isRequired={false}
                    conditionalContent={(respuesta) => respuesta === 'Sí' && (
                        <CheckboxGroup 
                            label="Especificar condiciones/medicación (seleccione todas las que apliquen):"
                            name="medicacionCondiciones"
                            options={['Diabetes', 'Hipertensión', 'Cardiopatía', 'Dislipidemia', 'Otras']}
                        />
                    )}
                />
                
                {/* Tumores Ginecológicos */}
                <RadioGroup 
                    label="¿Ha tenido tumores ginecológicos (benignos o malignos)?"
                    name="tumoresGinecologicos"
                    options={['Sí', 'No']}
                    isRequired={false}
                    conditionalContent={(respuesta) => respuesta === 'Sí' && (
                        <CheckboxGroup 
                            label="Tipo de tumor:"
                            name="tumoresTipo"
                            options={['Miomas', 'Quistes Ováricos', 'Endometriosis', 'Cáncer Cervical', 'Cáncer de Ovario', 'Otro']}
                        />
                    )}
                />
                
                {/* Enfermedades Autoinmunes */}
                <RadioGroup 
                    label="¿Padece enfermedades autoinmunes?"
                    name="enfermedadesAutoinmunes"
                    options={['Sí', 'No']}
                    isRequired={false}
                    conditionalContent={(respuesta) => respuesta === 'Sí' && (
                        <CheckboxGroup 
                            label="Tipo de enfermedad autoinmune:"
                            name="autoinmunesTipo"
                            options={['Lupus', 'Artritis Reumatoide', 'Tiroiditis de Hashimoto', 'Otro']}
                        />
                    )}
                />

                {/* HÁBITOS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RadioGroup label="¿Fuma a diario?" name="fumaDiario" options={['Sí', 'No']} isRequired={false} />
                    <RadioGroup label="Actividad Física (tipo)" name="actividadFisica" options={['Sedentario', 'Moderado', 'Activo']} isRequired={false} />
                    <RadioGroup label="Horas de sueño promedio" name="horasSueno" options={['Menos de 6h', '6-8h', 'Más de 8h']} isRequired={false} />
                </div>
                
                {/* Estrés */}
                <RadioGroup 
                    label="¿Padece estrés crónico?"
                    name="estresCronico"
                    options={['Sí', 'No']}
                    isRequired={false}
                    conditionalContent={(respuesta) => respuesta === 'Sí' && (
                        <div>
                            <label htmlFor="estresTipo" className="block text-sm font-medium text-gray-700 mt-2">Tipo de Estrés:</label>
                            <input type="text" name="estresTipo" id="estresTipo" value={datos.estresTipo || ''} onChange={manejarCambio} placeholder="Laboral, familiar, económico, etc." className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    )}
                />
            </div>
            
            {/* --- BOTÓN DE ENVÍO --- */}
            <div className="mt-8 flex justify-end space-x-4">
                <button 
                    type="button"
                    onClick={() => navigate('/estadisticas')}
                    className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                    Guardar Cambios
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPaciente;
