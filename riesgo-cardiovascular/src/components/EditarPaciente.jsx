import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// *************************************************************************
// ** STUBS (Funciones temporales para garantizar la compilación y la lógica) **
// *************************************************************************
// NOTA: Estas funciones deben ser reemplazadas por las versiones reales 
// de tus archivos Calculadora.jsx y ConstFormulario.jsx.

const calcularRiesgoCardiovascular = (datos) => {
    const peso = parseFloat(datos.peso);
    const talla = parseFloat(datos.talla);
    let imc = datos.imc;
    let nivel = datos.nivelRiesgo; 

    if (!isNaN(peso) && !isNaN(talla) && talla > 0) {
        // Asumo que la talla se ingresa en metros (si se usa cm, ajustar a talla / 100)
        const tallaM = talla > 3 ? talla / 100 : talla; 
        const imcCalculado = peso / (tallaM ** 2);
        
        let clasificacion = '';
        if (imcCalculado < 18.5) { clasificacion = '(Bajo peso)'; } 
        else if (imcCalculado >= 18.5 && imcCalculado < 25) { clasificacion = '(Peso Normal)'; }
        else if (imcCalculado >= 25 && imcCalculado < 30) { clasificacion = '(Sobrepeso)'; } 
        else { clasificacion = '(Obesidad)'; }
        
        imc = `${imcCalculado.toFixed(1)} kg/m² ${clasificacion}`;

        // Lógica de simulación simple para el riesgo basado en IMC y TA
        if (imcCalculado > 30 || datos.tensionSistolica > 160) {
            nivel = 'Muy Alto';
        } else if (imcCalculado > 25 || datos.tensionSistolica > 140) {
            nivel = 'Alto';
        } else if (imcCalculado > 18.5) {
            nivel = 'Moderado';
        } else {
            nivel = 'Bajo';
        }
    }

    // El resultado real de tu `Calculadora.jsx` debe ser más complejo y preciso.
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


// ** AXIOS INSTANCE **
const axiosInstance = axios.create({
    baseURL: 'https://rcv-1-production.up.railway.app/api', 
});


// ESTADO INICIAL COMPLETO (Sincronizado con el modelo de datos)
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
    colesterol: 'No', 
    
    // --- Hábitos / Condiciones ---
    tomaMedicacionDiario: null,
    medicacionCondiciones: [],
    fumaDiario: null,
    actividadFisica: null,
    horasSueno: null,
    estresCronico: null,
    estresTipo: '',
    
    // --- NUEVOS ANTECEDENTES CARDIOVASCULARES/INFECTO ---
    infarto: null, // NUEVO
    acv: null,     // NUEVO
    enfermedadRenal: null, // NUEVO
    hivHepatitis: null, // NUEVO
    reproduccionAsistida: null, // NUEVO
    
    // --- Salud Autoinmune ---
    enfermedadesAutoinmunes: null,
    autoinmunesTipo: [],
    
    // --- Salud Femenina / Mamaria ---
    tumoresGinecologicos: null,
    tumoresTipo: [],     
    
    // --- Salud Reproductiva ---
    tuvoHijos: null,
    cantidadHijos: '',
    complicacionesEmbarazo: null,
    motivoNoHijos: '',
    menopausia: null,
    edadMenopausia: '',
    ciclosMenstruales: null,
    metodoAnticonceptivo: '',
    histerectomia: null,

    // --- Resultados ---
    imc: '',
    nivelRiesgo: '',
    fechaRegistro: '',
    ubicacion: '',
};

