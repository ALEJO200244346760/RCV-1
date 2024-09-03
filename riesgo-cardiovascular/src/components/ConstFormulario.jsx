
export const DatosPacienteInicial = {
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
}

export const Advertencia = {
            '<10% Poco': `-No significa no tener riesgos.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales.
-Vigilar el perfil del riesgo con el control de la presión arterial y un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Realizar el cálculo de riesgo cardiovascular cada 12 meses.
            `,
            '>10% <20% Moderado': `-Significa tener riesgo moderado de sufrir un episodio vascular en los próximos 10 año-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Realizar el cálculo de riesgo cardiovascular cada 6 meses.
            `,
            '>20% <30% Alto': `-Significa tener riesgo elevado de sufrir un episodio vascular en los próximos 10 años.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Realizar el cálculo de riesgo cardiovascular cada 3 meses.
-Revisar el calendario de vacunas.
            `,
            '>30% <40% Muy Alto': `-Significa tener riesgo elevado de sufrir un episodio vascular en los próximos 10 años.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Realizar el cálculo de riesgo cardiovascular cada 3 meses.
-Revisar el calendario de vacunas.
            `,
            '>40% Crítico': `-Significa tener riesgo elevado de sufrir un episodio vascular en los próximos 10 años.
-Se recomienda intervenciones como un estilo de vida más saludable.
-Mayor adherencia y cumplimiento a los tratamientos y medicamentos indicados.
-Realización de estudios complementarios indicados por el profesional de la salud.
-Mejorar la calidad del sueño logrando al menos siete horas continuas.
-Actividad física controlada y monitorizada idealmente en un centro de rehabilitación que incluya ejercicios aeróbicos (como caminata bicicleta baile natación) y otros ejercicios aeróbicos (como levantamiento de pesas en tren superior o brazos y espalda y tren inferior como piernas y muslos, comenzando con cargas de menor a mayor peso gradualmente)
-Estos tipos de ejercicios recomiendan al menos tres veces por semana, o bien 150 minutos semanales, siempre controlando la presión arterial antes de iniciar la actividad física de mayor intensidad.
-Vigilar el perfil del riesgo con un análisis de laboratorio de colesterol y glucemia.
-Alimentación saludable recomendada en lo posible por un nutricionista o profesional de la salud.
-Evitar hábitos tóxicos.
-Realizar el cálculo de riesgo cardiovascular cada 3 meses.
-Revisar el calendario de vacunas.
            `
};

export const listaMedicamentos = [
    "1800*Consulta de detección y/o seguimiento de HTA CTC074K86",
    "270*Notificación de riesgo cardiovascular < 10% (a partir de 18 años) NTN007K22",
    "270*Notificación de riesgo cardiovascular 10% ≤ 20% (a partir de 18 años) NTN008K22",
    "270*Notificación de riesgo cardiovascular 20% ≤ 30% (a partir de 18 años) NTN009K22",
    "270*Notificación de riesgo cardiovascular ≥ 30% (a partir de 18 años) NTN010K22",
    "936*Consejería Consejo conductual breve de cese de tabaquismo COT023P22",                              
    "180*Glucemia LBL045VMD",
    "180*Perfil lipídico LBL073VMD",
    "180*Albuminuria LBL137VMD",
    "180*Creatinina sérica LBL022VMD",
    "180*IFGe LBL140VMD",
    "504*Notificación de persona con hipertensión en tratamiento farmacológico NTN030K86",
    "558**Prescripción de enalapril P052 M07",
    "558*Prescripción de losartán P052 M08",
    "558*Prescripción de hidroclorotiazida P052 M09",
    "558*Prescripción de amlodipina P052 M10",
    "612*Dispensa de enalapril P053 M07",
    "612*Dispensa de losartán P053 M08",
    "612*Dispensa de hidroclorotiazida P053 M09",
    "612*Dispensa de amlodipina P053 M10",
    "936*Consulta para la evaluación de riesgo cardiovascular CTC048K22",
    "702*Consulta de seguimiento de persona con riesgo cardiovascular CTC049K22",
    "936*Consulta con cardiología en persona con alto RCV CTC044K22",
    "468*Consejeria abandono de tabaquismo",
    "936*Consulta para cesación tabáquica (personas adultas y mayores) CTC075A98",
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
