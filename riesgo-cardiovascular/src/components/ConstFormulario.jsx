// ConstFormulario.jsx
import { calcularRiesgoCardiovascular } from './Calculadora';


export const manejarCambio = (e, datosPaciente, setDatosPaciente) => {
    const { name, value } = e.target;
    setDatosPaciente({
        ...datosPaciente,
        [name]: value,
    });
};

export const manejarSeleccionColesterol = (value, datosPaciente, setDatosPaciente, setNivelColesterolConocido) => {
    setNivelColesterolConocido(value === 'si');
    setDatosPaciente({
        ...datosPaciente,
        colesterol: value === 'no' ? 'No' : datosPaciente.colesterol
    });
};

export const calcularIMC = (datosPaciente) => {
    const peso = parseFloat(datosPaciente.peso);
    const tallaCm = parseFloat(datosPaciente.talla);
    if (peso && tallaCm) {
        const tallaM = tallaCm / 100; // Convertir centímetros a metros
        const imc = peso / (tallaM * tallaM);
        return imc.toFixed(2);
    }
    return '';
};

export const ajustarEdad = (edad) => {
    if (edad < 50) return 40;
    if (edad >= 50 && edad <= 59) return 50;
    if (edad >= 60 && edad <= 69) return 60;
    return 70;
};

export const ajustarPresionArterial = (presion) => {
    if (presion < 140) return 120;
    if (presion >= 140 && presion <= 159) return 140;
    if (presion >= 160 && presion <= 179) return 160;
    return 180;
};

export const validarCampos = (datosPaciente) => {
    const { edad, genero, diabetes, fumador, presionArterial, ubicacion } = datosPaciente;
    return edad && genero && diabetes && fumador && presionArterial && ubicacion;
};

export const calcularRiesgo = async (datosPaciente, nivelColesterolConocido, setModalAdvertencia, setMostrarModal, setDatosPaciente, setNivelRiesgo) => {
    if (!validarCampos(datosPaciente)) {
        setModalAdvertencia('Todos los campos deben estar completos.');
        setMostrarModal(true);
        return;
    }

    if (nivelColesterolConocido && !datosPaciente.colesterol) {
        setModalAdvertencia('Debe ingresar el nivel de colesterol.');
        setMostrarModal(true);
        return;
    }

    const { edad, genero, diabetes, fumador, presionArterial, colesterol, ubicacion, fechaRegistro } = datosPaciente;

    // Ajustar la edad y la presión arterial
    const edadAjustada = ajustarEdad(parseInt(edad, 10));
    const presionAjustada = ajustarPresionArterial(parseInt(presionArterial, 10));

    // Calcular el IMC
    const imc = calcularIMC(datosPaciente);
    setDatosPaciente((prevDatos) => ({ ...prevDatos, imc }));

    // Calcular el riesgo
    const nivelRiesgo = calcularRiesgoCardiovascular(edadAjustada, genero, diabetes, fumador, presionAjustada, colesterol);
    setNivelRiesgo(nivelRiesgo);
    setMostrarModal(true);
};

export const guardarPaciente = async (datosPaciente, axiosInstance, setMensajeExito) => {
    try {
        // Hacer la solicitud PUT para guardar todos los datos del paciente, incluidos los medicamentos
        await axiosInstance.put('/api/pacientes/', datosPaciente);
        console.log('Paciente guardado exitosamente');
        setMensajeExito('Paciente guardado con éxito');
    } catch (error) {
        console.error('Error al guardar el paciente:', error);
    }
};

export const guardarMedicamentos = async (datosPaciente, medicamentosSeleccionados, axiosInstance, setMensajeExito, toggleModalMedicamentos) => {
    try {
        // Verifica que datosPaciente.id esté definido
        if (!datosPaciente.id) {
            console.error('El ID del paciente no está definido');
            return;
        }

        // Filtra los medicamentos seleccionados y únelos en un solo string, separados por saltos de línea
        const medicamentosSeleccionadosStr = medicamentosSeleccionados.split('\n').filter(Boolean).join('\n');

        // Hacer la solicitud PUT para guardar el string de medicamentos en el paciente
        await axiosInstance.put(`/api/pacientes/${datosPaciente.id}/medicamentos`, {
            medicamentos: medicamentosSeleccionadosStr
        });

        console.log('Medicamentos guardados exitosamente');
        setMensajeExito('Medicamentos guardados con éxito');
        toggleModalMedicamentos(); // Cerrar el modal de medicamentos
    } catch (error) {
        console.error('Error al guardar los medicamentos:', error);
    }
};

export const cerrarModal = (setMostrarModal, setModalAdvertencia) => {
    setMostrarModal(false);
    setModalAdvertencia(null);
};

export const abrirModalAdvertencia = (nivel, setModalAdvertencia) => {
    const advertencias = {
        '<10% Poco': 'No significa no tener riesgos... (descripción completa)',
        '>10% <20% Moderado': 'Significa tener riesgo moderado... (descripción completa)',
        '>20% <30% Alto': 'Significa tener riesgo elevado... (descripción completa)',
        '>30% <40% Muy Alto': 'Significa tener riesgo elevado... (descripción completa)',
        '>40% Crítico': 'Significa tener riesgo elevado... (descripción completa)',
    };
    setModalAdvertencia(advertencias[nivel]);
};

export const listaMedicamentos = [
    "1800*Consulta de detección y/o seguimiento de HTA CTC074K86",
    "270*Notificación de riesgo cardiovascular < 10% (a partir de 18 años) NTN007K22",
    // Más medicamentos...
];

export const toggleModalMedicamentos = (mostrarModalMedicamentos, setMostrarModalMedicamentos) => setMostrarModalMedicamentos(!mostrarModalMedicamentos);

export const handleMedicamentoChange = (event, medicamentosSeleccionados, setMedicamentosSeleccionados) => {
    const { value, checked } = event.target;
    if (checked) {
        setMedicamentosSeleccionados([...medicamentosSeleccionados, value]);
    } else {
        setMedicamentosSeleccionados(
            medicamentosSeleccionados.filter((med) => med !== value)
        );
    }
};

export const obtenerColorRiesgo = (riesgo) => {
    switch (riesgo) {
        case '<10% Poco': return 'bg-green-500';
        case '>10% <20% Moderado': return 'bg-yellow-500';
        case '>20% <30% Alto': return 'bg-orange-500';
        case '>30% <40% Muy Alto': return 'bg-red-500';
        case '>40% Crítico': return 'bg-red-800';
        default: return 'bg-gray-200';
    }
};

export const obtenerTextoRiesgo = (riesgo) => {
    switch (riesgo) {
        case '<10% Poco': return '<10% Poco';
        case '>10% <20% Moderado': return '>10% <20% Moderado';
        case '>20% <30% Alto': return '>20% <30% Alto';
        case '>30% <40% Muy Alto': return '>30% <40% Muy Alto';
        case '>40% Crítico': return '>40% Crítico';
        default: return 'Desconocido';
    }
};

export const renderRiesgoGrid = (riesgo) => {
    const riesgos = [
        '<10% Poco',
        '>10% <20% Moderado',
        '>20% <30% Alto',
        '>30% <40% Muy Alto',
        '>40% Crítico'
    ];
    return (
        <div className="grid grid-cols-12 gap-2">
            {riesgos.map((nivel) => (
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
