// EstadisticasGraficos.jsx

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Colores base para gráficos
const BASE_COLORS = [
    '#60A5FA', // Azul
    '#34D399', // Verde
    '#FDE047', // Amarillo
    '#F97316', // Naranja
    '#EF4444', // Rojo
    '#B91C1C', // Rojo oscuro
    '#8B5CF6', // Púrpura
    '#EC4899', // Rosa
];

function EstadisticasGraficos({ pacientesFiltrados }) {
  
  // Función para calcular porcentajes para Tooltip
  const calcularPorcentajes = (data) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = total > 0 ? ((data[key] / total) * 100).toFixed(2) : 0;
      return acc;
    }, {});
  };

  // Función genérica para crear datos de Pie Chart a partir de un campo booleano (Sí/No)
  const createBinaryPieData = (field, title, colors = ['#34D399', '#EF4444']) => {
    const aggregation = pacientesFiltrados.reduce((acc, paciente) => {
      // Usamos 'N/A' si el campo es undefined/null o string vacío.
      const key = paciente[field] || 'N/A';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Eliminar 'N/A' si no hay datos, o manejarlo como una opción si es necesario.
    // Para simplificar, asumiremos que si hay un filtro aplicado, el campo debe existir.
    
    return {
        labels: Object.keys(aggregation),
        datasets: [{
            label: 'Cantidad',
            data: Object.values(aggregation),
            backgroundColor: colors.slice(0, Object.keys(aggregation).length),
            borderColor: colors.slice(0, Object.keys(aggregation).length),
            borderWidth: 1
        }],
        aggregation: aggregation // Adjunto la agregación para usarla en el tooltip
    };
  };

  // --- Gráficos Existentes Actualizados (Revisados los nombres de campo) ---

  // 1. Datos para Edad
  const edades = pacientesFiltrados.reduce((acc, paciente) => {
    // El campo 'edad' en el paciente ya viene como la categoría de filtro (e.g., '51-60')
    acc[paciente.edad] = (acc[paciente.edad] || 0) + 1;
    return acc;
  }, {});
  const dataEdad = {
    labels: Object.keys(edades),
    datasets: [{
      label: 'Cantidad',
      data: Object.values(edades),
      backgroundColor: BASE_COLORS,
      borderColor: BASE_COLORS,
      borderWidth: 1
    }]
  };

  // 2. Datos para IMC (clasificacion)
  const imcCategorias = ['Bajo peso', 'Normopeso', 'Sobrepeso', 'Obesidad Grado I', 'Obesidad Grado II', 'Obesidad Grado III'];
  const conteoIMC = pacientesFiltrados.reduce((acc, paciente) => {
    // El filtro IMC de Estadisticas.jsx usa directamente el campo 'imc' si es un string (no el objeto {clasificacion: '...'}).
    // Aquí asumimos que p.imc es el string de clasificación para ser coherentes con el filtro.
    const clasificacion = paciente.imc; 
    if (clasificacion && imcCategorias.includes(clasificacion)) {
      acc[clasificacion] = (acc[clasificacion] || 0) + 1;
    }
    return acc;
  }, imcCategorias.reduce((a, c) => ({...a, [c]: 0}), {})); // Inicializa con 0s

  const dataIMC = {
    labels: imcCategorias.filter(categoria => conteoIMC[categoria] > 0),
    datasets: [{
      label: 'Número de Pacientes',
      data: imcCategorias.map(categoria => conteoIMC[categoria]).filter(count => count > 0),
      backgroundColor: ['#60A5FA', '#34D399', '#FDE047', '#F97316', '#EF4444', '#B91C1C'],
      borderColor: ['#60A5FA', '#34D399', '#FDE047', '#F97316', '#EF4444', '#B91C1C'],
      borderWidth: 1
    }],
    aggregation: conteoIMC
  };

  // 3. Datos para Nivel de Riesgo
  const riesgos = pacientesFiltrados.reduce((acc, paciente) => {
    acc[paciente.nivelRiesgo] = (acc[paciente.nivelRiesgo] || 0) + 1;
    return acc;
  }, {});
  const labelsRiesgoOrdenadas = ['<10% Bajo', '>10% <20% Moderado', '>20% <30% Alto', '>30% <40% Muy Alto', '>40% Crítico'];
  const dataRiesgo = {
    labels: labelsRiesgoOrdenadas.filter(label => riesgos[label] !== undefined && riesgos[label] > 0),
    datasets: [{
      label: 'Cantidad',
      data: labelsRiesgoOrdenadas.map(label => riesgos[label] || 0).filter(count => count > 0),
      backgroundColor: BASE_COLORS.slice(0, labelsRiesgoOrdenadas.length),
      borderColor: BASE_COLORS.slice(0, labelsRiesgoOrdenadas.length),
      borderWidth: 1
    }],
    aggregation: riesgos
  };

  // 4. Datos para Fumador (fumaDiario)
  const dataFumador = createBinaryPieData('fumaDiario', 'Fumador', ['#EF4444', '#34D399']);
  
  // 5. Datos para Colesterol (Se mantiene la lógica de rangos)
  const calcularRangoColesterol = (colesterol) => {
    if (colesterol == null || colesterol === 'No' || isNaN(colesterol)) return 'No conoce';
    const numColesterol = Number(colesterol);
    if (numColesterol < 154) return 'Muy Bajo';
    if (numColesterol >= 155 && numColesterol <= 192) return 'Bajo';
    if (numColesterol >= 193 && numColesterol <= 231) return 'Moderado';
    if (numColesterol >= 232) return 'Alto/Muy Alto'; // Combinamos por simplificar
  };

  const colesterolAggr = pacientesFiltrados.reduce((acc, paciente) => {
    const rango = calcularRangoColesterol(paciente.colesterol);
    acc[rango] = (acc[rango] || 0) + 1;
    return acc;
  }, { 'No conoce': 0 });
  const dataColesterol = {
    labels: Object.keys(colesterolAggr).filter(label => colesterolAggr[label] > 0),
    datasets: [{
      label: 'Cantidad',
      data: Object.values(colesterolAggr).filter(count => count > 0),
      backgroundColor: BASE_COLORS,
      borderColor: BASE_COLORS,
      borderWidth: 1
    }],
    aggregation: colesterolAggr
  };

  // 6. Datos para Diabetes (asumo que existe el campo 'diabetes')
  // No hay filtro de diabetes en Estadisticas.jsx, pero mantengo el gráfico.
  const dataDiabetes = createBinaryPieData('diabetes', 'Diabetes');

  // 7. Datos para Ubicación (asumo que existe el campo 'ubicacion')
  // No hay filtro de ubicación en Estadisticas.jsx, pero mantengo el gráfico.
  const dataUbicacion = createBinaryPieData('ubicacion', 'Ubicación', BASE_COLORS);

  // --- NUEVOS GRÁFICOS ESPECÍFICOS DE MUJER/HÁBITOS ---

  // 8. Toma Medicación Diaria
  const dataTomaMedicacion = createBinaryPieData('tomaMedicacionDiario', 'Toma Medicación Diaria', ['#8B5CF6', '#34D399']);

  // 9. Actividad Física
  const dataActividadFisica = createBinaryPieData('actividadFisica', 'Actividad Física $\ge 150 \text{ min/sem}$', ['#34D399', '#EF4444']);
  
  // 10. Horas Sueño (+7h)
  const dataHorasSueno = createBinaryPieData('horasSueno', 'Duerme $+7\text{h}$', ['#60A5FA', '#F97316']);

  // 11. Estrés Crónico
  const dataEstresCronico = createBinaryPieData('estresCronico', 'Estrés Crónico', ['#EF4444', '#34D399']);

  // 12. Tumores Ginecológicos
  const dataTumoresGinecológicos = createBinaryPieData('tumoresGinecologicos', 'Tumores Ginecológicos', ['#EC4899', '#34D399']);

  // 13. Enfermedades Autoinmunes
  const dataEnfermedadesAutoinmunes = createBinaryPieData('enfermedadesAutoinmunes', 'Enfermedades Autoinmunes', ['#B91C1C', '#34D399']);
  
  // 14. Tuvo Hijos
  const dataTuvoHijos = createBinaryPieData('tuvoHijos', 'Tuvo Hijos', ['#8B5CF6', '#EC4899']);

  // 15. Ciclos Menstruales
  const dataCiclosMenstruales = createBinaryPieData('ciclosMenstruales', 'Ciclos Menstruales', ['#EC4899', '#34D399']);

  // 16. Histerectomía
  const dataHisterectomia = createBinaryPieData('histerectomia', 'Histerectomía', ['#F97316', '#34D399']);

  // 17. Menopausia
  const dataMenopausia = createBinaryPieData('menopausia', 'Menopausia', ['#EC4899', '#34D399']);
  
  // Opciones base para los gráficos (tooltips con porcentaje)
  const pieOptions = (aggregation) => ({
      responsive: true,
      plugins: { 
          legend: { position: 'top' }, 
          tooltip: { 
              callbacks: { 
                  label: (tooltipItem) => {
                      const label = tooltipItem.label;
                      const raw = tooltipItem.raw;
                      const percentages = calcularPorcentajes(aggregation);
                      return `${label}: ${raw} (${percentages[label]}%)`;
                  } 
              } 
          }
      }
  });

  const barOptions = (aggregation) => ({
    responsive: true,
    plugins: { 
        legend: { display: false }, 
        tooltip: { 
            callbacks: { 
                label: (tooltipItem) => {
                    const label = tooltipItem.label;
                    const raw = tooltipItem.raw;
                    const percentages = calcularPorcentajes(aggregation);
                    return `${label}: ${raw} (${percentages[label]}%)`;
                } 
            } 
        }
    },
    scales: {
        y: { 
            ticks: { stepSize: 1 }
        },
        x: {
            // Asegura que las etiquetas del eje X se vean bien en la barra
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
        }
    }
  });


  const ChartWrapper = ({ title, chartType, data, options }) => (
    <div className="bg-white p-4 shadow-lg rounded-lg h-96 flex flex-col">
        <h3 className="text-center font-semibold mb-2">{title}</h3>
        <div className="flex-grow flex items-center justify-center">
          {chartType === 'Bar' ? <Bar data={data} options={options} /> : <Pie data={data} options={options} />}
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Gráficos de Barras / Distribución */}
      <ChartWrapper title="Distribución de Edad" chartType="Bar" data={dataEdad} options={barOptions(edades)} />
      <ChartWrapper title="Clasificación de IMC" chartType="Bar" data={dataIMC} options={barOptions(dataIMC.aggregation)} />
      <ChartWrapper title="Nivel de Riesgo Cardiovascular" chartType="Bar" data={dataRiesgo} options={barOptions(dataRiesgo.aggregation)} />
      
      {/* Gráficos de Hábitos */}
      <ChartWrapper title="Fumador Diario" chartType="Pie" data={dataFumador} options={pieOptions(dataFumador.aggregation)} />
      <ChartWrapper title="Toma Medicación Diaria" chartType="Pie" data={dataTomaMedicacion} options={pieOptions(dataTomaMedicacion.aggregation)} />
      <ChartWrapper title="Actividad Física $\ge 150 \text{ min/sem}$" chartType="Pie" data={dataActividadFisica} options={pieOptions(dataActividadFisica.aggregation)} />
      <ChartWrapper title="Duerme $+7\text{h}$" chartType="Pie" data={dataHorasSueno} options={pieOptions(dataHorasSueno.aggregation)} />
      <ChartWrapper title="Estrés Crónico" chartType="Pie" data={dataEstresCronico} options={pieOptions(dataEstresCronico.aggregation)} />

      {/* Gráficos de Salud Femenina */}
      <ChartWrapper title="Tumores Ginecológicos" chartType="Pie" data={dataTumoresGinecológicos} options={pieOptions(dataTumoresGinecológicos.aggregation)} />
      <ChartWrapper title="Enfermedades Autoinmunes" chartType="Pie" data={dataEnfermedadesAutoinmunes} options={pieOptions(dataEnfermedadesAutoinmunes.aggregation)} />
      <ChartWrapper title="Tuvo Hijos" chartType="Pie" data={dataTuvoHijos} options={pieOptions(dataTuvoHijos.aggregation)} />
      <ChartWrapper title="Ciclos Menstruales" chartType="Pie" data={dataCiclosMenstruales} options={pieOptions(dataCiclosMenstruales.aggregation)} />
      <ChartWrapper title="Histerectomía" chartType="Pie" data={dataHisterectomia} options={pieOptions(dataHisterectomia.aggregation)} />
      <ChartWrapper title="Menopausia" chartType="Pie" data={dataMenopausia} options={pieOptions(dataMenopausia.aggregation)} />
      
      {/* Otros Gráficos de Pastel */}
      <ChartWrapper title="Diabetes" chartType="Pie" data={dataDiabetes} options={pieOptions(dataDiabetes.aggregation)} />
      <ChartWrapper title="Rango de Colesterol" chartType="Pie" data={dataColesterol} options={pieOptions(dataColesterol.aggregation)} />
      <ChartWrapper title="Ubicación" chartType="Pie" data={dataUbicacion} options={pieOptions(dataUbicacion.aggregation)} />
      
    </div>
  );
}

export default EstadisticasGraficos;