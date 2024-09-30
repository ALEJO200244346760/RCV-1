// ConstFormulario.jsx
export const DatosPacienteInicial = {
    cuil: '',
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
    acv: '',
    renal: '',
    notificacionRiesgo: [],
    hipertensionArterial: [],
    medicacionPrescripcion: [],
    medicacionDispensa: [],
    tabaquismo: [],
    laboratorio: []
};


export const Advertencia = {
            '<10% Bajo': `-Realizar el cálculo de riesgo cardiovascular cada 12 meses.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales.
-Vigilar el perfil del riesgo con el control de la presión arterial y un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
            `,
            '>10% <20% Moderado': `-Realizar el cálculo de riesgo cardiovascular cada 6 meses.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
            `,
            '>20% <30% Alto': `-Realizar el cálculo de riesgo cardiovascular cada 3 meses.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Revisar el calendario de vacunas.
            `,
            '>30% <40% Muy Alto': `-Realizar el cálculo de riesgo cardiovascular cada 3 meses.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Revisar el calendario de vacunas.
            `,
            '>40% Crítico': `-Realizar el cálculo de riesgo cardiovascular en menos de un mes.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Revisar el calendario de vacunas.
            `
};

export const listaNotificacionRiesgo = [
    
    "270*Notificación de riesgo cardiovascular < 10% (a partir de 18 años) NTN007K22",
    "270*Notificación de riesgo cardiovascular 10% ≤ 20% (a partir de 18 años) NTN008K22",
    "270*Notificación de riesgo cardiovascular 20% ≤ 30% (a partir de 18 años) NTN009K22",
    "270*Notificación de riesgo cardiovascular ≥ 30% (a partir de 18 años) NTN010K22",
    "936*Consulta para la evaluación de riesgo cardiovascular CTC048K22",
    "702*Consulta de seguimiento de persona con riesgo cardiovascular CTC049K22",
    "936*Consulta con cardiología en persona con alto RCV CTC044K22",
];

export const listaHipertensionArterial = [

    "504*Notificación de persona con hipertensión en tratamiento farmacológico NTN030K86",
    "1800*Consulta de detección y/o seguimiento de HTA CTC074K86",
];

export const listaMedicacionPrescripcion = [

    "558**Prescripción de enalapril P052 M07",
    "558*Prescripción de losartán P052 M08",
    "558*Prescripción de hidroclorotiazida P052 M09",
    "558*Prescripción de amlodipina P052 M10",
];

export const listaMedicacionDispensa = [

    "612*Dispensa de enalapril P053 M07",
    "612*Dispensa de losartán P053 M08",
    "612*Dispensa de hidroclorotiazida P053 M09",
    "612*Dispensa de amlodipina P053 M10",
];

export const listaTabaquismo = [

    "468*Consejeria abandono de tabaquismo",
    "936*Consulta para cesación tabáquica (personas adultas y mayores) CTC075A98",
    "936*Consejería Consejo conductual breve de cese de tabaquismo COT023P22",
];

export const listaLaboratorio = [
                              
    "180*Glucemia LBL045VMD",
    "180*Perfil lipídico LBL073VMD",
    "180*Albuminuria LBL137VMD",
    "180*Creatinina sérica LBL022VMD",
    "180*IFGe LBL140VMD",
];

export const obtenerColorRiesgo = (riesgo) => {
    switch (riesgo) {
        case '<10% Bajo': return 'bg-green-500';
        case '>10% <20% Moderado': return 'bg-yellow-500';
        case '>20% <30% Alto': return 'bg-orange-500';
        case '>30% <40% Muy Alto': return 'bg-red-500';
        case '>40% Crítico': return 'bg-red-800';
        default: return 'bg-gray-200';
    }
};

export const obtenerTextoRiesgo = (riesgo) => {
    switch (riesgo) {
        case '<10% Bajo': return '<10% Bajo';
        case '>10% <20% Moderado': return '>10% <20% Moderado';
        case '>20% <30% Alto': return '>20% <30% Alto';
        case '>30% <40% Muy Alto': return '>30% <40% Muy Alto';
        case '>40% Crítico': return '>40% Crítico';
        default: return 'Desconocido';
    }
};

