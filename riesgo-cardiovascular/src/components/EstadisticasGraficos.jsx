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
      const key = paciente[field] || 'N/A';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

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

  // --- Gráficos Existentes Actualizados ---

  // 1. Datos para Edad (Se mantiene)
  const edades = pacientesFiltrados.reduce((acc, paciente) => {
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

  // 2. Datos para Diabetes (Se mantiene)
  const dataDiabetes = createBinaryPieData('diabetes', 'Diabetes');

  // 3. Datos para Fumador (ACTUALIZADO: usa fumaDiario)
  const dataFumador = createBinaryPieData('fumaDiario', 'Fumador', ['#EF4444', '#34D399']);

  // 4. Datos para Colesterol (Se mantiene la lógica de rangos)
  const calcularRangoColesterol = (colesterol) => {
    // Asumo que 'No' en el formulario se traduce a null/undefined en el objeto paciente si no lo conoce.
    if (colesterol == null || colesterol === 'No' || isNaN(colesterol)) return 'No conoce';
    const numColesterol = Number(colesterol);
    if (numColesterol < 154) return 'Bajo';
    if (numColesterol >= 155 && numColesterol <= 192) return 'Normal';
    if (numColesterol >= 193 && numColesterol <= 231) return 'Alto';
    if (numColesterol >= 232) return 'Muy Alto o Crítico';
  };

  const colesterolAggr = pacientesFiltrados.reduce((acc, paciente) => {
    const rango = calcularRangoColesterol(paciente.colesterol);
    acc[rango] = (acc[rango] || 0) + 1;
    return acc;
  }, { 'No conoce': 0 });
  const dataColesterol = {
    labels: Object.keys(colesterolAggr),
    datasets: [{
      label: 'Cantidad',
      data: Object.values(colesterolAggr),
      backgroundColor: BASE_COLORS,
      borderColor: BASE_COLORS,
      borderWidth: 1
    }],
    aggregation: colesterolAggr
  };

  // 5. Datos para Nivel de Riesgo (Se mantiene)
  const riesgos = pacientesFiltrados.reduce((acc, paciente) => {
    acc[paciente.nivelRiesgo] = (acc[paciente.nivelRiesgo] || 0) + 1;
    return acc;
  }, {});
  const labelsRiesgoOrdenadas = ['<10% Bajo', '>10% <20% Moderado', '>20% <30% Alto', '>30% <40% Muy Alto', '>40% Crítico'];
  const dataRiesgo = {
    labels: labelsRiesgoOrdenadas.filter(label => riesgos[label] !== undefined), // Solo incluye etiquetas con datos
    datasets: [{
      label: 'Cantidad',
      data: labelsRiesgoOrdenadas.map(label => riesgos[label] || 0).filter(count => count > 0),
      backgroundColor: BASE_COLORS.slice(0, labelsRiesgoOrdenadas.length),
      borderColor: BASE_COLORS.slice(0, labelsRiesgoOrdenadas.length),
      borderWidth: 1
    }],
    aggregation: riesgos
  };

  // 6. Datos para Ubicación (Se mantiene)
  const dataUbicacion = createBinaryPieData('ubicacion', 'Ubicación', BASE_COLORS);

  // 7. Datos para IMC (ACTUALIZADO: usa clasificacion)
  const imcCategorias = ['Bajo peso', 'Normopeso', 'Sobrepeso', 'Obesidad Grado I', 'Obesidad Grado II', 'Obesidad Grado III'];
  const conteoIMC = pacientesFiltrados.reduce((acc, paciente) => {
    const clasificacion = paciente.imc?.clasificacion;
    if (clasificacion && imcCategorias.includes(clasificacion)) {
      acc[clasificacion] = (acc[clasificacion] || 0) + 1;
    }
    return acc;
  }, imcCategorias.reduce((a, c) => ({...a, [c]: 0}), {})); // Inicializa con 0s

  const dataIMC = {
    labels: imcCategorias,
    datasets: [{
      label: 'Número de Pacientes',
      data: imcCategorias.map(categoria => conteoIMC[categoria]),
      backgroundColor: ['#60A5FA', '#34D399', '#FDE047', '#F97316', '#EF4444', '#B91C1C'],
      borderColor: ['#60A5FA', '#34D399', '#FDE047', '#F97316', '#EF4444', '#B91C1C'],
      borderWidth: 1
    }],
    aggregation: conteoIMC
  };

  // --- NUEVOS GRÁFICOS ESPECÍFICOS DE MUJER ---

  // 8. Tumores Ginecológicos
  const dataTumoresGinecológicos = createBinaryPieData('tumoresGinecologicos', 'Tumores Ginecológicos');

  // 9. Enfermedades Autoinmunes
  const dataEnfermedadesAutoinmunes = createBinaryPieData('enfermedadesAutoinmunes', 'Enfermedades Autoinmunes');
  
  // 10. Tuvo Hijos
  const dataTuvoHijos = createBinaryPieData('tuvoHijos', 'Tuvo Hijos', ['#8B5CF6', '#EC4899']);

  // 11. Ciclos Menstruales
  const dataCiclosMenstruales = createBinaryPieData('ciclosMenstruales', 'Ciclos Menstruales');

  // 12. Menopausia
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
        legend: { display: true }, 
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
        }
    }
  });


  const ChartWrapper = ({ title, chartType, data, options }) => (
    <div className="bg-white p-4 shadow-lg rounded-lg h-96">
        <h3 className="text-center font-semibold mb-2">{title}</h3>
        {chartType === 'Bar' ? <Bar data={data} options={options} /> : <Pie data={data} options={options} />}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Gráficos de Barras / Distribución */}
      <ChartWrapper title="Distribución de Edad" chartType="Bar" data={dataEdad} options={barOptions(edades)} />
      <ChartWrapper title="Clasificación de IMC" chartType="Bar" data={dataIMC} options={barOptions(dataIMC.aggregation)} />
      <ChartWrapper title="Nivel de Riesgo Cardiovascular" chartType="Bar" data={dataRiesgo} options={barOptions(dataRiesgo.aggregation)} />
      
      {/* Gráficos Específicos de Mujer */}
      <ChartWrapper title="Tumores Ginecológicos" chartType="Pie" data={dataTumoresGinecológicos} options={pieOptions(dataTumoresGinecológicos.aggregation)} />
      <ChartWrapper title="Enfermedades Autoinmunes" chartType="Pie" data={dataEnfermedadesAutoinmunes} options={pieOptions(dataEnfermedadesAutoinmunes.aggregation)} />
      <ChartWrapper title="Tuvo Hijos" chartType="Pie" data={dataTuvoHijos} options={pieOptions(dataTuvoHijos.aggregation)} />
      <ChartWrapper title="Ciclos Menstruales" chartType="Pie" data={dataCiclosMenstruales} options={pieOptions(dataCiclosMenstruales.aggregation)} />
      <ChartWrapper title="Menopausia" chartType="Pie" data={dataMenopausia} options={pieOptions(dataMenopausia.aggregation)} />

      {/* Otros Gráficos de Pastel */}
      <ChartWrapper title="Fumador Diario" chartType="Pie" data={dataFumador} options={pieOptions(dataFumador.aggregation)} />
      <ChartWrapper title="Diabetes" chartType="Pie" data={dataDiabetes} options={pieOptions(dataDiabetes.aggregation)} />
      <ChartWrapper title="Rango de Colesterol" chartType="Pie" data={dataColesterol} options={pieOptions(dataColesterol.aggregation)} />
      <ChartWrapper title="Ubicación" chartType="Pie" data={dataUbicacion} options={pieOptions(dataUbicacion.aggregation)} />
      
    </div>
  );
}

export default EstadisticasGraficos;