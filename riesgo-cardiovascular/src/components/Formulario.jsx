import React, { useEffect, useState } from 'react';
// ASUMO que estos archivos existen en tu proyecto y se mantienen igual.
import { calcularRiesgoCardiovascular } from './Calculadora'; 
import { obtenerColorRiesgo, obtenerTextoRiesgo } from './ConstFormulario';
import axiosInstance from '../axiosConfig';

// Estado inicial completo con los nuevos campos
const datosInicialesMujer = {
    dni: '',
    fechaNacimiento: '', 
    telefono: '',        
    edad: '',
    // --- NUEVOS CAMPOS ---
    familiarCancerMama: null, // Nuevo
    puncionMama: null,        // Nuevo
    mamaDensa: null,          // Nuevo
    // ---------------------
    tomaMedicacionDiario: null,
    medicacionCondiciones: [],
    fumaDiario: null,
    actividadFisica: null,
    horasSueno: null,
    estresCronico: null, // Mantenemos el nombre del campo, cambiamos el label
    estresTipo: '',
    tumoresGinecologicos: null,
    tumoresTipo: [],
    enfermedadesAutoinmunes: null, // Cambiamos la pregunta, mantenemos el campo
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
    const [mensajeExito, setMensajeExito] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalAdvertencia, setModalAdvertencia] = useState(null);

    // --- EFFECT para CALCULAR EDAD e IMC ---
    useEffect(() => {
        // 1. Cálculo de IMC
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
        
        // 2. Cálculo de Edad a partir de Fecha de Nacimiento
        if (datosMujer.fechaNacimiento) {
            const dob = new Date(datosMujer.fechaNacimiento);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            // Actualizar la edad en el estado si la fecha es válida
            setDatosMujer(prev => ({ ...prev, edad: age.toString() }));
        } else if (datosMujer.edad !== '') {
            // Limpiar edad si se limpia la fecha
            setDatosMujer(prev => ({ ...prev, edad: '' }));
        }

    }, [datosMujer.peso, datosMujer.talla, datosMujer.fechaNacimiento]);

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
        if (!datosMujer.dni || !datosMujer.edad || !datosMujer.tensionSistolica) {
            setModalAdvertencia('Por favor, complete DNI, Edad y Tensión Sistólica para calcular el riesgo.');
            setMostrarModal(true);
            return false;
        }
        const edadNum = parseInt(datosMujer.edad, 10);
        if (isNaN(edadNum) || edadNum < 18 || edadNum > 100) {
             setModalAdvertencia('La edad debe ser un número válido (entre 18 y 100 años).');
             setMostrarModal(true);
            return false;
        }
        return true;
    };
    
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

    const calcularRiesgo = () => {
        if (!validarCampos()) {
            return;
        }

        const edadAjustada = ajustarEdad(parseInt(datosMujer.edad, 10));
        const presionArterial = ajustarPresionArterial(parseInt(datosMujer.tensionSistolica, 10));
        // Se asume que Diabetes es la única que impacta en el cálculo de riesgo, y se toma de las condiciones médicas
        const diabetes = datosMujer.medicacionCondiciones.includes('Diabetes') ? 'si' : 'no'; 
        const fuma = datosMujer.fumaDiario === 'Sí' ? 'si' : 'no';
        const colesterolParaCalculo = nivelColesterolConocido && datosMujer.colesterol !== 'No' ? parseInt(datosMujer.colesterol, 10) : "No";

        const riesgoCalculado = calcularRiesgoCardiovascular(
            edadAjustada,
            'femenino',
            diabetes,
            fuma,
            presionArterial,
            colesterolParaCalculo
        );

        setNivelRiesgo(riesgoCalculado);
        setModalAdvertencia(null);
        setMostrarModal(true);
    };
    
    const guardarPaciente = async () => {
        try {
            // 1. Clonar los datos del formulario
            let datosParaEnviar = { ...datosMujer };

            // 2. Lógica para menopausia (Si no tiene ciclos y puso edad de menopausia)
            if (datosParaEnviar.ciclosMenstruales === 'No' && datosParaEnviar.edadMenopausia) {
                datosParaEnviar.menopausia = 'Sí';
            } else if (datosParaEnviar.ciclosMenstruales === 'Sí') {
                datosParaEnviar.menopausia = 'No';
            } else {
                datosParaEnviar.menopausia = datosParaEnviar.menopausia || 'No'; // Aseguramos un valor si no se contestó el bloque
            }

            // 3. Convertir null a string vacío
            Object.keys(datosParaEnviar).forEach(key => {
                if (datosParaEnviar[key] === null) {
                    datosParaEnviar[key] = '';
                }
            });

            // 4. Convertir campos tipo array a string (si la API lo requiere)
            const camposArray = ['medicacionCondiciones', 'autoinmunesTipo', 'tumoresTipo'];
            datosParaEnviar = transformarArraysAString(datosParaEnviar, camposArray);

            // 5. Armar payload final
            const payload = {
                ...datosParaEnviar,
                imc: `${imc.valor} (${imc.clasificacion})`,
                nivelRiesgo: nivelRiesgo,
            };

            // 6. Enviar POST
            await axiosInstance.post('/api/pacientes', payload);

            // 7. Feedback y recarga
            setMensajeExito('Paciente guardado con éxito');
            setMostrarModal(false);
            setTimeout(() => setMensajeExito(''), 3000);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Error al guardar los datos:', error);
            if (error.response) {
                console.error('Detalle del error del backend:', error.response.data);
            }
            setModalAdvertencia('Ocurrió un error al guardar los datos. Revise la consola para más detalles.');
            setMostrarModal(true);
        }
    };

