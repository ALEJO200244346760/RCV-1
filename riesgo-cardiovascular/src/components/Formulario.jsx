import React, { useEffect, useState } from 'react';
// ASUMO que estos archivos existen en tu proyecto y se mantienen igual.
import { calcularRiesgoCardiovascular } from './Calculadora'; 
import { Advertencia, obtenerColorRiesgo, obtenerTextoRiesgo } from './ConstFormulario';
import axiosInstance from '../axiosConfig';


// Se añaden los nuevos campos al estado inicial.
const datosInicialesMujer = {
    dni: '',
    fechaNacimiento: '',
    telefono: '',
    edad: '',
    tomaMedicacionDiario: null,
    medicacionCondiciones: [],
    fumaDiario: null,
    actividadFisica: null,
    horasSueno: null,
    estresCronico: null,
    estresTipo: '',
    tumoresGinecologicos: null,
    tumoresTipo: [],
    enfermedadesAutoinmunes: null,
    autoinmunesTipo: [],
    tuvoHijos: null,
    cantidadHijos: '',
    complicacionesEmbarazo: null,
    motivoNoHijos: '',
    menopausia: null,
    edadMenopausia: '',
    ciclosMenstruales: null,
    metodoAnticonceptivo: '',
    histerectomia: null,
    peso: '',
    talla: '',
    cintura: '',
    tensionSistolica: '',
    tensionDiastolica: '',
    genero: 'femenino',
    colesterol: 'No',
};

