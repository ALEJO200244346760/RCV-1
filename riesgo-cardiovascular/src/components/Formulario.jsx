import React, { useState } from 'react';
import { calcularRiesgoCardiovascular } from './Calculadora'; // Asegúrate de importar la función

const Formulario = () => {
    const [datosPaciente, setDatosPaciente] = useState({
        edad: '',
        genero: '',
        diabetes: '',
        fuma: '',
        presion: '',
        colesterol: '',
    });

    const [nivelRiesgo, setNivelRiesgo] = useState(null);
    const [nivelColesterolConocido, setNivelColesterolConocido] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosPaciente({
            ...datosPaciente,
            [name]: value,
        });
    };

    const manejarSeleccionColesterol = (value) => {
        setNivelColesterolConocido(value === 'si');
        if (value === 'no') {
            setDatosPaciente({
                ...datosPaciente,
                colesterol: ''
            });
        }
    };

    const calcularRiesgo = () => {
        const { edad, genero, diabetes, fuma, presion, colesterol } = datosPaciente;
        const riesgo = calcularRiesgoCardiovascular(parseInt(edad), genero, diabetes, fuma, parseInt(presion), colesterol);
        setNivelRiesgo(riesgo);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    const obtenerColorRiesgo = (riesgo) => {
        switch (riesgo) {
            case 'poco': return 'bg-green-500';
            case 'moderado': return 'bg-yellow-500';
            case 'alto': return 'bg-orange-500';
            case 'muy alto': return 'bg-red-500';
            case 'critico': return 'bg-red-800';
            default: return 'bg-gray-200';
        }
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Formulario de Evaluación de Riesgo Cardiovascular</h1>
            <form className="w-full space-y-6">
                {/* Edad */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Edad:</label>
                    <input
                        type="number"
                        name="edad"
                        value={datosPaciente.edad}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ appearance: 'none' }} // Elimina las flechas
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
                                onClick={() => setDatosPaciente({ ...datosPaciente, genero: option })}
                                className={`p-2 border rounded-md ${datosPaciente.genero === option ? `bg-${option === 'masculino' ? 'blue' : 'pink'}-500 text-white` : 'border-gray-300'}`}
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
                        {['si', 'no'].map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDatosPaciente({ ...datosPaciente, diabetes: option })}
                                className={`p-2 border rounded-md ${datosPaciente.diabetes === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fuma */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Fuma:</label>
                    <div className="flex space-x-2">
                        {['si', 'no'].map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDatosPaciente({ ...datosPaciente, fuma: option })}
                                className={`p-2 border rounded-md ${datosPaciente.fuma === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Presión */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Presión:</label>
                    <input
                        type="number"
                        name="presion"
                        value={datosPaciente.presion}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ appearance: 'none' }} // Elimina las flechas
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
                            value={datosPaciente.colesterol || ''}
                            onChange={manejarCambio}
                            className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            style={{ appearance: 'none' }} // Elimina las flechas
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

            {/* Modal */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Resultados</h2>
                        <p><strong>Edad:</strong> {datosPaciente.edad}</p>
                        <p><strong>Género:</strong> {datosPaciente.genero}</p>
                        <p><strong>Diabetes:</strong> {datosPaciente.diabetes}</p>
                        <p><strong>Fuma:</strong> {datosPaciente.fuma}</p>
                        <p><strong>Presión:</strong> {datosPaciente.presion}</p>
                        <p><strong>Colesterol:</strong> {datosPaciente.colesterol || 'No especificado'}</p>
                        <div className={`mt-4 p-2 text-white rounded-md ${obtenerColorRiesgo(nivelRiesgo)}`}>
                            <strong>Nivel de Riesgo:</strong> {nivelRiesgo}
                        </div>
                        <button
                            onClick={cerrarModal}
                            className="mt-4 py-2 px-4 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600"
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
