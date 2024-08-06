// Definir las tablas de riesgo para todas las combinaciones
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
                        return riesgoTablaDiabetesFemFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaDiabetesFemFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaDiabetesFemFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaDiabetesFemFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaDiabetesFemNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaDiabetesFemNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaDiabetesFemNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaDiabetesFemNoFumador70(presion, colRango);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaNoDiabetesFemFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaNoDiabetesFemFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaNoDiabetesFemFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaNoDiabetesFemFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaNoDiabetesFemNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaNoDiabetesFemNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaNoDiabetesFemNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaNoDiabetesFemNoFumador70(presion, colRango);
                    }
                }
            }
        } else {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaDiabetesMascFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaDiabetesMascFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaDiabetesMascFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaDiabetesMascFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaDiabetesMascNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaDiabetesMascNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaDiabetesMascNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaDiabetesMascNoFumador70(presion, colRango);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaNoDiabetesMascFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaNoDiabetesMascFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaNoDiabetesMascFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaNoDiabetesMascFumador70(presion, colRango);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaNoDiabetesMascNoFumador40(presion, colRango);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaNoDiabetesMascNoFumador50(presion, colRango);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaNoDiabetesMascNoFumador60(presion, colRango);
                    } else if (edad >= 70) {
                        return riesgoTablaNoDiabetesMascNoFumador70(presion, colRango);
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
                        return riesgoTablaSinColesterolFemDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolFemDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolFemDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolFemDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolFemDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolFemDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolFemDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolFemDiabetesNoFumador70(presion);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolFemNoDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolFemNoDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolFemNoDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolFemNoDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolFemNoDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolFemNoDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolFemNoDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolFemNoDiabetesNoFumador70(presion);
                    }
                }
            }
        } else {
            if (diabetes === "si") {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolMascDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolMascDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolMascDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolMascDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolMascDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolMascDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolMascDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolMascDiabetesNoFumador70(presion);
                    }
                }
            } else {
                if (fuma === "si") {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolMascNoDiabetesFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolMascNoDiabetesFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolMascNoDiabetesFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolMascNoDiabetesFumador70(presion);
                    }
                } else {
                    if (edad >= 40 && edad <= 49) {
                        return riesgoTablaSinColesterolMascNoDiabetesNoFumador40(presion);
                    } else if (edad >= 50 && edad <= 59) {
                        return riesgoTablaSinColesterolMascNoDiabetesNoFumador50(presion);
                    } else if (edad >= 60 && edad <= 69) {
                        return riesgoTablaSinColesterolMascNoDiabetesNoFumador60(presion);
                    } else if (edad >= 70) {
                        return riesgoTablaSinColesterolMascNoDiabetesNoFumador70(presion);
                    }
                }
            }
        }
    }
}
