// EstadisticasGraficos.jsx

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Colores base para gráficos (adaptados a la paleta de Tailwind/Moderno)
const BASE_COLORS = [
    '#60A5FA', // Azul (Bajo riesgo/general)
    '#34D399', // Verde (Bueno)
    '#FDE047', // Amarillo (Moderado)
    '#F97316', // Naranja (Alto)
    '#EF4444', // Rojo (Muy Alto/Negativo)
    '#8B5CF6', // Púrpura (Salud Femenina)
    '#EC4899', // Rosa (Salud Femenina)
    '#B91C1C', // Rojo oscuro (Crítico)
];

// Corregimos la destructuración para que pacientes tome [] si es undefined/null.
function EstadisticasGraficos({ pacientes: pacientesFiltrados = [] }) {
  
  // Si por alguna razón la lista está vacía después de los filtros o aún no se cargó, 
  // no generamos los gráficos para evitar errores o gráficos vacíos sin sentido.
  if (pacientesFiltrados.length === 0) {
      return <div className="p-4 text-center text-gray-500">No hay pacientes que coincidan con los filtros aplicados.</div>;
  }
  
  // Función para calcular porcentajes para Tooltip
  const calcularPorcentajes = (data) => {
    const total = Object.values(data).reduce((sum, current) => sum + current, 0);
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = total > 0 ? ((data[key] / total) * 100).toFixed(1) : 0;
        return acc;
    }, {});
  };
  
  // Función centralizada de agregación para gráficos de pastel (Pie)
  const aggregateDataPie = (field, customTransform = (val) => val) => {
      const aggregation = {};
      pacientesFiltrados.forEach(p => {
          const value = customTransform(p[field]);
          if (value) {
              aggregation[value] = (aggregation[value] || 0) + 1;
          } else {
              aggregation['No especificado'] = (aggregation['No especificado'] || 0) + 1;
          }
      });
      
      const labels = Object.keys(aggregation);
      const dataValues = Object.values(aggregation);
      
      return {
          labels: labels,
          datasets: [{
              data: dataValues,
              backgroundColor: labels.map((_, index) => BASE_COLORS[index % BASE_COLORS.length]),
              hoverOffset: 4
          }],
          aggregation: aggregation,
      };
  };
  
  // Función de agregación para el IMC (Gráfico de Barras)
  const aggregateIMC = () => {
    const categories = {
        'Bajo Peso': 0,
        'Peso Normal': 0,
        'Sobrepeso': 0,
        'Obesidad Clase I': 0,
        'Obesidad Clase II': 0,
        'Obesidad Clase III': 0,
    };

    pacientesFiltrados.forEach(p => {
        // Asumiendo que p.imc viene en formato "valor (clasificación)"
        const match = p.imc ? p.imc.match(/\((.*?)\)/) : null;
        const classification = match ? match[1] : null;

        if (classification && categories.hasOwnProperty(classification)) {
            categories[classification]++;
        }
    });

    const labels = Object.keys(categories);
    const dataValues = Object.values(categories);

    return {
        labels: labels,
        datasets: [{
            label: 'Número de Pacientes',
            data: dataValues,
            backgroundColor: [
                '#60A5FA', // Bajo Peso
                '#34D399', // Peso Normal
                '#FDE047', // Sobrepeso
                '#F97316', // Obesidad I
                '#EF4444', // Obesidad II
                '#B91C1C', // Obesidad III
            ],
            borderColor: '#fff',
            borderWidth: 1,
        }]
    };
  };

  // Opciones base para Gráficos de Pastel
  const pieOptions = (aggregation) => ({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    const total = Object.values(aggregation).reduce((sum, current) => sum + current, 0);
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    return `${label}: ${value} (${percentage}%)`;
                }
            }
        },
        title: {
            display: false,
        },
    }
  });

  // Opciones base para Gráficos de Barra
  const barOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top', },
        title: { display: false },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  // --- 1. Generación de Datos para Gráficos ---

  // Datos de Riesgo y Demográficos
  const dataNivelRiesgo = aggregateDataPie('nivelRiesgo');
  const dataGenero = aggregateDataPie('genero');
  const dataIMC = aggregateIMC();

  // Datos de Hábitos de Vida
  const dataFumador = aggregateDataPie('fumaDiario');
  const dataTomaMedicacion = aggregateDataPie('tomaMedicacionDiario', (val) => val === 'Sí' ? 'Sí' : 'No'); // Simplificamos a Sí/No
  const dataActividadFisica = aggregateDataPie('actividadFisica');
  const dataHorasSueno = aggregateDataPie('horasSueno');
  const dataEstresCronico = aggregateDataPie('estresCronico');
  
  // Datos de Salud Femenina
  const dataTumoresGinecológicos = aggregateDataPie('tumoresGinecologicos');
  const dataEnfermedadesAutoinmunes = aggregateDataPie('enfermedadesAutoinmunes');
  const dataTuvoHijos = aggregateDataPie('tuvoHijos');
  const dataCiclosMenstruales = aggregateDataPie('ciclosMenstruales');
  const dataHisterectomia = aggregateDataPie('histerectomia');
  const dataMenopausia = aggregateDataPie('menopausia');

  // --- NUEVOS GRÁFICOS DE SALUD MAMARIA ---
  const dataFamiliarCancerMama = aggregateDataPie('familiarCancerMama');
  const dataPuncionMama = aggregateDataPie('puncionMama');
  const dataMamaDensa = aggregateDataPie('mamaDensa');
  // ----------------------------------------

  // Gráfico de Colesterol (Conoce/Nivel) - Ejemplo de transformación
  const dataColesterol = aggregateDataPie('colesterol', (val) => val === 'No' ? 'No Conoce / No tiene' : 'Sí Conoce / Tiene');
  
  // Gráfico de Condiciones (Diabetes) - Transformación de Array/String
  const dataDiabetes = aggregateDataPie('medicacionCondiciones', (val) => {
    if (!val) return 'No';
    const conditions = Array.isArray(val) ? val : val.split(', ').map(c => c.trim());
    return conditions.some(c => c.toLowerCase().includes('diabetes')) ? 'Sí' : 'No';
  });
  
  // Componente Wrapper para gráficos
  const ChartWrapper = ({ title, chartType, data, options }) => (
      <div className="p-4 bg-gray-50 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">{title}</h3>
          <div className="h-64 flex items-center justify-center">
              {chartType === 'Pie' && <Pie data={data} options={options} />}
              {chartType === 'Bar' && <Bar data={data} options={options} />}
          </div>
      </div>
  );

  return (
    <div className="space-y-8">
      
      {/* Sección 1: Riesgo Cardiovascular y Demográficos */}
      <h2 className="text-2xl font-bold text-indigo-700 pt-4 border-t-2 border-indigo-200">Riesgo y Demografía</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartWrapper title="Nivel de Riesgo Cardiovascular" chartType="Pie" data={dataNivelRiesgo} options={pieOptions(dataNivelRiesgo.aggregation)} />
        <ChartWrapper title="Clasificación de Género" chartType="Pie" data={dataGenero} options={pieOptions(dataGenero.aggregation)} />
        <ChartWrapper title="Clasificación de IMC" chartType="Bar" data={dataIMC} options={barOptions} />
      </div>

      {/* Sección 2: Hábitos y Estilo de Vida */}
      <h2 className="text-2xl font-bold text-indigo-700 pt-4 border-t-2 border-indigo-200">Hábitos de Vida</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartWrapper title="Fumador Diario" chartType="Pie" data={dataFumador} options={pieOptions(dataFumador.aggregation)} />
        <ChartWrapper title="Actividad Física" chartType="Pie" data={dataActividadFisica} options={pieOptions(dataActividadFisica.aggregation)} />
        <ChartWrapper title="Horas de Sueño" chartType="Pie" data={dataHorasSueno} options={pieOptions(dataHorasSueno.aggregation)} />
        <ChartWrapper title="Estrés Crónico" chartType="Pie" data={dataEstresCronico} options={pieOptions(dataEstresCronico.aggregation)} />
        <ChartWrapper title="Uso de Medicación Diaria" chartType="Pie" data={dataTomaMedicacion} options={pieOptions(dataTomaMedicacion.aggregation)} />
        <ChartWrapper title="Conocimiento/Nivel de Colesterol" chartType="Pie" data={dataColesterol} options={pieOptions(dataColesterol.aggregation)} />
      </div>
      
      {/* Sección 3: Salud Femenina y Antecedentes */}
      <h2 className="text-2xl font-bold text-indigo-700 pt-4 border-t-2 border-indigo-200">Salud Femenina y Antecedentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- NUEVOS GRÁFICOS DE SALUD MAMARIA --- */}
        <ChartWrapper title="Familiar con Cáncer de Mama" chartType="Pie" data={dataFamiliarCancerMama} options={pieOptions(dataFamiliarCancerMama.aggregation)} />
        <ChartWrapper title="Punción Mamaria Previa" chartType="Pie" data={dataPuncionMama} options={pieOptions(dataPuncionMama.aggregation)} />
        <ChartWrapper title="Mama Densa" chartType="Pie" data={dataMamaDensa} options={pieOptions(dataMamaDensa.aggregation)} />
        {/* ---------------------------------------- */}
        
        <ChartWrapper title="Tumores Ginecológicos" chartType="Pie" data={dataTumoresGinecológicos} options={pieOptions(dataTumoresGinecológicos.aggregation)} />
        <ChartWrapper title="Enfermedades Autoinmunes" chartType="Pie" data={dataEnfermedadesAutoinmunes} options={pieOptions(dataEnfermedadesAutoinmunes.aggregation)} />
        <ChartWrapper title="Tuvo Hijos" chartType="Pie" data={dataTuvoHijos} options={pieOptions(dataTuvoHijos.aggregation)} />
        <ChartWrapper title="Histerectomía" chartType="Pie" data={dataHisterectomia} options={pieOptions(dataHisterectomia.aggregation)} />
        <ChartWrapper title="Menopausia" chartType="Pie" data={dataMenopausia} options={pieOptions(dataMenopausia.aggregation)} />
        <ChartWrapper title="Ciclos Menstruales (Regularidad)" chartType="Pie" data={dataCiclosMenstruales} options={pieOptions(dataCiclosMenstruales.aggregation)} />
        <ChartWrapper title="Pacientes con Diabetes" chartType="Pie" data={dataDiabetes} options={pieOptions(dataDiabetes.aggregation)} />
      </div>
      
    </div>
  );
}

export default EstadisticasGraficos;
