import React, { useState, useEffect } from 'react';

const NuevoFormulario = () => {
    // Estado principal para todos los datos del formulario
    const [datos, setDatos] = useState({
        dni: '',
        edad: '',
        tomaMedicacionDiario: null, // 'si' o 'no'
        medicacionTipo: {
            diabetes: false,
            hipertension: false,
            colesterol: false,
            tiroides: false,
            otras: false,
        },
        fumaDiario: null,
        actividadFisica: null,
        horasSueno: null,
        estresCronico: null,
        estresTipo: {
            depresion: false,
            otras: false,
        },
        tumoresGinecologicos: null,
        tumorTipo: {
            ovarios: false,
            mama: false,
            utero: false,
        },
        enfermedadesAutoinmunes: null,
        autoinmuneTipo: {
            lupus: false,
            artritis: false,
            otras: false,
        },
        tuvoHijos: null,
        cantidadHijos: '',
        complicacionesEmbarazo: null,
        razonNoHijos: '', // 'noQuiso', 'noPudo', 'tuvoPerdidas', 'noSeDio'
        menopausia: null,
        edadMenopausia: '',
        presentaCiclosMenstruales: null,
        metodoAnticonceptivo: '',
        presentaHisterectomia: null,
        peso: '',
        talla: '',
        taSistolica: '',
        taDiastolica: '',
        cintura: '',
    });

    // Estados para valores calculados
    const [imc, setImc] = useState('');
    const [categoriaImc, setCategoriaImc] = useState('');

    // --- MANEJADORES DE CAMBIOS ---

    // Manejador para inputs de texto y numéricos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para botones de opción (Sí/No)
    const handleOptionChange = (name, value) => {
        setDatos(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para checkboxes
    const handleCheckboxChange = (category, name) => {
        setDatos(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: !prev[category][name],
            },
        }));
    };

    // --- CÁLCULO AUTOMÁTICO DE IMC ---
    useEffect(() => {
        const pesoNum = parseFloat(datos.peso);
        const tallaNum = parseFloat(datos.talla);

        if (pesoNum > 0 && tallaNum > 0) {
            const tallaMetros = tallaNum / 100;
            const imcCalculado = pesoNum / (tallaMetros * tallaMetros);
            setImc(imcCalculado.toFixed(2));

            if (imcCalculado < 18.5) {
                setCategoriaImc('Bajo Peso');
            } else if (imcCalculado >= 18.5 && imcCalculado < 25) {
                setCategoriaImc('Normopeso');
            } else if (imcCalculado >= 25 && imcCalculado < 30) {
                setCategoriaImc('Sobrepeso');
            } else {
                setCategoriaImc('Obesidad');
            }
        } else {
            setImc('');
            setCategoriaImc('');
        }
    }, [datos.peso, datos.talla]);


    // Componente reutilizable para preguntas Sí/No
    const PreguntaOpcion = ({ label, name, value }) => (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex space-x-2 mt-1">
                <button
                    type="button"
                    onClick={() => handleOptionChange(name, 'si')}
                    className={`p-2 border rounded-md w-1/2 ${value === 'si' ? 'bg-indigo-600 text-white' : 'border-gray-300'}`}
                >
                    Sí
                </button>
                <button
                    type="button"
                    onClick={() => handleOptionChange(name, 'no')}
                    className={`p-2 border rounded-md w-1/2 ${value === 'no' ? 'bg-indigo-600 text-white' : 'border-gray-300'}`}
                >
                    No
                </button>
            </div>
        </div>
    );

    // Componente reutilizable para checkboxes
    const OpcionCheckbox = ({ category, name, label, checked }) => (
         <div className="flex items-center my-1">
            <input
                type="checkbox"
                id={`${category}-${name}`}
                checked={checked}
                onChange={() => handleCheckboxChange(category, name)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={`${category}-${name}`} className="ml-3 text-sm text-gray-700">
                {label}
            </label>
        </div>
    );

    return (
        <div className="flex flex-col items-center p-6 max-w-2xl mx-auto bg-gray-50">
            <form className="w-full space-y-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Formulario de Salud Integral</h1>

                {/* --- SECCIÓN DATOS BÁSICOS --- */}
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Datos Básicos</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">DNI:</label>
                            <input type="number" name="dni" value={datos.dni} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Edad:</label>
                            <input type="number" name="edad" value={datos.edad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN HÁBITOS Y ESTILO DE VIDA --- */}
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Hábitos y Estilo de Vida</h2>
                    <div className="space-y-4">
                        <PreguntaOpcion label="¿Toma medicación a diario?" name="tomaMedicacionDiario" value={datos.tomaMedicacionDiario} />
                        {datos.tomaMedicacionDiario === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                <h4 className="text-md font-semibold text-gray-800">Seleccione el tipo de medicación:</h4>
                                <OpcionCheckbox category="medicacionTipo" name="diabetes" label="Diabetes" checked={datos.medicacionTipo.diabetes} />
                                <OpcionCheckbox category="medicacionTipo" name="hipertension" label="Hipertensión" checked={datos.medicacionTipo.hipertension} />
                                <OpcionCheckbox category="medicacionTipo" name="colesterol" label="Colesterol" checked={datos.medicacionTipo.colesterol} />
                                <OpcionCheckbox category="medicacionTipo" name="tiroides" label="Tiroides" checked={datos.medicacionTipo.tiroides} />
                                <OpcionCheckbox category="medicacionTipo" name="otras" label="Otras" checked={datos.medicacionTipo.otras} />
                            </div>
                        )}

                        <PreguntaOpcion label="¿Fuma a diario?" name="fumaDiario" value={datos.fumaDiario} />
                        <PreguntaOpcion label="¿Realiza actividad física 150 minutos semanales?" name="actividadFisica" value={datos.actividadFisica} />
                        <PreguntaOpcion label="¿Duerme más de 7 horas diarias?" name="horasSueno" value={datos.horasSueno} />
                        
                        <PreguntaOpcion label="¿Sufre de estrés crónico?" name="estresCronico" value={datos.estresCronico} />
                        {datos.estresCronico === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                 <h4 className="text-md font-semibold text-gray-800">Seleccione:</h4>
                                <OpcionCheckbox category="estresTipo" name="depresion" label="Depresión" checked={datos.estresTipo.depresion} />
                                <OpcionCheckbox category="estresTipo" name="otras" label="Otras" checked={datos.estresTipo.otras} />
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECCIÓN ANTECEDENTES DE SALUD --- */}
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Antecedentes de Salud</h2>
                    <div className="space-y-4">
                        <PreguntaOpcion label="¿Ha tenido tumores ginecológicos?" name="tumoresGinecologicos" value={datos.tumoresGinecologicos} />
                         {datos.tumoresGinecologicos === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                <h4 className="text-md font-semibold text-gray-800">Seleccione el tipo:</h4>
                                <OpcionCheckbox category="tumorTipo" name="ovarios" label="Ovarios" checked={datos.tumorTipo.ovarios} />
                                <OpcionCheckbox category="tumorTipo" name="mama" label="Mama" checked={datos.tumorTipo.mama} />
                                <OpcionCheckbox category="tumorTipo" name="utero" label="Útero" checked={datos.tumorTipo.utero} />
                            </div>
                        )}

                        <PreguntaOpcion label="¿Tiene enfermedades autoinmunes?" name="enfermedadesAutoinmunes" value={datos.enfermedadesAutoinmunes} />
                        {datos.enfermedadesAutoinmunes === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                <h4 className="text-md font-semibold text-gray-800">Seleccione la enfermedad:</h4>
                                <OpcionCheckbox category="autoinmuneTipo" name="lupus" label="Lupus" checked={datos.autoinmuneTipo.lupus} />
                                <OpcionCheckbox category="autoinmuneTipo" name="artritis" label="Artritis" checked={datos.autoinmuneTipo.artritis} />
                                <OpcionCheckbox category="autoinmuneTipo" name="otras" label="Otras" checked={datos.autoinmuneTipo.otras} />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* --- SECCIÓN SALUD GINECOLÓGICA Y REPRODUCTIVA --- */}
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Salud Ginecológica y Reproductiva</h2>
                    <div className="space-y-4">
                        <PreguntaOpcion label="¿Tuvo hijos?" name="tuvoHijos" value={datos.tuvoHijos} />
                        {datos.tuvoHijos === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">¿Cuántos?</label>
                                    <input type="number" name="cantidadHijos" value={datos.cantidadHijos} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <PreguntaOpcion label="¿Tuvo hipertensión o diabetes gestacional en alguno?" name="complicacionesEmbarazo" value={datos.complicacionesEmbarazo} />
                            </div>
                        )}
                        {datos.tuvoHijos === 'no' && (
                             <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                <h4 className="text-md font-semibold text-gray-800">Motivo:</h4>
                                <div className="flex flex-col space-y-2 mt-2">
                                     {['No quiso', 'No pudo', 'Tuvo pérdidas', 'No se dio'].map(opcion => (
                                        <div key={opcion} className="flex items-center">
                                            <input type="radio" id={opcion} name="razonNoHijos" value={opcion} checked={datos.razonNoHijos === opcion} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                                            <label htmlFor={opcion} className="ml-3 block text-sm font-medium text-gray-700">{opcion}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <PreguntaOpcion label="¿Menopausia?" name="menopausia" value={datos.menopausia} />
                        {datos.menopausia === 'si' && (
                            <div className="p-4 mt-2 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">¿A qué edad?</label>
                                    <input type="number" name="edadMenopausia" value={datos.edadMenopausia} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <PreguntaOpcion label="¿Presenta ciclos menstruales todavía?" name="presentaCiclosMenstruales" value={datos.presentaCiclosMenstruales} />
                                {datos.presentaCiclosMenstruales === 'si' && (
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700">¿Qué método anticonceptivo utiliza?</label>
                                        <input type="text" name="metodoAnticonceptivo" value={datos.metodoAnticonceptivo} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                                    </div>
                                )}
                                {datos.presentaCiclosMenstruales === 'no' && (
                                    <PreguntaOpcion label="¿Presenta histerectomía?" name="presentaHisterectomia" value={datos.presentaHisterectomia} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECCIÓN MEDICIONES FÍSICAS --- */}
                 <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Mediciones Físicas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Peso (kg):</label>
                            <input type="number" name="peso" value={datos.peso} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Talla (cm):</label>
                            <input type="number" name="talla" value={datos.talla} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Tensión Sistólica (Máx.):</label>
                            <input type="number" name="taSistolica" value={datos.taSistolica} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Tensión Diastólica (Mín.):</label>
                            <input type="number" name="taDiastolica" value={datos.taDiastolica} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Cintura (cm):</label>
                            <input type="number" name="cintura" value={datos.cintura} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        
                        {/* IMC Calculado */}
                        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg">
                            <label className="text-sm font-medium text-gray-700">Índice de Masa Corporal (IMC):</label>
                            <p className="text-2xl font-bold mt-1 text-indigo-600">{imc || '...'}</p>
                            {categoriaImc && (
                                <p className={`mt-1 text-sm font-semibold px-2 py-1 rounded-full ${
                                    categoriaImc === 'Normopeso' ? 'bg-green-200 text-green-800' :
                                    categoriaImc === 'Sobrepeso' ? 'bg-yellow-200 text-yellow-800' :
                                    categoriaImc === 'Obesidad' ? 'bg-red-200 text-red-800' :
                                    'bg-blue-200 text-blue-800'
                                }`}>{categoriaImc}</p>
                            )}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default NuevoFormulario;