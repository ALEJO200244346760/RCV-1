import React, { useEffect, useState } from 'react';
// ASUMO que estos archivos existen en tu proyecto y se mantienen igual.
import { calcularRiesgoCardiovascular } from './Calculadora'; 
import { Advertencia, obtenerColorRiesgo, obtenerTextoRiesgo } from './ConstFormulario';
import axiosInstance from '../axiosConfig';

// Estado inicial para el nuevo formulario.
const datosInicialesMujer = {
    dni: '',
    edad: '',
    tomaMedicacionDiario: null, // Sí o No
    medicacionCondiciones: [], // ['Diabetes', 'Hipertensión', etc.]
    fumaDiario: null, // Sí o No
    actividadFisica: null, // Sí o No
    horasSueno: null, // Sí o No
    estresCronico: null, // Sí o No
    estresTipo: '', // 'Depresión' u 'Otras'
    tumoresGinecologicos: null, // Sí o No
    tumoresTipo: [], // ['Ovarios', 'Mama', 'Útero']
    enfermedadesAutoinmunes: null, // Sí o No
    autoinmunesTipo: [], // ['Lupus', 'Artritis', 'Otras']
    tuvoHijos: null, // Sí o No
    cantidadHijos: '',
    complicacionesEmbarazo: null, // Sí o No
    motivoNoHijos: '', // 'No quiso', 'No pudo', etc.
    menopausia: null, // Sí o No
    edadMenopausia: '',
    ciclosMenstruales: null, // Sí o No
    metodoAnticonceptivo: '',
    histerectomia: null, // Sí o No
    peso: '',
    talla: '',
    cintura: '',
    tensionSistolica: '',
    tensionDiastolica: '',
    // Datos necesarios para el cálculo de riesgo
    genero: 'femenino', // Fijo para este formulario
    colesterol: 'No', // Valor por defecto
};

