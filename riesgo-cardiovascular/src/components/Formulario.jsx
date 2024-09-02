import React, { useState } from 'react';
import { calcularRiesgoCardiovascular } from './Calculadora';
import { 
    manejarCambio, 
    manejarSeleccionColesterol, 
    calcularIMC, 
    ajustarEdad, 
    ajustarPresionArterial, 
    validarCampos, 
    calcularRiesgo, 
    guardarPaciente, 
    guardarMedicamentos, 
    cerrarModal, 
    abrirModalAdvertencia, 
    listaMedicamentos, 
    toggleModalMedicamentos, 
    handleMedicamentoChange, 
    obtenerColorRiesgo, 
    obtenerTextoRiesgo, 
    renderRiesgoGrid 
} from './ConstFormulario.jsx';
import axiosInstance from '../axiosConfig';


const Formulario = () => {
    const [datosPaciente, setDatosPaciente] = useState({
        edad: '',
        genero: '',
        diabetes: '',
        fumador: '',
        presionArterial: '',
        colesterol: '',
        peso: '',
        talla: '', // Talla en centímetros
        ubicacion: '',
        fechaRegistro: new Date().toISOString().split('T')[0],
        imc: '',
        hipertenso: '',
        infarto: '',
        acv:'',
        medicamentos:''
    });

    const [nivelRiesgo, setNivelRiesgo] = useState(null);
    const [nivelColesterolConocido, setNivelColesterolConocido] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalAdvertencia, setModalAdvertencia] = useState(null);
    const [mostrarModalMedicamentos, setMostrarModalMedicamentos] = useState(false);
    const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const handleSubmit = async () => {
        await calcularRiesgo(datosPaciente, nivelColesterolConocido, setModalAdvertencia, setMostrarModal, setDatosPaciente, setNivelRiesgo);
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
                                onClick={() => setDatosPaciente({ ...datosPaciente, diabetes: option })}
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
                                onClick={() => setDatosPaciente({ ...datosPaciente, fumador: option })}
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

                {/* Peso */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Peso (kg):</label>
                    <input
                        type="number"
                        name="peso"
                        value={datosPaciente.peso}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Talla */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Talla (cm):</label>
                    <input
                        type="number"
                        name="talla"
                        value={datosPaciente.talla}
                        onChange={manejarCambio}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Hipertenso */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">¿Es hipertenso?</label>
                <div className="flex space-x-2 mb-2">
                    {['Sí', 'No'].map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setDatosPaciente({ ...datosPaciente, hipertenso: option })}
                            className={`p-2 border rounded-md ${datosPaciente.hipertenso === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Infarto */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">¿Ha tenido un infarto?</label>
                <div className="flex space-x-2 mb-2">
                    {['Sí', 'No'].map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setDatosPaciente({ ...datosPaciente, infarto: option })}
                            className={`p-2 border rounded-md ${datosPaciente.infarto === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* ACV */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">¿Ha tenido un ACV?</label>
                <div className="flex space-x-2 mb-2">
                    {['Sí', 'No'].map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setDatosPaciente({ ...datosPaciente, acv: option })}
                            className={`p-2 border rounded-md ${datosPaciente.acv === option ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
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
                        {/* Botón Agregar Medicamento */}
                        <button
                            onClick={toggleModalMedicamentos}
                            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Agregar Medicamento
                        </button>

                        {/* Botón Agregar Medicamento */}
                        <button
                            onClick={guardarPaciente}
                            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 items-end"
                        >
                            Guardar paciente
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Resultados</h2>
                        <p><strong>Edad:</strong> {datosPaciente.edad}</p>
                        <p><strong>Género:</strong> {datosPaciente.genero}</p>
                        <p><strong>Diabetes:</strong> {datosPaciente.diabetes}</p>
                        <p><strong>Fumador:</strong> {datosPaciente.fumador}</p>
                        <p><strong>Presión Arterial:</strong> {datosPaciente.presionArterial}</p>
                        <p><strong>Colesterol:</strong> {datosPaciente.colesterol || 'No especificado'}</p>
                        <p><strong>Peso:</strong> {datosPaciente.peso || 'No especificado'}</p>
                        <p><strong>Talla:</strong> {datosPaciente.talla || 'No especificada'} cm</p>
                        <p><strong>IMC:</strong> {datosPaciente.imc || 'No calculado'}</p>
                        <p><strong>Ubicación:</strong> {datosPaciente.ubicacion}</p>
                        <p><strong>Fecha de Registro:</strong> {datosPaciente.fechaRegistro}</p>
                        <p><strong>Hipertenso:</strong> {datosPaciente.hipertenso}</p>
                        <p><strong>Infarto:</strong> {datosPaciente.infarto}</p>
                        <p><strong>ACV:</strong> {datosPaciente.acv}</p>
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

            {/* Modal para agregar medicamentos */}
            {mostrarModalMedicamentos && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Seleccionar Medicamentos</h2>
                        <div className="mb-4 max-h-60 overflow-y-auto">
                            {listaMedicamentos.map((medicamento, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        value={medicamento}
                                        onChange={handleMedicamentoChange}
                                    />
                                    <label className="ml-2">{medicamento}</label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={guardarMedicamentos}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={toggleModalMedicamentos}
                            className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Mensaje de éxito */}
            {mensajeExito && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md">
                    {mensajeExito}
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
