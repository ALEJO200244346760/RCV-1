// Definir las tablas de riesgo para todas las combinaciones
const riesgoMap = {
    "verde": "<10% Poco",
    "amarillo": ">10% <20% Moderado",
    "naranja": ">20% <30% Alto",
    "rojo": ">30% <40% Muy Alto",
    "rojo oscuro": ">40% Crítico"
};

function obtenerRiesgoTexto(color) {
    return riesgoMap[color] || "desconocido";
}

function riesgoTablaDiabetesMascFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "naranja",
        "140,4": "verde", "140,5": "verde", "140,6": "amarillo", "140,7": "amarillo", "140,8": "rojo oscuro",
        "160,4": "amarillo", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascNoFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "naranja",
        "160,4": "verde", "160,5": "amarillo", "160,6": "amarillo", "160,7": "naranja", "160,8": "rojo oscuro",
        "180,4": "naranja", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "naranja",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo oscuro",
        "160,4": "naranja", "160,5": "rojo", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascNoFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "amarillo", "120,6": "amarillo", "120,7": "naranja", "120,8": "rojo",
        "140,4": "amarillo", "140,5": "naranja", "140,6": "naranja", "140,7": "rojo", "140,8": "rojo oscuro",
        "160,4": "rojo", "160,5": "rojo oscuro", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascNoFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "amarillo",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascFumador70(presion, colRango) {
    const tabla = {
        "120,4": "amarillo", "120,5": "naranja", "120,6": "naranja", "120,7": "rojo", "120,8": "rojo oscuro",
        "140,4": "naranja", "140,5": "rojo", "140,6": "rojo oscuro", "140,7": "rojo oscuro", "140,8": "rojo oscuro",
        "160,4": "rojo oscuro", "160,5": "rojo oscuro", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesMascNoFumador70(presion, colRango) {
    const tabla = {
        "120,4": "amarillo", "120,5": "amarillo", "120,6": "amarillo", "120,7": "naranja", "120,8": "rojo",
        "140,4": "amarillo", "140,5": "naranja", "140,6": "naranja", "140,7": "rojo", "140,8": "rojo oscuro",
        "160,4": "naranja", "160,5": "rojo", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "amarillo", "160,5": "naranja", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemNoFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "rojo",
        "160,4": "verde", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "naranja",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemNoFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "rojo",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "naranja",
        "140,4": "amarillo", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemNoFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "amarillo",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemFumador70(presion, colRango) {
    const tabla = {
        "120,4": "amarillo", "120,5": "amarillo", "120,6": "naranja", "120,7": "naranja", "120,8": "rojo",
        "140,4": "naranja", "140,5": "naranja", "140,6": "rojo", "140,7": "rojo oscuro", "140,8": "rojo oscuro",
        "160,4": "rojo", "160,5": "rojo oscuro", "160,6": "rojo oscuro", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaDiabetesFemNoFumador70(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "amarillo", "120,6": "amarillo", "120,7": "amarillo", "120,8": "naranja",
        "140,4": "amarillo", "140,5": "amarillo", "140,6": "naranja", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "verde", "160,5": "amarillo", "160,6": "amarillo", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascNoFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "verde", "160,5": "verde", "160,6": "verde", "160,7": "amarillo", "160,8": "rojo",
        "180,4": "amarillo", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascNoFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "verde", "160,5": "verde", "160,6": "amarillo", "160,7": "amarillo", "160,8": "naranja",
        "180,4": "naranja", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "amarillo",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "rojo",
        "160,4": "amarillo", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascNoFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "amarillo", "160,7": "naranja", "160,8": "rojo",
        "180,4": "naranja", "180,5": "rojo", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascFumador70(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "amarillo", "120,6": "amarillo", "120,7": "amarillo", "120,8": "naranja",
        "140,4": "amarillo", "140,5": "amarillo", "140,6": "naranja", "140,7": "naranja", "140,8": "rojo",
        "160,4": "naranja", "160,5": "naranja", "160,6": "rojo", "160,7": "rojo oscuro", "160,8": "rojo oscuro",
        "180,4": "rojo oscuro", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesMascNoFumador70(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "amarillo", "120,8": "amarillo",
        "140,4": "verde", "140,5": "amarillo", "140,6": "amarillo", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "naranja", "160,8": "rojo",
        "180,4": "naranja", "180,5": "rojo", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "verde", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemNoFumador40(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "verde", "160,5": "verde", "160,6": "verde", "160,7": "amarillo", "160,8": "naranja",
        "180,4": "naranja", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemNoFumador50(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "verde", "160,5": "verde", "160,6": "amarillo", "160,7": "amarillo", "160,8": "naranja",
        "180,4": "naranja", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "amarillo", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemNoFumador60(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "verde",
        "140,4": "verde", "140,5": "verde", "140,6": "verde", "140,7": "verde", "140,8": "amarillo",
        "160,4": "verde", "160,5": "verde", "160,6": "amarillo", "160,7": "amarillo", "160,8": "naranja",
        "180,4": "naranja", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemFumador70(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "amarillo", "120,7": "amarillo", "120,8": "amarillo",
        "140,4": "amarillo", "140,5": "amarillo", "140,6": "amarillo", "140,7": "naranja", "140,8": "naranja",
        "160,4": "amarillo", "160,5": "naranja", "160,6": "naranja", "160,7": "rojo", "160,8": "rojo oscuro",
        "180,4": "rojo", "180,5": "rojo oscuro", "180,6": "rojo oscuro", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaNoDiabetesFemNoFumador70(presion, colRango) {
    const tabla = {
        "120,4": "verde", "120,5": "verde", "120,6": "verde", "120,7": "verde", "120,8": "amarillo",
        "140,4": "verde", "140,5": "verde", "140,6": "amarillo", "140,7": "amarillo", "140,8": "amarillo",
        "160,4": "amarillo", "160,5": "amarillo", "160,6": "amarillo", "160,7": "naranja", "160,8": "naranja",
        "180,4": "naranja", "180,5": "naranja", "180,6": "rojo", "180,7": "rojo oscuro", "180,8": "rojo oscuro",
    };
    return tabla[`${presion},${colRango}`] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesFumador70(presion) {
    const tabla = {
        120: "naranja",
        140: "rojo oscuro",
        160: "rojo oscuro",
        180: "rojo oscuro",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesNoFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesNoFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesNoFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo oscuro",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemDiabetesNoFumador70(presion) {
    const tabla = {
        120: "amarillo",
        140: "naranja",
        160: "rojo oscuro",
        180: "rojo oscuro",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesFumador70(presion) {
    const tabla = {
        120: "amarillo",
        140: "amarillo",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesNoFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "verde",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesNoFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesNoFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolFemNoDiabetesNoFumador70(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesFumador60(presion) {
    const tabla = {
        120: "amarillo",
        140: "naranja",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesFumador70(presion) {
    const tabla = {
        120: "naranja",
        140: "rojo",
        160: "rojo",
        180: "rojo oscuro",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesNoFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesNoFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesNoFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascDiabetesNoFumador70(presion) {
    const tabla = {
        120: "amarillo",
        140: "naranja",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesFumador70(presion) {
    const tabla = {
        120: "amarillo",
        140: "naranja",
        160: "rojo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesNoFumador40(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "verde",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesNoFumador50(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesNoFumador60(presion) {
    const tabla = {
        120: "verde",
        140: "verde",
        160: "amarillo",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

function riesgoTablaSinColesterolMascNoDiabetesNoFumador70(presion) {
    const tabla = {
        120: "verde",
        140: "amarillo",
        160: "naranja",
        180: "rojo",
    };
    return tabla[presion] || "riesgo no definido";
}

// Función principal para calcular el riesgo cardiovascular
// Calculadora.jsx
export function calcularRiesgoCardiovascular(edad, genero, diabetes, fuma, presion, colesterol = null) {
    let colRango = null;
    let color = "desconocido"; // Inicializar color con un valor por defecto

    if (colesterol !== null) {
        if (colesterol < 154) {
            colRango = 4;
        } else if (colesterol >= 155 && colesterol <= 192) {
            colRango = 5;
        } else if (colesterol >= 193 && colesterol <= 231) {
            colRango = 6;
        } else if (colesterol >= 232 && colesterol <= 269) {
            colRango = 7;
        } else if (colesterol >= 270) {
            colRango = 8;
        }

        if (colRango === null) {
            return "desconocido";
        }

        if (genero === "femenino") {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaDiabetesFemFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaDiabetesFemFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaDiabetesFemFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaDiabetesFemFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaDiabetesFemNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaDiabetesFemNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaDiabetesFemNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaDiabetesFemNoFumador70(presion, colRango);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaNoDiabetesFemFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaNoDiabetesFemFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaNoDiabetesFemFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaNoDiabetesFemFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaNoDiabetesFemNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaNoDiabetesFemNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaNoDiabetesFemNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaNoDiabetesFemNoFumador70(presion, colRango);
                    }
                }
            }
        } else {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaDiabetesMascFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaDiabetesMascFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaDiabetesMascFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaDiabetesMascFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaDiabetesMascNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaDiabetesMascNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaDiabetesMascNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaDiabetesMascNoFumador70(presion, colRango);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaNoDiabetesMascFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaNoDiabetesMascFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaNoDiabetesMascFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaNoDiabetesMascFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaNoDiabetesMascNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaNoDiabetesMascNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaNoDiabetesMascNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        color = riesgoTablaNoDiabetesMascNoFumador70(presion, colRango);
                    }
                }
            }
        }
    } else {
        // Cálculo sin colesterol
        if (genero === "femenino") {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolFemDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolFemDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolFemDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolFemDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolFemDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolFemDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolFemDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolFemDiabetesNoFumador70(presion);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolFemNoDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolFemNoDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolFemNoDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolFemNoDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolFemNoDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolFemNoDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolFemNoDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolFemNoDiabetesNoFumador70(presion);
                    }
                }
            }
        } else {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolMascDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolMascDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolMascDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolMascDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolMascDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolMascDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolMascDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolMascDiabetesNoFumador70(presion);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolMascNoDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolMascNoDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolMascNoDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolMascNoDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        color = riesgoTablaSinColesterolMascNoDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        color = riesgoTablaSinColesterolMascNoDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        color = riesgoTablaSinColesterolMascNoDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        color = riesgoTablaSinColesterolMascNoDiabetesNoFumador70(presion);
                    }
                }
            }
        }
    }

    // Usar la función obtenerRiesgoTexto para convertir el color en texto
    return obtenerRiesgoTexto(color);
}