const FormularioMujer = () => {
    const [datosMujer, setDatosMujer] = useState(datosInicialesMujer);
    const [imc, setImc] = useState({ valor: '', clasificacion: '' });
    const [nivelColesterolConocido, setNivelColesterolConocido] = useState(false);
    
    // Estados para la lógica del modal y notificaciones (igual que en el original)
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

    // --- MANEJADORES DE ESTADO ---

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

    // Funciones de ajuste para el cálculo (adaptadas del original)
    const ajustarEdad = (edad) => {
        if (edad < 50) return 40;
        if (edad >= 50 && edad <= 59) return 50;
        if (edad >= 60 && edad <= 69) return 60;
        return 70;
    };

    const ajustarPresionArterial = (presion) => {
        if (presion < 140) return 120;
        if (presion >= 140 && presion <= 159) return 140;
        if (presion >= 160 && presion <= 179) return 160;
        return 180;
    };

    const validarCampos = () => {
        if (!datosMujer.dni || !datosMujer.edad || !datosMujer.tensionSistolica) {
            setError('Por favor, complete DNI, Edad y Tensión Sistólica.');
            return false;
        }
        if (datosMujer.edad < 18 || datosMujer.edad > 100) {
            setError('La edad debe ser válida.');
            return false;
        }
        setError('');
        return true;
    };

    const calcularRiesgo = () => {
        if (!validarCampos()) {
            // Se podría mostrar el error en un modal si se prefiere
            alert(error); 
            return;
        }

        // Mapeo de los datos del formulario a los requeridos por la calculadora
        const datosParaCalculo = {
            edad: ajustarEdad(parseInt(datosMujer.edad, 10)),
            genero: 'femenino',
            diabetes: datosMujer.medicacionCondiciones.includes('Diabetes') ? 'Sí' : 'No',
            fumador: datosMujer.fumaDiario,
            presionArterial: ajustarPresionArterial(parseInt(datosMujer.tensionSistolica, 10)),
            colesterol: datosMujer.colesterol,
        };

        const riesgoCalculado = calcularRiesgoCardiovascular(
            datosParaCalculo.edad,
            datosParaCalculo.genero,
            datosParaCalculo.diabetes,
            datosParaCalculo.fumador,
            datosParaCalculo.presionArterial,
            datosParaCalculo.colesterol
        );

        setNivelRiesgo(riesgoCalculado);
        setMostrarModal(true);
    };

    const guardarPaciente = async () => {
        try {
            // Enviamos el estado completo junto con el IMC y el riesgo calculado
            await axiosInstance.post('/api/pacientes', {
                ...datosMujer,
                imc: imc,
                nivelRiesgo: nivelRiesgo,
            });
    
            setMensajeExito('Paciente guardado con éxito');
            setTimeout(() => setMensajeExito(''), 3000);
            setTimeout(() => {
                window.location.reload(); // Recargar para un nuevo formulario
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

    // --- RENDERIZADO ---

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
                
                {/* --- DATOS PERSONALES Y HÁBITOS --- */}

                {/* DNI y Edad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">DNI:</label>
                        <input type="number" name="dni" value={datosMujer.dni} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Edad:</label>
                        <input type="number" name="edad" value={datosMujer.edad} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                </div>

                {/* Género (Fijo) */}
                 <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Género:</label>
                    <button type="button" className="p-2 border rounded bg-indigo-500 text-white w-full md:w-1/3">Femenino</button>
                </div>

                {/* Toma medicación */}
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

                {/* Fuma a diario */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">¿Fuma a diario?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('fumaDiario', o)} className={`p-2 border rounded ${datosMujer.fumaDiario === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>
                
                 {/* ... Otras preguntas de hábitos ... */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Realiza actividad física 150 minutos semanales?</label>
                    <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('actividadFisica', o)} className={`p-2 border rounded ${datosMujer.actividadFisica === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Duerme más de 7 horas diarias?</label>
                    <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('horasSueno', o)} className={`p-2 border rounded ${datosMujer.horasSueno === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Sufre de estrés crónico?</label>
                    <div className="flex space-x-2 mt-1">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('estresCronico', o)} className={`p-2 border rounded ${datosMujer.estresCronico === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                    {datosMujer.estresCronico === 'Sí' && (
                        <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                            {['Depresión', 'Otras'].map(tipo => (
                                <div key={tipo}>
                                    <input type="radio" id={`estres-${tipo}`} name="estresTipo" value={tipo} checked={datosMujer.estresTipo === tipo} onChange={handleChange} />
                                    <label htmlFor={`estres-${tipo}`} className="ml-2">{tipo}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- SALUD GINECOLÓGICA Y REPRODUCTIVA --- */}

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Antecedentes de tumores ginecológicos?</label>
                    <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('tumoresGinecologicos', o)} className={`p-2 border rounded ${datosMujer.tumoresGinecologicos === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                    {datosMujer.tumoresGinecologicos === 'Sí' && (
                         <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                            {['Ovarios', 'Mama', 'Útero'].map(t => <div key={t}><input type="checkbox" id={t} value={t} checked={datosMujer.tumoresTipo.includes(t)} onChange={() => handleCheckboxChange('tumoresTipo', t)} /><label htmlFor={t} className="ml-2">{t}</label></div>)}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Enfermedades autoinmunes?</label>
                     <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('enfermedadesAutoinmunes', o)} className={`p-2 border rounded ${datosMujer.enfermedadesAutoinmunes === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                     {datosMujer.enfermedadesAutoinmunes === 'Sí' && (
                         <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                            {['Lupus', 'Artritis', 'Otras'].map(e => <div key={e}><input type="checkbox" id={e} value={e} checked={datosMujer.autoinmunesTipo.includes(e)} onChange={() => handleCheckboxChange('autoinmunesTipo', e)} /><label htmlFor={e} className="ml-2">{e}</label></div>)}
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Tuvo hijos?</label>
                     <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('tuvoHijos', o)} className={`p-2 border rounded ${datosMujer.tuvoHijos === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                     {datosMujer.tuvoHijos === 'Sí' && (
                         <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-4 rounded-r-lg">
                            <div className="flex flex-col"><label>¿Cuántos?:</label><input type="number" name="cantidadHijos" value={datosMujer.cantidadHijos} onChange={handleChange} className="p-2 border rounded"/></div>
                            <div className="flex flex-col"><label>¿Tuvo hipertensión o diabetes gestacional?</label><div className="flex space-x-2 mt-1">{['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('complicacionesEmbarazo', o)} className={`p-2 border rounded ${datosMujer.complicacionesEmbarazo === o ? 'bg-green-500 text-white' : ''}`}>{o}</button>)}</div></div>
                        </div>
                    )}
                    {datosMujer.tuvoHijos === 'No' && (
                        <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                             {['No quiso', 'No pudo', 'Tuvo pérdidas', 'No se dio'].map(m => <div key={m}><input type="radio" id={m} name="motivoNoHijos" value={m} checked={datosMujer.motivoNoHijos === m} onChange={handleChange} /><label htmlFor={m} className="ml-2">{m}</label></div>)}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Presenta ciclos menstruales?</label>
                     <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('ciclosMenstruales', o)} className={`p-2 border rounded ${datosMujer.ciclosMenstruales === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                     {datosMujer.ciclosMenstruales === 'Sí' && (
                        <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                            <label>Método anticonceptivo:</label>
                            <input type="text" name="metodoAnticonceptivo" value={datosMujer.metodoAnticonceptivo} onChange={handleChange} className="p-2 border rounded w-full"/>
                        </div>
                     )}
                     {datosMujer.ciclosMenstruales === 'No' && (
                         <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-4 rounded-r-lg">
                            <div className="flex flex-col"><label>¿Presenta histerectomía?</label><div className="flex space-x-2 mt-1">{['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('histerectomia', o)} className={`p-2 border rounded ${datosMujer.histerectomia === o ? 'bg-green-500 text-white' : ''}`}>{o}</button>)}</div></div>
                            <div className="flex flex-col"><label>¿A qué edad presentó la menopausia?:</label><input type="number" name="edadMenopausia" value={datosMujer.edadMenopausia} onChange={handleChange} className="p-2 border rounded"/></div>
                        </div>
                     )}
                </div>


                {/* --- DATOS ANTROPOMÉTRICOS --- */}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="flex flex-col">
                        <label>Peso (kg):</label>
                        <input type="number" name="peso" value={datosMujer.peso} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                     <div className="flex flex-col">
                        <label>Talla (cm):</label>
                        <input type="number" name="talla" value={datosMujer.talla} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                     <div className="flex flex-col">
                        <label>Cintura (cm):</label>
                        <input type="number" name="cintura" value={datosMujer.cintura} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                </div>

                {/* Muestra de IMC Calculado */}
                {imc.valor && (
                    <div className="p-3 bg-gray-100 rounded-md text-center">
                        <p className="font-semibold">IMC: {imc.valor} - <span className="font-bold">{imc.clasificacion}</span></p>
                    </div>
                )}
                
                {/* --- DATOS PARA CÁLCULO DE RIESGO --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label>Tensión Sistólica:</label>
                        <input type="number" name="tensionSistolica" value={datosMujer.tensionSistolica} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Tensión Diastólica:</label>
                        <input type="number" name="tensionDiastolica" value={datosMujer.tensionDiastolica} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Resumen del Paciente</h2>
                        
                        {/* Datos ingresados */}
                        <div className="space-y-2 text-gray-800">
                           <p><strong>DNI:</strong> {datosMujer.dni}</p>
                           <p><strong>Edad:</strong> {datosMujer.edad}</p>
                           <p><strong>Toma Medicación:</strong> {datosMujer.tomaMedicacionDiario} {datosMujer.tomaMedicacionDiario === 'Sí' ? `(${datosMujer.medicacionCondiciones.join(', ')})` : ''}</p>
                           <p><strong>Fuma:</strong> {datosMujer.fumaDiario}</p>
                           <p><strong>Actividad Física (+150 min/sem):</strong> {datosMujer.actividadFisica}</p>
                           <p><strong>Sueño (+7hs):</strong> {datosMujer.horasSueno}</p>
                           <p><strong>Estrés Crónico:</strong> {datosMujer.estresCronico} {datosMujer.estresCronico === 'Sí' ? `(${datosMujer.estresTipo})` : ''}</p>
                           <p><strong>Tuvo Hijos:</strong> {datosMujer.tuvoHijos} {datosMujer.tuvoHijos === 'Sí' ? `(Cantidad: ${datosMujer.cantidadHijos}, Complicaciones: ${datosMujer.complicacionesEmbarazo})` : `(${datosMujer.motivoNoHijos})`}</p>
                           <p><strong>Ciclos Menstruales:</strong> {datosMujer.ciclosMenstruales}</p>
                           <hr/>
                           <p><strong>Peso:</strong> {datosMujer.peso} kg | <strong>Talla:</strong> {datosMujer.talla} cm | <strong>Cintura:</strong> {datosMujer.cintura} cm</p>
                           <p><strong>IMC:</strong> {imc.valor} ({imc.clasificacion})</p>
                           <p><strong>Tensión Arterial:</strong> {datosMujer.tensionSistolica} / {datosMujer.tensionDiastolica} mmHg</p>
                        </div>

                        {/* Nivel de Riesgo */}
                        <div className="mt-6">
                            <p className="font-semibold text-lg mb-2">Nivel de Riesgo Cardiovascular:</p>
                            {renderRiesgoGrid(nivelRiesgo)}
                        </div>

                        {/* Botones de acción */}
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
            
            {/* Mensajes de éxito y advertencia (igual que el original) */}
            {mensajeExito && <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">{mensajeExito}</div>}
            {modalAdvertencia && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Aviso</h2>
                        <p>{modalAdvertencia}</p>
                        <button onClick={cerrarModal} className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md w-full">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formulario;