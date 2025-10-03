import React, { useState, useEffect } from 'react';
import { calcularRiesgoCardiovascular } from './Calculadora'; // Asegúrate de que este archivo exista
import { obtenerColorRiesgo, obtenerTextoRiesgo, Advertencia } from './ConstFormulario'; // Asegúrate de que este archivo exista

const FormularioSalud = () => {
    // --- ESTADOS ---
    const [formData, setFormData] = useState({
        // Datos Personales
        dni: '',
        edad: '',
        genero: '',
        // Hábitos y Antecedentes
        tomaMedicacionDiario: null,
        medicamentos: [],
        fumaDiario: null,
        actividadFisica: null,
        horasSueno: null,
        estresCronico: null,
        causasEstres: [],
        // Salud Ginecológica (si aplica)
        tumoresGinecologicos: null,
        tiposTumores: [],
        tuvoHijos: null,
        cantidadHijos: '',
        complicacionesEmbarazo: null,
        razonNoHijos: '',
        menopausia: null,
        metodoAnticonceptivo: '',
        histerectomia: null,
        edadHisterectomia: '',
        // Enfermedades Autoinmunes
        enfermedadesAutoinmunes: null,
        tiposAutoinmunes: [],
        // Mediciones
        peso: '',
        talla: '',
        cintura: '',
        tensionSistolica: '',
        tensionDiastolica: '',
        // Colesterol (para cálculo de riesgo)
        conoceColesterol: null,
        nivelColesterol: '',
    });

    const [imc, setImc] = useState(null);
    const [imcCategoria, setImcCategoria] = useState('');
    const [nivelRiesgo, setNivelRiesgo] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [error, setError] = useState('');

    // --- EFECTOS ---
    // Calcula el IMC automáticamente cuando cambian el peso o la talla
    useEffect(() => {
        const pesoNum = parseFloat(formData.peso);
        const tallaNum = parseFloat(formData.talla);

        if (pesoNum > 0 && tallaNum > 0) {
            const tallaMetros = tallaNum / 100;
            const imcCalculado = pesoNum / (tallaMetros * tallaMetros);
            setImc(imcCalculado.toFixed(2));

            // Clasificación del IMC
            if (imcCalculado < 18.5) setImcCategoria('Bajo Peso');
            else if (imcCalculado < 25) setImcCategoria('Normopeso');
            else if (imcCalculado < 30) setImcCategoria('Sobrepeso');
            else setImcCategoria('Obesidad');
        } else {
            setImc(null);
            setImcCategoria('');
        }
    }, [formData.peso, formData.talla]);


    // --- MANEJADORES DE CAMBIOS ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleButtonChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => {
            const list = prev[name] || [];
            if (checked) {
                return { ...prev, [name]: [...list, value] };
            } else {
                return { ...prev, [name]: list.filter(item => item !== value) };
            }
        });
    };

    // --- LÓGICA DE CÁLCULO Y VALIDACIÓN ---
    const validarCampos = () => {
        const camposRequeridos = [
            'dni', 'edad', 'genero', 'tomaMedicacionDiario', 'fumaDiario', 
            'actividadFisica', 'horasSueno', 'estresCronico', 'enfermedadesAutoinmunes',
            'peso', 'talla', 'tensionSistolica', 'conoceColesterol'
        ];

        for (const campo of camposRequeridos) {
            if (formData[campo] === null || formData[campo] === '') {
                setError(`El campo "${campo}" es obligatorio.`);
                return false;
            }
        }
        
        if (formData.genero === 'femenino') {
            const camposFemeninos = ['tumoresGinecologicos', 'tuvoHijos', 'menopausia', 'histerectomia'];
            for (const campo of camposFemeninos) {
                if (formData[campo] === null) {
                    setError(`El campo "${campo}" es obligatorio.`);
                    return false;
                }
            }
        }

        if (formData.conoceColesterol === 'si' && !formData.nivelColesterol) {
             setError('Debe ingresar su nivel de colesterol.');
             return false;
        }

        setError('');
        return true;
    };

    const calcularRiesgo = () => {
        if (!validarCampos()) {
            return;
        }

        // Mapeo de datos del formulario a los requeridos por la calculadora
        const datosParaCalculo = {
            edad: parseInt(formData.edad, 10),
            genero: formData.genero,
            diabetes: formData.medicamentos.includes('Diabetes') ? 'Sí' : 'No',
            fumador: formData.fumaDiario,
            presionArterial: parseInt(formData.tensionSistolica, 10),
            colesterol: formData.conoceColesterol === 'si' ? parseInt(formData.nivelColesterol, 10) : 'No',
        };

        const riesgo = calcularRiesgoCardiovascular(
            datosParaCalculo.edad,
            datosParaCalculo.genero,
            datosParaCalculo.diabetes,
            datosParaCalculo.fumador,
            datosParaCalculo.presionArterial,
            datosParaCalculo.colesterol
        );

        setNivelRiesgo(riesgo);
        setMostrarModal(true);
    };
    
    // --- RENDERIZADO DEL MODAL ---
    const renderRiesgoGrid = (riesgo) => {
        const riesgos = ['<10% Bajo', '>10% <20% Moderado', '>20% <30% Alto', '>30% <40% Muy Alto', '>40% Crítico'];
        return (
            <div className="grid grid-cols-12 gap-2">
                {riesgos.map((nivel) => (
                    <React.Fragment key={nivel}>
                        <div className={`col-span-4 ${obtenerColorRiesgo(nivel)}`}></div>
                        <div className={`col-span-8 p-2 ${riesgo === nivel ? obtenerColorRiesgo(nivel) : 'bg-gray-300'}`}>
                            <span className={`${riesgo === nivel ? 'text-white' : 'text-gray-600'}`}>{obtenerTextoRiesgo(nivel)}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // --- COMPONENTE JSX ---
    return (
        <div className="flex flex-col items-center p-6 max-w-2xl mx-auto bg-gray-50">
            <form className="w-full space-y-8" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-3xl font-bold text-center text-gray-800">Formulario de Salud Integral</h1>
                
                {/* --- SECCIÓN: DATOS PERSONALES --- */}
                <fieldset className="p-4 border rounded-md space-y-4">
                    <legend className="px-2 font-semibold text-lg text-gray-700">Datos Personales</legend>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700">DNI:</label>
                        <input type="number" name="dni" value={formData.dni} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700">Edad:</label>
                        <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Género:</label>
                        <div className="flex space-x-2 mt-1">
                            {['masculino', 'femenino'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('genero', option)} className={`p-2 border rounded-md w-full ${formData.genero === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </fieldset>

                {/* --- SECCIÓN: HÁBITOS Y ANTECEDENTES --- */}
                <fieldset className="p-4 border rounded-md space-y-6">
                    <legend className="px-2 font-semibold text-lg text-gray-700">Hábitos y Antecedentes</legend>

                    {/* Medicación */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">¿Toma medicación a diario?</label>
                        <div className="flex space-x-2 mt-1">
                            {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('tomaMedicacionDiario', option)} className={`p-2 border rounded-md w-full ${formData.tomaMedicacionDiario === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                        {formData.tomaMedicacionDiario === 'si' && (
                            <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2">
                                <h4 className="font-semibold text-gray-800">Seleccione cuál(es):</h4>
                                {['Diabetes', 'Hipertensión', 'Colesterol', 'Tiroides', 'Otras'].map(med => (
                                    <div key={med} className="flex items-center">
                                        <input type="checkbox" id={`med-${med}`} name="medicamentos" value={med} onChange={handleCheckboxChange} className="h-4 w-4 rounded"/>
                                        <label htmlFor={`med-${med}`} className="ml-2 text-sm text-gray-700">{med}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Fuma */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-700">¿Fuma a diario?</label>
                        <div className="flex space-x-2 mt-1">
                             {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('fumaDiario', option)} className={`p-2 border rounded-md w-full ${formData.fumaDiario === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                     {/* Colesterol */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-700">¿Conoce su nivel de colesterol?</label>
                        <div className="flex space-x-2 mt-1">
                            {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('conoceColesterol', option)} className={`p-2 border rounded-md w-full ${formData.conoceColesterol === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                        {formData.conoceColesterol === 'si' && (
                            <div className="mt-2">
                                <label className="text-sm font-medium text-gray-700">Nivel de colesterol total (mg/dL):</label>
                                <input type="number" name="nivelColesterol" value={formData.nivelColesterol} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                            </div>
                        )}
                    </div>

                    {/* Actividad Física */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-700">¿Realiza actividad física 150 minutos semanales?</label>
                        <div className="flex space-x-2 mt-1">
                            {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('actividadFisica', option)} className={`p-2 border rounded-md w-full ${formData.actividadFisica === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Horas de sueño */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-700">¿Duerme más de 7 horas diarias?</label>
                        <div className="flex space-x-2 mt-1">
                           {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('horasSueno', option)} className={`p-2 border rounded-md w-full ${formData.horasSueno === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Estrés crónico */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-700">¿Sufre de estrés crónico?</label>
                        <div className="flex space-x-2 mt-1">
                           {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('estresCronico', option)} className={`p-2 border rounded-md w-full ${formData.estresCronico === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                        {formData.estresCronico === 'si' && (
                            <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2">
                                <h4 className="font-semibold text-gray-800">Seleccione la causa (opcional):</h4>
                                {['Depresión', 'Otras'].map(causa => (
                                    <div key={causa} className="flex items-center">
                                        <input type="checkbox" id={`causa-${causa}`} name="causasEstres" value={causa} onChange={handleCheckboxChange} className="h-4 w-4 rounded"/>
                                        <label htmlFor={`causa-${causa}`} className="ml-2 text-sm text-gray-700">{causa}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </fieldset>

                {/* --- SECCIÓN: SALUD GINECOLÓGICA (CONDICIONAL) --- */}
                {formData.genero === 'femenino' && (
                    <fieldset className="p-4 border rounded-md space-y-6">
                        <legend className="px-2 font-semibold text-lg text-gray-700">Salud Femenina</legend>
                        
                        {/* Tumores */}
                        <div>
                           <label className="text-sm font-medium text-gray-700">¿Ha tenido tumores ginecológicos?</label>
                            <div className="flex space-x-2 mt-1">
                                {['si', 'no'].map(option => (
                                    <button key={option} type="button" onClick={() => handleButtonChange('tumoresGinecologicos', option)} className={`p-2 border rounded-md w-full ${formData.tumoresGinecologicos === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {formData.tumoresGinecologicos === 'si' && (
                                <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2">
                                    <h4 className="font-semibold text-gray-800">Seleccione cuál(es):</h4>
                                    {['Ovarios', 'Mama', 'Útero'].map(tumor => (
                                        <div key={tumor} className="flex items-center">
                                            <input type="checkbox" id={`tumor-${tumor}`} name="tiposTumores" value={tumor} onChange={handleCheckboxChange} className="h-4 w-4 rounded"/>
                                            <label htmlFor={`tumor-${tumor}`} className="ml-2 text-sm text-gray-700">{tumor}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Hijos */}
                        <div className="pt-4 border-t">
                            <label className="text-sm font-medium text-gray-700">¿Tuvo hijos?</label>
                            <div className="flex space-x-2 mt-1">
                                {['si', 'no'].map(option => (
                                    <button key={option} type="button" onClick={() => handleButtonChange('tuvoHijos', option)} className={`p-2 border rounded-md w-full ${formData.tuvoHijos === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {formData.tuvoHijos === 'si' && (
                                <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">¿Cuántos?</label>
                                        <input type="number" name="cantidadHijos" value={formData.cantidadHijos} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">¿Tuvo hipertensión o diabetes gestacional?</label>
                                        <div className="flex space-x-2 mt-1">
                                            {['si', 'no'].map(option => (
                                                <button key={option} type="button" onClick={() => handleButtonChange('complicacionesEmbarazo', option)} className={`p-2 border rounded-md w-full ${formData.complicacionesEmbarazo === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {formData.tuvoHijos === 'no' && (
                                <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2">
                                     <label className="text-sm font-medium text-gray-700">Motivo (opcional):</label>
                                     <select name="razonNoHijos" value={formData.razonNoHijos} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                                        <option value="">Seleccione una opción</option>
                                        <option value="No quiso">No quiso</option>
                                        <option value="No pudo">No pudo</option>
                                        <option value="Tuvo pérdidas">Tuvo pérdidas</option>
                                        <option value="No se dio">No se dio</option>
                                     </select>
                                </div>
                            )}
                        </div>

                        {/* Menopausia y Anticonceptivos */}
                        <div className="pt-4 border-t">
                             <label className="text-sm font-medium text-gray-700">¿Presenta menopausia?</label>
                            <div className="flex space-x-2 mt-1">
                                {['si', 'no'].map(option => (
                                    <button key={option} type="button" onClick={() => handleButtonChange('menopausia', option)} className={`p-2 border rounded-md w-full ${formData.menopausia === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {formData.menopausia === 'no' && (
                                <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50">
                                    <label className="text-sm font-medium text-gray-700">Método anticonceptivo que utiliza:</label>
                                    <input type="text" name="metodoAnticonceptivo" value={formData.metodoAnticonceptivo} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                                </div>
                            )}
                        </div>
                        
                         {/* Histerectomía */}
                        <div className="pt-4 border-t">
                             <label className="text-sm font-medium text-gray-700">¿Presenta histerectomía (extracción de útero)?</label>
                            <div className="flex space-x-2 mt-1">
                                {['si', 'no'].map(option => (
                                    <button key={option} type="button" onClick={() => handleButtonChange('histerectomia', option)} className={`p-2 border rounded-md w-full ${formData.histerectomia === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {formData.histerectomia === 'si' && (
                                <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50">
                                    <label className="text-sm font-medium text-gray-700">¿A qué edad?</label>
                                    <input type="number" name="edadHisterectomia" value={formData.edadHisterectomia} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                                </div>
                            )}
                        </div>
                    </fieldset>
                )}

                {/* --- SECCIÓN: OTRAS ENFERMEDADES --- */}
                <fieldset className="p-4 border rounded-md space-y-4">
                    <legend className="px-2 font-semibold text-lg text-gray-700">Otras Enfermedades</legend>
                     <div>
                        <label className="text-sm font-medium text-gray-700">¿Tiene enfermedades autoinmunes?</label>
                        <div className="flex space-x-2 mt-1">
                             {['si', 'no'].map(option => (
                                <button key={option} type="button" onClick={() => handleButtonChange('enfermedadesAutoinmunes', option)} className={`p-2 border rounded-md w-full ${formData.enfermedadesAutoinmunes === option ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                        {formData.enfermedadesAutoinmunes === 'si' && (
                            <div className="p-3 mt-2 border-l-4 border-indigo-500 bg-indigo-50 space-y-2">
                                <h4 className="font-semibold text-gray-800">Seleccione cuál(es):</h4>
                                {['Lupus', 'Artritis', 'Otras'].map(enf => (
                                    <div key={enf} className="flex items-center">
                                        <input type="checkbox" id={`enf-${enf}`} name="tiposAutoinmunes" value={enf} onChange={handleCheckboxChange} className="h-4 w-4 rounded"/>
                                        <label htmlFor={`enf-${enf}`} className="ml-2 text-sm text-gray-700">{enf}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </fieldset>
                
                {/* --- SECCIÓN: MEDICIONES --- */}
                <fieldset className="p-4 border rounded-md space-y-4">
                    <legend className="px-2 font-semibold text-lg text-gray-700">Mediciones Corporales</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Peso (kg):</label>
                            <input type="number" name="peso" value={formData.peso} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Talla (cm):</label>
                            <input type="number" name="talla" value={formData.talla} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Tensión Sistólica (Máx):</label>
                            <input type="number" name="tensionSistolica" value={formData.tensionSistolica} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Tensión Diastólica (Mín):</label>
                            <input type="number" name="tensionDiastolica" value={formData.tensionDiastolica} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                         <div className="col-span-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Cintura (cm):</label>
                            <input type="number" name="cintura" value={formData.cintura} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    {imc && (
                        <div className="p-3 mt-4 text-center bg-gray-100 rounded-md">
                            <h3 className="text-lg font-bold text-gray-800">IMC: {imc}</h3>
                            <p className="font-semibold" style={{ color: imcCategoria === 'Normopeso' ? 'green' : 'orange' }}>
                                {imcCategoria}
                            </p>
                        </div>
                    )}
                </fieldset>

                {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
                
                <button type="button" onClick={calcularRiesgo} className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
                    Calcular Riesgo Cardiovascular
                </button>
            </form>

            {/* --- MODAL DE RESULTADOS --- */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Resumen del Paciente</h2>
                        
                        <div className="space-y-2 text-gray-700">
                            <p><strong>DNI:</strong> {formData.dni}</p>
                            <p><strong>Edad:</strong> {formData.edad}</p>
                            <p><strong>Género:</strong> {formData.genero}</p>
                             <p><strong>Toma Medicación:</strong> {formData.tomaMedicacionDiario}</p>
                            {formData.tomaMedicacionDiario === 'si' && <p><strong>Medicamentos:</strong> {formData.medicamentos.join(', ')}</p>}
                            <p><strong>Fuma:</strong> {formData.fumaDiario}</p>
                            <p><strong>Actividad Física (+150 min):</strong> {formData.actividadFisica}</p>
                            <p><strong>Sueño (+7hs):</strong> {formData.horasSueno}</p>
                            <p><strong>Estrés Crónico:</strong> {formData.estresCronico}</p>
                             {formData.estresCronico === 'si' && <p><strong>Causas Estrés:</strong> {formData.causasEstres.join(', ')}</p>}

                            {formData.genero === 'femenino' && (
                                <div className="mt-3 pt-3 border-t">
                                    <h3 className="font-semibold text-lg mb-2">Salud Femenina:</h3>
                                    <p><strong>Tumores Ginecológicos:</strong> {formData.tumoresGinecologicos}</p>
                                    {formData.tumoresGinecologicos === 'si' && <p><strong>Tipos:</strong> {formData.tiposTumores.join(', ')}</p>}
                                    <p><strong>Tuvo Hijos:</strong> {formData.tuvoHijos}</p>
                                    {formData.tuvoHijos === 'si' && <p><strong>Cantidad:</strong> {formData.cantidadHijos}</p>}
                                     {formData.tuvoHijos === 'no' && <p><strong>Razón:</strong> {formData.razonNoHijos}</p>}
                                    <p><strong>Menopausia:</strong> {formData.menopausia}</p>
                                    {formData.menopausia === 'no' && <p><strong>Anticonceptivo:</strong> {formData.metodoAnticonceptivo}</p>}
                                </div>
                            )}
                        </div>

                        <div className="mt-3 pt-3 border-t">
                             <h3 className="font-semibold text-lg mb-2">Mediciones:</h3>
                             <p><strong>Peso:</strong> {formData.peso} kg</p>
                             <p><strong>Talla:</strong> {formData.talla} cm</p>
                             <p><strong>Cintura:</strong> {formData.cintura} cm</p>
                             <p><strong>Tensión Arterial:</strong> {formData.tensionSistolica} / {formData.tensionDiastolica} mmHg</p>
                             <p><strong>IMC:</strong> {imc} ({imcCategoria})</p>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <p className="font-bold text-lg mb-2">Nivel de Riesgo Cardiovascular:</p>
                            {renderRiesgoGrid(nivelRiesgo)}
                        </div>

                        <button onClick={() => setMostrarModal(false)} className="mt-6 w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioSalud;