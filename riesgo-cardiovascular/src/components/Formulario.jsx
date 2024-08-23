import React, { useState } from 'react';
import { calcularRiesgoCardiovascular } from './Calculadora';
import axiosInstance from '../axiosConfig';

const Formulario = () => {
    const [datosPaciente, setDatosPaciente] = useState({
        edad: '',
        genero: '',
        diabetes: '',
        fumador: '',
        presionArterial: '',
        colesterol: '',
        ubicacion: ''
    });

    const [nivelRiesgo, setNivelRiesgo] = useState(null);
    const [nivelColesterolConocido, setNivelColesterolConocido] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalAdvertencia, setModalAdvertencia] = useState(null);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosPaciente(prevDatos => ({
            ...prevDatos,
            [name]: value,
        }));
    };

    const manejarSeleccionColesterol = (value) => {
        setNivelColesterolConocido(value === 'si');
        setDatosPaciente(prevDatos => ({
            ...prevDatos,
            colesterol: value === 'no' ? 'No' : prevDatos.colesterol
        }));
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

    const validarCampos = () => {
        const { edad, genero, diabetes, fumador, presionArterial, ubicacion } = datosPaciente;
        return edad && genero && diabetes && fumador && presionArterial && ubicacion;
    };

    const calcularRiesgo = async () => {
        if (!validarCampos()) {
            setModalAdvertencia('Todos los campos deben estar completos.');
            setMostrarModal(true);
            return;
        }

        if (nivelColesterolConocido && !datosPaciente.colesterol) {
            setModalAdvertencia('Debe ingresar el nivel de colesterol.');
            setMostrarModal(true);
            return;
        }

        const { edad, genero, diabetes, fumador, presionArterial, colesterol, ubicacion } = datosPaciente;

        const edadAjustada = ajustarEdad(parseInt(edad, 10));
        const presionAjustada = ajustarPresionArterial(parseInt(presionArterial, 10));

        const nivelRiesgo = calcularRiesgoCardiovascular(edadAjustada, genero, diabetes, fumador, presionAjustada, colesterol);
        setNivelRiesgo(nivelRiesgo);
        setMostrarModal(true);

        try {
            await axiosInstance.post('/api/pacientes', {
                edad: edadAjustada,
                genero,
                diabetes,
                fumador,
                presionArterial: presionAjustada,
                colesterol,
                ubicacion,
                nivelRiesgo
            });
            console.log('Datos guardados exitosamente');
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            setModalAdvertencia('Ocurrió un error al guardar los datos. Por favor, inténtelo de nuevo.');
            setMostrarModal(true);
        }
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setModalAdvertencia(null);
    };

    const abrirModalAdvertencia = (nivel) => {
        const advertencias = {
            '<10% Poco': `- Bajo riesgo no significa ningún riesgo, se sugiere intervenciones como estilo de vida más saludable.
- Vigilar el perfil de riesgo cada 12 meses.
- Esto incluye básicamente control de presión arterial, colesterol y glucemia.
- Reducción de hábitos tóxicos.
- Mayor actividad física y alimentación saludable.`,
            '>10% <20% Moderado': `- Significa que hay un riesgo moderado de sufrir un episodio vascular en los próximos 10 años.
- Vigilar el perfil de riesgo cada 6 a 12 meses.
- Esto incluye básicamente control de presión arterial, colesterol y glucemia.
- Control de peso y cintura.
- Reducción de hábitos tóxicos.
- Mayor actividad física y alimentación saludable.
- Cumplimiento en la medicación indicada.`,
            '>20% <30% Alto': `- Significa que hay un alto riesgo de sufrir un episodio vascular en los próximos 10 años.
- Vigilar el perfil de riesgo cada 3 a 6 meses.
- Esto incluye básicamente control de presión arterial, colesterol y glucemia.
- Control de peso y cintura.
- Reducción de hábitos tóxicos.
- Mayor actividad física y alimentación saludable.
- Cumplimiento en la medicación indicada.`,
            '>30% <40% Muy Alto': `- Significa que hay un alto riesgo de sufrir un episodio vascular en los próximos 10 años.
- Vigilar el perfil de riesgo cada 3 a 6 meses.
- Esto incluye básicamente control de presión arterial, colesterol y glucemia.
- Control de peso y cintura.
- Reducción de hábitos tóxicos.
- Mayor actividad física y alimentación saludable.
- Cumplimiento en la medicación indicada.`,
            '>40% Crítico': `- Significa que hay un alto riesgo de sufrir un episodio vascular en los próximos 10 años.
- Vigilar el perfil de riesgo cada 3 a 6 meses.
- Esto incluye básicamente control de presión arterial, colesterol y glucemia.
- Control de peso y cintura.
- Reducción de hábitos tóxicos.
- Mayor actividad física y alimentación saludable.
- Cumplimiento en la medicación indicada.`
        };
        setModalAdvertencia(advertencias[nivel]);
    };

    const obtenerColorRiesgo = (riesgo) => {
        switch (riesgo) {
            case '<10% Poco': return 'bg-green-500';
            case '>10% <20% Moderado': return 'bg-yellow-500';
            case '>20% <30% Alto': return 'bg-orange-500';
            case '>30% <40% Muy Alto': return 'bg-red-500';
            case '>40% Crítico': return 'bg-red-800';
            default: return 'bg-gray-200';
        }
    };

    const obtenerTextoRiesgo = (riesgo) => {
        switch (riesgo) {
            case '<10% Poco': return '<10% Poco';
            case '>10% <20% Moderado': return '>10% <20% Moderado';
            case '>20% <30% Alto': return '>20% <30% Alto';
            case '>30% <40% Muy Alto': return '>30% <40% Muy Alto';
            case '>40% Crítico': return '>40% Crítico';
            default: return 'Desconocido';
        }
    };

    const renderRiesgoGrid = (riesgo) => {
        const riesgos = [
            '<10% Poco',
            '>10% <20% Moderado',
            '>20% <30% Alto',
            '>30% <40% Muy Alto',
            '>40% Crítico'
        ];
        return (
            <div className="grid grid-cols-12 gap-2">
                {riesgos.map((nivel, index) => (
                    <React.Fragment key={nivel}>
                        <div className={`col-span-4 ${obtenerColorRiesgo(nivel)}`}></div>
                        <div
                            className={`col-span-8 ${riesgo === nivel ? obtenerColorRiesgo(nivel) : 'bg-gray-300'} p-2 cursor-pointer`}
                            onClick={() => abrirModalAdvertencia(nivel)}
                        >
                            <span className={`${riesgo === nivel ? 'text-white' : 'text-gray-600'}`}>{obtenerTextoRiesgo(nivel)}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Formulario de Evaluación de Riesgo Cardiovascular</h1>
            <form className="w-full space-y-6">
                {/* Ubicación */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Ubicación:</label>
                    <select
                        name="ubicacion"
                        value={datosPaciente.ubicacion}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Seleccione una ubicación</option>
                        {['DEM NORTE', 'DEM CENTRO', 'DEM OESTE', 'DAPS', 'HPA', 'HU.'].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Edad */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Edad:</label>
                    <input
                        type="number"
                        name="edad"
                        value={datosPaciente.edad}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Género */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Género:</label>
                    <div className="flex space-x-2">
                        {['masculino', 'femenino'].map(option => (
                            <button
                                key={option}
                                type="button"
                                className={`p-2 border rounded ${datosPaciente.genero === option ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}
                                onClick={() => setDatosPaciente(prevDatos => ({ ...prevDatos, genero: option }))}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diabetes */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Diabetes:</label>
                    <div className="flex space-x-2">
                        {['Sí', 'No'].map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDatosPaciente(prevDatos => ({ ...prevDatos, diabetes: option }))}
                                className={`p-2 border rounded-md ${datosPaciente.diabetes === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fumador */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">¿Es fumador?</label>
                    <div className="flex space-x-2 mb-2">
                        {['sí', 'no'].map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDatosPaciente(prevDatos => ({ ...prevDatos, fumador: option }))}
                                className={`p-2 border rounded-md ${datosPaciente.fumador === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Presión Arterial */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Presión Arterial:</label>
                    <input
                        type="number"
                        name="presionArterial"
                        value={datosPaciente.presionArterial}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ appearance: 'none' }}
                    />
                </div>

                {/* Colesterol */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">¿Conoce su nivel de colesterol?</label>
                    <div className="flex space-x-2 mb-2">
                        {['si', 'no'].map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => manejarSeleccionColesterol(option)}
                                className={`p-2 border rounded-md ${nivelColesterolConocido === (option === 'si') ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                    {nivelColesterolConocido && (
                        <input
                            type="number"
                            name="colesterol"
                            value={datosPaciente.colesterol === 'No' ? '' : datosPaciente.colesterol}
                            onChange={manejarCambio}
                            className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            style={{ appearance: 'none' }}
                        />
                    )}
                </div>

                <button
                    type="button"
                    onClick={calcularRiesgo}
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    Calcular Riesgo
                </button>
            </form>

            {/* Modal Resultados */}
            {mostrarModal && !modalAdvertencia && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Resultados</h2>
                        <p><strong>Edad:</strong> {datosPaciente.edad}</p>
                        <p><strong>Género:</strong> {datosPaciente.genero}</p>
                        <p><strong>Diabetes:</strong> {datosPaciente.diabetes}</p>
                        <p><strong>Fumador:</strong> {datosPaciente.fumador}</p>
                        <p><strong>Presión Arterial:</strong> {datosPaciente.presionArterial}</p>
                        <p><strong>Colesterol:</strong> {datosPaciente.colesterol || 'No especificado'}</p>
                        <p><strong>Ubicación:</strong> {datosPaciente.ubicacion}</p>
                        <p><strong>Nivel de Riesgo:</strong></p>
                        <div className="mb-4">
                            {renderRiesgoGrid(nivelRiesgo)}
                        </div>
                        <button
                            onClick={cerrarModal}
                            className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Advertencia */}
            {modalAdvertencia && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Advertencias</h2>
                        <div className="overflow-y-auto max-h-80">
                            <pre className="whitespace-pre-wrap text-left">{modalAdvertencia}</pre>
                        </div>
                        <button
                            onClick={cerrarModal}
                            className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formulario;