// Función helper para normalizar valores del backend a valores de formulario
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
        
        const normalizarArray = (value) => {
            if (Array.isArray(value)) return value;
            return value ? String(value).split(',').map(item => item.trim()).filter(item => item) : [];
        };

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
          
          // NUEVOS CAMPOS CARDIO/INFECTO
          infarto: safeMapBoolean(data.infarto),
          acv: safeMapBoolean(data.acv),
          enfermedadRenal: safeMapBoolean(data.enfermedadRenal),
          hivHepatitis: safeMapBoolean(data.hivHepatitis),
          reproduccionAsistida: safeMapBoolean(data.reproduccionAsistida),
          // FIN NUEVOS CAMPOS

          colesterol: data.colesterol || 'No'
        };

        setDatos(loadedData);
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
        if (value === 'No') {
            setDatos(prev => ({ ...prev, colesterol: 'No' }));
        } else {
             if (datos.colesterol === 'No') {
                 setDatos(prev => ({ ...prev, colesterol: '' }));
             }
        }
    } else if (name === 'colesterol') {
        setDatos(prev => ({ ...prev, colesterol: value }));
    }
  };


  // 3. Recalcular IMC/Riesgo al cambiar datos clave
  const datosCalculados = useMemo(() => {
      if (datos.peso && datos.talla && parseFloat(datos.peso) > 0 && parseFloat(datos.talla) > 0) {
          // El riesgo real debe ser calculado en base a todos los factores
          return calcularRiesgoCardiovascular(datos);
      }
      return { imc: datos.imc, nivelRiesgo: datos.nivelRiesgo };
  }, [datos.peso, datos.talla, datos.tensionSistolica, datos.imc, datos.nivelRiesgo, datos.tensionDiastolica, datos.colesterol, datos.fumaDiario]);


  // 4. Enviar datos
  const actualizarPaciente = (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    // Validar campos requeridos antes de enviar
    if (!datos.dni || !datos.fechaNacimiento || !datos.edad || !datos.genero || !datos.peso || !datos.talla || !datos.tensionSistolica || !datos.tensionDiastolica) {
        setError('Por favor, completa todos los campos obligatorios (*).');
        return;
    }
    if (colesterolOption === 'Sí' && !datos.colesterol) {
         setError('Por favor, ingresa el valor de Colesterol Total.');
        return;
    }


    // Preparar los datos antes de enviar (ej. convertir arrays a string separado por comas)
    const datosAEnviar = {
        ...datos,
        ...datosCalculados, 
        // Convertir Arrays a String para el backend
        medicacionCondiciones: Array.isArray(datos.medicacionCondiciones) ? datos.medicacionCondiciones.join(', ') : datos.medicacionCondiciones,
        tumoresTipo: Array.isArray(datos.tumoresTipo) ? datos.tumoresTipo.join(', ') : datos.tumoresTipo,
        autoinmunesTipo: Array.isArray(datos.autoinmunesTipo) ? datos.autoinmunesTipo.join(', ') : datos.autoinmunesTipo,
        
        // El backend espera el id en el objeto
        id: id,
    };
    
    axiosInstance.put(apiPath, datosAEnviar)
      .then(() => {
        setMensaje('Paciente actualizado con éxito.');
        setTimeout(() => navigate('/estadisticas'), 2000); // Redirigir después de 2 segundos
      })
      .catch(err => {
        console.error('Error al actualizar paciente:', err.response?.data || err.message);
        setError('Error al actualizar paciente. Revisa la consola y la URL del backend.');
      });
  };

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold text-indigo-600">Cargando datos del paciente ID: {id}...</div>;
  }

  // Destructuración para mejor legibilidad en el render
  const { nivelRiesgo, imc } = datosCalculados;


  // --- COMPONENTES HELPER ---
  
  const RadioGroup = ({ label, name, options = ['Sí', 'No', 'No aplica'], conditionalContent, isRequired=false }) => (
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
  
  const InputField = ({ label, name, type = 'text', placeholder, isRequired = false, min, max }) => (
    <div>
        <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${isRequired ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}>{label}</label>
        <input 
            type={type} 
            name={name} 
            id={name} 
            value={datos[name] || ''} 
            onChange={manejarCambio} 
            placeholder={placeholder} 
            required={isRequired}
            min={min}
            max={max}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
    </div>
  );

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
                    required={colesterolOption === 'Sí'}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                />
            </div>
        )}
    </div>
  );
  
  // --- FIN COMPONENTES HELPER ---

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
            Editar Paciente ID: <span className="text-gray-800">{id}</span>
        </h1> 
        <h2 className="text-lg font-semibold text-gray-600 mb-6">DNI: {datos.dni}</h2>

        {/* Mensajes de feedback */}
        {mensaje && <div className="p-4 mb-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg border border-green-300">{mensaje}</div>}
        {error && <div className="p-4 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-300">{error}</div>}

        <form onSubmit={actualizarPaciente} className="space-y-10">
          
          {/* --- SECCIÓN 1: IDENTIFICACIÓN Y DATOS GENERALES --- */}
          <div className="space-y-6 p-4 border border-indigo-200 rounded-lg bg-indigo-50">
              <h2 className="text-xl font-bold text-indigo-800 border-b pb-1">1. Datos Generales y Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="DNI" name="dni" type="text" placeholder="Número de DNI" isRequired={true} />
                <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" isRequired={true} />
                <InputField label="Teléfono" name="telefono" type="tel" placeholder="Nro. de contacto" />
                <InputField label="Edad" name="edad" type="number" min="1" placeholder="Edad" isRequired={true} />
                <InputField label="Ubicación (Localidad/Provincia)" name="ubicacion" type="text" placeholder="Ej: Córdoba, Córdoba" />
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Género</label>
                    <select name="genero" value={datos.genero} onChange={manejarCambio} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
              </div>
          </div>
          
          {/* --- SECCIÓN 2: MEDICIONES Y RIESGO --- */}
          <div className="space-y-6 p-4 border border-green-200 rounded-lg bg-green-50">
              <h2 className="text-xl font-bold text-green-800 border-b pb-1">2. Mediciones y Riesgo</h2>
              
              {/* Resultados de Cálculo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-white shadow-sm">
                  <div>
                      <h3 className="text-md font-semibold text-gray-700">Índice de Masa Corporal (IMC)</h3>
                      <p className="text-lg font-bold text-indigo-600 mt-1">{imc || 'Calculando...'}</p>
                  </div>
                  <div>
                      <h3 className="text-md font-semibold text-gray-700">Nivel de Riesgo Cardiovascular</h3>
                      <div className={`p-2 mt-1 font-bold text-sm rounded-lg ${obtenerColorRiesgo(nivelRiesgo)}`}>
                          {nivelRiesgo || 'Calculando...'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{obtenerTextoRiesgo(nivelRiesgo)}</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InputField label="Peso (kg)" name="peso" type="number" min="1" placeholder="Ej: 75.5" isRequired={true} />
                <InputField label="Talla (cm o m)" name="talla" type="number" min="0.5" placeholder="Ej: 1.70 o 170" isRequired={true} />
                <InputField label="Circunferencia Cintura (cm)" name="cintura" type="number" min="1" placeholder="Ej: 90" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InputField label="Tensión Sistólica (mm Hg)" name="tensionSistolica" type="number" min="60" max="300" placeholder="Ej: 120" isRequired={true} />
                <InputField label="Tensión Diastólica (mm Hg)" name="tensionDiastolica" type="number" min="40" max="200" placeholder="Ej: 80" isRequired={true} />
                <div className="col-span-full md:col-span-2">
                    <ColesterolInput />
                </div>
              </div>
          </div>
          
          {/* --- SECCIÓN 3: HÁBITOS, MEDICACIÓN Y ANTECEDENTES CARDIOVASCULARES --- */}
          <div className="space-y-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
              <h2 className="text-xl font-bold text-purple-800 border-b pb-1">3. Condiciones, Hábitos y Antecedentes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RadioGroup label="Toma medicación diariamente" name="tomaMedicacionDiario" options={['Sí', 'No']} isRequired={true} />
                <CheckboxGroup 
                    label="Condiciones Médicas (Múltiple)" 
                    name="medicacionCondiciones" 
                    options={['Diabetes', 'Hipertensión', 'Dislipemia', 'Otras']} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RadioGroup label="Fuma diariamente" name="fumaDiario" options={['Sí', 'No', 'Ex-Fumador']} isRequired={true} />
                <RadioGroup label="Actividad física semanal (≥ 150 min)" name="actividadFisica" options={['Sedentario', 'Moderado', 'Activo']} />
                <RadioGroup label="Duerme un promedio de 7-8 hs diarias" name="horasSueno" options={['Sí', 'No']} />
              </div>

              <RadioGroup 
                label="Estrés crónico (Más de 6 meses)" 
                name="estresCronico" 
                options={['Sí', 'No']}
                conditionalContent={(respuesta) => respuesta === 'Sí' && (
                    <InputField label="Tipo de Estrés" name="estresTipo" type="text" placeholder="Laboral, familiar, económico, etc." />
                )}
              />

              <h3 className="text-lg font-semibold text-purple-700 mt-6 border-t pt-4">Antecedentes de Eventos Cardiovasculares</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <RadioGroup label="Infarto de miocardio previo" name="infarto" options={['Sí', 'No', 'No aplica']} />
                <RadioGroup label="Accidente Cerebrovascular (ACV) previo" name="acv" options={['Sí', 'No', 'No aplica']} />
                <RadioGroup label="Enfermedad Renal Crónica" name="enfermedadRenal" options={['Sí', 'No', 'No aplica']} />
                <RadioGroup label="HIV o Hepatitis B/C" name="hivHepatitis" options={['Sí', 'No']} />
              </div>
          </div>


          {/* --- SECCIÓN 4: ANTECEDENTES GINECOLÓGICOS Y MAMARIOS (SOLO SI GÉNERO ES FEMENINO) --- */}
          {datos.genero === 'femenino' && (
            <div className="space-y-6 p-4 border border-pink-300 rounded-lg bg-pink-100">
                <h2 className="text-xl font-bold text-pink-800 border-b pb-1">4. Salud Femenina y Reproductiva</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RadioGroup 
                        label="Enfermedades Autoinmunes" 
                        name="enfermedadesAutoinmunes" 
                        options={['Sí', 'No']}
                        conditionalContent={(respuesta) => respuesta === 'Sí' && (
                            <CheckboxGroup label="Tipos" name="autoinmunesTipo" options={['Lupus', 'Artritis', 'Tiroide', 'Otras']} />
                        )}
                    />
                    <RadioGroup 
                        label="Tumores Ginecológicos o Mamarios" 
                        name="tumoresGinecologicos" 
                        options={['Sí', 'No']}
                        conditionalContent={(respuesta) => respuesta === 'Sí' && (
                            <CheckboxGroup label="Tipos" name="tumoresTipo" options={['Ovarios', 'Mama', 'Útero', 'Otros']} />
                        )}
                    />
                </div>
                
                
                <h3 className="text-lg font-semibold text-pink-700 mt-6 border-t pt-4">Antecedentes Reproductivos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RadioGroup label="Utilizó Reproducción Asistida" name="reproduccionAsistida" options={['Sí', 'No']} />
                    <RadioGroup label="Ciclos Menstruales" name="ciclosMenstruales" options={['Regulares', 'Irregulares', 'Ausentes', 'No aplica']} />
                </div>

                <RadioGroup 
                    label="Tuvo Hijos (partos o cesáreas)" 
                    name="tuvoHijos" 
                    options={['Sí', 'No']}
                    conditionalContent={(respuesta) => respuesta === 'Sí' ? (
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Cantidad de Hijos" name="cantidadHijos" type="number" min="0" placeholder="Número" />
                            <RadioGroup label="Complicaciones en algún embarazo" name="complicacionesEmbarazo" options={['Sí', 'No']} isRequired={false} />
                        </div>
                    ) : respuesta === 'No' ? (
                        <InputField label="Motivo" name="motivoNoHijos" type="text" placeholder="No quiso, No pudo, Otros" />
                    ) : null}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RadioGroup 
                        label="Menopausia" 
                        name="menopausia" 
                        options={['Sí', 'No']} 
                        conditionalContent={(respuesta) => respuesta === 'Sí' && (
                            <InputField label="Edad de Menopausia" name="edadMenopausia" type="number" min="10" max="65" placeholder="Edad" />
                        )}
                    />
                    <RadioGroup label="Histerectomía (Extirpación de Útero)" name="histerectomia" options={['Sí', 'No']} />
                    <InputField label="Método Anticonceptivo Actual" name="metodoAnticonceptivo" type="text" placeholder="DIU, Pastillas, No usa, etc." />
                </div>

            </div>
          )}

          
          {/* --- BOTÓN DE ENVÍO --- */}
          <div className="mt-8 flex justify-end space-x-4">
              <button 
                  type="button"
                  onClick={() => navigate('/estadisticas')}
                  className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                  Cancelar y Volver
              </button>
              <button
                  type="submit"
                  className="px-6 py-3 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
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