// Función auxiliar para arrays
const transformarArraysAString = (obj, camposArray) => {
    const nuevo = { ...obj };
    camposArray.forEach(campo => {
        if (Array.isArray(nuevo[campo])) {
            nuevo[campo] = nuevo[campo].join(', ');
        }
    });
    return nuevo;
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
                        {/* Asumo que obtenerColorRiesgo devuelve clases de Tailwind CSS */}
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
                        <label className="text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
                        <input type="date" name="fechaNacimiento" value={datosMujer.fechaNacimiento} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                    {/* Campo de Edad de solo lectura y automático */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Edad (Automática):</label>
                        <input type="text" name="edad" value={datosMujer.edad} readOnly disabled className="mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Teléfono:</label>
                        <input type="tel" name="telefono" value={datosMujer.telefono} onChange={handleChange} className="mt-1 p-2 border rounded-md"/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Género:</label>
                    <button type="button" className="p-2 border rounded bg-indigo-500 text-white w-full md:w-1/3 cursor-not-allowed">Femenino</button>
                </div>
                
                {/* --- NUEVAS PREGUNTAS DE SALUD MAMARIA --- */}
                <h2 className="text-xl font-semibold border-b pb-2 pt-4">Salud Mamaria</h2>
                
                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Tiene algún familiar con cáncer de mama?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('familiarCancerMama', o)} className={`p-2 border rounded ${datosMujer.familiarCancerMama === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Alguna vez le hicieron alguna punción de mama?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('puncionMama', o)} className={`p-2 border rounded ${datosMujer.puncionMama === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Le dijeron si tenía mama densa al ver su mamografía?</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        {['Sí', 'No', 'No recuerdo', 'No sé lo que es'].map(o => (
                            <button key={o} type="button" onClick={() => handleButtonToggle('mamaDensa', o)} className={`p-2 border rounded ${datosMujer.mamaDensa === o ? 'bg-indigo-500 text-white' : ''}`}>
                                {o}
                            </button>
                        ))}
                    </div>
                </div>

                <h2 className="text-xl font-semibold border-b pb-2 pt-4">Historial y Hábitos</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Toma medicación a diario?</label>
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
                    <label className="text-sm font-medium">¿Fuma a diario?</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('fumaDiario', o)} className={`p-2 border rounded ${datosMujer.fumaDiario === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                </div>
                
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

                {/* --- PREGUNTA DE ESTRÉS MODIFICADA --- */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Siente que presenta estrés Crónico?</label>
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

                {/* --- PREGUNTA DE AUTOINMUNES MODIFICADA --- */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">¿Le dijeron alguna vez que tiene alguna enfermedad autoinmune?</label>
                     <div className="flex space-x-2 mt-1">
                         {['Sí', 'No'].map(o => <button key={o} type="button" onClick={() => handleButtonToggle('enfermedadesAutoinmunes', o)} className={`p-2 border rounded ${datosMujer.enfermedadesAutoinmunes === o ? 'bg-indigo-500 text-white' : ''}`}>{o}</button>)}
                    </div>
                     {datosMujer.enfermedadesAutoinmunes === 'Sí' && (
                         <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2 rounded-r-lg">
                            {['Lupus', 'Artritis', 'Otras'].map(e => <div key={e}><input type="checkbox" id={e} value={e} checked={datosMujer.autoinmunesTipo.includes(e)} onChange={() => handleCheckboxChange('autoinmunesTipo', e)} /><label htmlFor={e} className="ml-2">{e}</label></div>)}
                        </div>
                    )}
                </div>
                
                <h2 className="text-xl font-semibold border-b pb-2 pt-4">Historial Ginecológico</h2>

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

                <h2 className="text-xl font-semibold border-b pb-2 pt-4">Datos Antropométricos y Clínicos</h2>

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

                {imc.valor && (
                    <div className="p-3 bg-gray-100 rounded-md text-center">
                        <p className="font-semibold">IMC: {imc.valor} - <span className="font-bold">{imc.clasificacion}</span></p>
                    </div>
                )}
                
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Resumen del Paciente</h2>
                        
                        <div className="space-y-2 text-gray-800">
                           <p><strong>DNI:</strong> {datosMujer.dni}</p>
                           <p><strong>Fecha de Nacimiento:</strong> {datosMujer.fechaNacimiento}</p>
                           <p><strong>Teléfono:</strong> {datosMujer.telefono}</p>
                           <p><strong>Edad:</strong> {datosMujer.edad}</p>
                           <hr/>
                           <p className="font-semibold">Datos de Salud Mamaria:</p>
                           <p><strong>Familiar con Cáncer de Mama:</strong> {datosMujer.familiarCancerMama}</p>
                           <p><strong>Punción de Mama:</strong> {datosMujer.puncionMama}</p>
                           <p><strong>Mama Densa:</strong> {datosMujer.mamaDensa}</p>
                           <hr/>
                           <p><strong>Toma Medicación:</strong> {datosMujer.tomaMedicacionDiario} {datosMujer.tomaMedicacionDiario === 'Sí' ? `(${datosMujer.medicacionCondiciones.join(', ')})` : ''}</p>
                           <p><strong>Fuma:</strong> {datosMujer.fumaDiario}</p>
                           <p><strong>Actividad Física (+150 min/sem):</strong> {datosMujer.actividadFisica}</p>
                           <p><strong>Sueño (+7hs):</strong> {datosMujer.horasSueno}</p>
                           <p><strong>Estrés Crónico:</strong> {datosMujer.estresCronico} {datosMujer.estresCronico === 'Sí' ? `(${datosMujer.estresTipo})` : ''}</p>
                           <p><strong>Tumores Ginecológicos:</strong> {datosMujer.tumoresGinecologicos} {datosMujer.tumoresGinecologicos === 'Sí' ? `(${datosMujer.tumoresTipo.join(', ')})` : ''}</p>
                           <p><strong>Enf. Autoinmunes:</strong> {datosMujer.enfermedadesAutoinmunes} {datosMujer.enfermedadesAutoinmunes === 'Sí' ? `(${datosMujer.autoinmunesTipo.join(', ')})` : ''}</p>
                           <p><strong>Tuvo Hijos:</strong> {datosMujer.tuvoHijos} {datosMujer.tuvoHijos === 'Sí' ? `(Cantidad: ${datosMujer.cantidadHijos}, Complicaciones: ${datosMujer.complicacionesEmbarazo})` : `(${datosMujer.motivoNoHijos})`}</p>
                           <p><strong>Ciclos Menstruales:</strong> {datosMujer.ciclosMenstruales} {datosMujer.ciclosMenstruales === 'Sí' ? `(Anticonceptivo: ${datosMujer.metodoAnticonceptivo})` : `(Histerectomía: ${datosMujer.histerectomia}, Menopausia edad: ${datosMujer.edadMenopausia})`}</p>

                           <hr/>
                           <p><strong>Peso:</strong> {datosMujer.peso} kg | <strong>Talla:</strong> {datosMujer.talla} cm | <strong>Cintura:</strong> {datosMujer.cintura} cm</p>
                           <p><strong>IMC:</strong> {imc.valor} ({imc.clasificacion})</p>
                           <p><strong>Tensión Arterial:</strong> {datosMujer.tensionSistolica} / {datosMujer.tensionDiastolica} mmHg</p>
                           <p><strong>Colesterol Total:</strong> {datosMujer.colesterol === 'No' ? 'No conoce' : datosMujer.colesterol}</p>

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