const Formulario = () => {
    const [datosMujer, setDatosMujer] = useState(datosInicialesMujer);
    const [imc, setImc] = useState({ valor: '', clasificacion: '' });
    const [nivelColesterolConocido, setNivelColesterolConocido] = useState(false);
    
    const [nivelRiesgo, setNivelRiesgo] = useState(null);
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalAdvertencia, setModalAdvertencia] = useState(null);

    // Efecto para calcular el IMC automáticamente
    useEffect(() => {
        const peso = parseFloat(datosMujer.peso);
        const tallaCm = parseFloat(datosMujer.talla);
        if (peso > 0 && tallaCm > 0) {
            const tallaM = tallaCm / 100;
            const imcCalculado = peso / (tallaM * tallaM);
            let clasificacion = '';
            if (imcCalculado < 18.5) clasificacion = 'Bajo peso';
            else if (imcCalculado < 25) clasificacion = 'Normopeso';
            else if (imcCalculado < 30) clasificacion = 'Sobrepeso';
            else if (imcCalculado < 35) clasificacion = 'Obesidad Grado I';
            else if (imcCalculado < 40) clasificacion = 'Obesidad Grado II';
            else clasificacion = 'Obesidad Grado III';
            
            setImc({ valor: imcCalculado.toFixed(2), clasificacion });
        } else {
            setImc({ valor: '', clasificacion: '' });
        }
    }, [datosMujer.peso, datosMujer.talla]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosMujer(prev => ({ ...prev, [name]: value }));
    };

    const handleButtonToggle = (name, value) => {
        setDatosMujer(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field, value) => {
        setDatosMujer(prev => {
            const list = prev[field];
            const newList = list.includes(value)
                ? list.filter(item => item !== value)
                : [...list, value];
            return { ...prev, [field]: newList };
        });
    };
    
    // --- LÓGICA DE CÁLCULO Y GUARDADO ---

    const validarCampos = () => {
        // Campos clave para el cálculo de riesgo
        if (!datosMujer.dni || !datosMujer.edad || !datosMujer.tensionSistolica) {
            setError('Por favor, complete DNI, Edad y Tensión Sistólica para calcular el riesgo.');
            setModalAdvertencia('Por favor, complete DNI, Edad y Tensión Sistólica para calcular el riesgo.');
            setMostrarModal(true);
            return false;
        }
        if (datosMujer.edad < 18 || datosMujer.edad > 100) {
            setError('La edad debe ser un número válido.');
             setModalAdvertencia('La edad debe ser un número válido.');
             setMostrarModal(true);
            return false;
        }
        setError('');
        return true;
    };

    const calcularRiesgo = () => {
        if (!validarCampos()) {
            return;
        }

        // --- LÓGICA DE CÁLCULO DE RIESGO ---
        // 1. Mapear los datos del formulario a los que necesita la calculadora
        const diabetes = datosMujer.medicacionCondiciones.includes('Diabetes') ? 'si' : 'no';
        const fuma = datosMujer.fumaDiario === 'Sí' ? 'si' : 'no';
        const edadParaCalculo = parseInt(datosMujer.edad, 10);
        const presionParaCalculo = parseInt(datosMujer.tensionSistolica, 10);
        const colesterolParaCalculo = nivelColesterolConocido ? parseInt(datosMujer.colesterol, 10) : "No";

        // 2. Llamar a la función importada
        const riesgoCalculado = calcularRiesgoCardiovascular(
            edadParaCalculo,
            'femenino',
            diabetes,
            fuma,
            presionParaCalculo,
            colesterolParaCalculo
        );

        setNivelRiesgo(riesgoCalculado);
        setMostrarModal(true);
    };

    const guardarPaciente = async () => {
        try {
            const payload = {
                ...datosMujer,
                imc: `${imc.valor} (${imc.clasificacion})`, // Envía el IMC como un string combinado
                nivelRiesgo: nivelRiesgo,
            };

            await axiosInstance.post('/api/pacientes', payload);
    
            setMensajeExito('Paciente guardado con éxito');
            setMostrarModal(false); // Cierra el modal de resultados
            setTimeout(() => setMensajeExito(''), 3000);
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            setModalAdvertencia('Ocurrió un error al guardar los datos.');
            setMostrarModal(true);
        }
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setModalAdvertencia(null);
    };

    const renderRiesgoGrid = (riesgo) => {
        const riesgos = ['<10% Bajo', '>10% <20% Moderado', '>20% <30% Alto', '>30% <40% Muy Alto', '>40% Crítico'];
        return (
            <div className="grid grid-cols-12 gap-2">
                {riesgos.map((nivel) => (
                    <React.Fragment key={nivel}>
                        <div className={`col-span-4 ${obtenerColorRiesgo(nivel)}`}></div>
                        <div className={`col-span-8 ${riesgo === nivel ? obtenerColorRiesgo(nivel) : 'bg-gray-300'} p-2`}>
                            <span className={`${riesgo === nivel ? 'text-white' : 'text-gray-600'}`}>{obtenerTextoRiesgo(nivel)}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-2xl mx-auto">
            <form className="w-full space-y-6">
                <h1 className="text-3xl font-bold mb-6">Formulario de Salud Femenina y Riesgo Cardiovascular</h1>
                
                {/* --- DATOS PERSONALES --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">DNI:</label>
                        <input type="number" name="dni" value={datosMujer.dni} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Edad:</label>
                        <input type="number" name="edad" value={datosMujer.edad} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                     <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
                        <input type="date" name="fechaNacimiento" value={datosMujer.fechaNacimiento} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                     <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Teléfono:</label>
                        <input type="tel" name="telefono" value={datosMujer.telefono} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                </div>

                {/* ... (resto del formulario sin cambios) ... */}

                 <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Género:</label>
                    <button type="button" className="p-2 border rounded bg-indigo-500 text-white w-full md:w-1/3 cursor-not-allowed">Femenino</button>
                </div>
                
                {/* ... (resto del formulario sin cambios) ... */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">¿Toma medicación a diario?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('tomaMedicacionDiario', o)} className={`p-2 border rounded ${datosMujer.tomaMedicacionDiario === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                    {datosMujer.tomaMedicacionDiario === 'Sí' && (
                        <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                            {['Diabetes', 'Hipertensión', 'Colesterol', 'Tiroides', 'Otras'].map(med => (
                                <div key={med} className="flex items-center">
                                    <input type="checkbox" id={med} value={med} checked={datosMujer.medicacionCondiciones.includes(med)} onChange={() => handleCheckboxChange('medicacionCondiciones', med)} className="h-4 w-4 rounded"/>
                                    <label htmlFor={med} className="ml-3 text-sm">{med}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">¿Fuma a diario?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('fumaDiario', o)} className={`p-2 border rounded ${datosMujer.fumaDiario === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>

                {/* --- DATOS PARA CÁLCULO DE RIESGO --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label>Tensión Sistólica:</label>
                        <input type="number" name="tensionSistolica" value={datosMujer.tensionSistolica} onChange={handleChange} className="mt-1 p-2 border rounded-md" placeholder="Ej: 120"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Tensión Diastólica:</label>
                        <input type="number" name="tensionDiastolica" value={datosMujer.tensionDiastolica} onChange={handleChange} className="mt-1 p-2 border rounded-md" placeholder="Ej: 80"/>
                    </div>
                </div>
                 <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Conoce su nivel de colesterol?</label>
                    <div className="flex space-x-2 mt-1">
                        <button type="button" onClick={() => setNivelColesterolConocido(true)} className={`p-2 border rounded ${nivelColesterolConocido ? 'bg-indigo-500 text-white' : ''}`}>Sí</button>
                        <button type="button" onClick={() => {setNivelColesterolConocido(false); setDatosMujer(p => ({...p, colesterol: 'No'}));}} className={`p-2 border rounded ${!nivelColesterolConocido ? 'bg-indigo-500 text-white' : ''}`}>No</button>
                    </div>
                     {nivelColesterolConocido && (
                        <input type="number" name="colesterol" value={datosMujer.colesterol === 'No' ? '' : datosMujer.colesterol} onChange={handleChange} placeholder="Ingrese valor de colesterol total" className="mt-2 p-2 border rounded"/>
                     )}
                </div>


                <button type="button" onClick={calcularRiesgo} className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
                    Calcular Riesgo y Finalizar
                </button>
            </form>

            {/* --- MODAL DE RESULTADOS --- */}
            {mostrarModal && !modalAdvertencia && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Resumen del Paciente</h2>
                        
                        <div className="space-y-2 text-gray-800">
                           <p><strong>DNI:</strong> {datosMujer.dni}</p>
                           <p><strong>Fecha de Nacimiento:</strong> {datosMujer.fechaNacimiento}</p>
                           <p><strong>Teléfono:</strong> {datosMujer.telefono}</p>
                           <p><strong>Edad:</strong> {datosMujer.edad}</p>
                           {/* ... (resto de los datos del modal) ... */}
                           <p><strong>Toma Medicación:</strong> {datosMujer.tomaMedicacionDiario} {datosMujer.tomaMedicacionDiario === 'Sí' ? `(${datosMujer.medicacionCondiciones.join(', ')})` : ''}</p>
                           <p><strong>Fuma:</strong> {datosMujer.fumaDiario}</p>
                           <p><strong>IMC:</strong> {imc.valor} ({imc.clasificacion})</p>
                           <p><strong>Tensión Arterial:</strong> {datosMujer.tensionSistolica} / {datosMujer.tensionDiastolica} mmHg</p>
                        </div>

                        <div className="mt-6">
                            <p className="font-semibold text-lg mb-2">Nivel de Riesgo Cardiovascular:</p>
                            {renderRiesgoGrid(nivelRiesgo)}
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row gap-3">
                            <button onClick={guardarPaciente} className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Guardar Paciente
                            </button>
                            <button onClick={cerrarModal} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {mensajeExito && <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50">{mensajeExito}</div>}
            
            {mostrarModal && modalAdvertencia && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4 text-red-600">Aviso</h2>
                        <p>{modalAdvertencia}</p>
                        <button onClick={cerrarModal} className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md w-full">Entendido</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formulario;