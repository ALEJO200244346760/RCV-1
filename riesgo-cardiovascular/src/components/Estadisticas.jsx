// Estadisticas.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import EstadisticasGraficos from './EstadisticasGraficos';
import { obtenerColorRiesgo } from './ConstFormulario';

const apiBaseURL = 'https://rcv-production.up.railway.app/api/pacientes';

function Estadisticas() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarGraficos, setMostrarGraficos] = useState(false);

  const [filtros, setFiltros] = useState({
    edad: '',
    imc: '',
    conoceColesterol: '',
    nivelColesterol: '',
    tensionSistolica: '',
    fumador: '',
    tomaMedicacion: '',
    nivelRiesgo: '',
    actividadFisica: '',
    horasSueno: '',
    estresCronico: '',
    tumoresGinecologicos: '',
    enfermedadesAutoinmunes: '',
    tuvoHijos: '',
    ciclosMenstruales: '',
    histerectomia: '',
    menopausia: '',
  });

  useEffect(() => {
    axios.get(apiBaseURL)
      .then(resp => {
        setPacientes(resp.data);
      })
      .catch(err => {
        console.error("Error al cargar pacientes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const toggleGraficos = () => {
    setMostrarGraficos(prev => !prev);
  };

  const obtenerNivelColesterol = (valor) => {
    if (valor < 154) return 4;
    if (valor >= 155 && valor <= 192) return 5;
    if (valor >= 193 && valor <= 231) return 6;
    if (valor >= 232 && valor <= 269) return 7;
    return 8;
  };

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(p => {
      if (filtros.edad) {
        if (filtros.edad.endsWith('+')) {
          const min = parseInt(filtros.edad, 10);
          if (isNaN(min) || p.edad < min) return false;
        } else {
          const [min, max] = filtros.edad.split('-').map(n => parseInt(n, 10));
          if (!isNaN(min) && !isNaN(max)) {
            if (!(p.edad >= min && p.edad <= max)) return false;
          }
        }
      }

      if (filtros.imc) {
        if (!p.imc || !p.imc.includes(filtros.imc)) return false;
      }

      if (filtros.conoceColesterol) {
        const conoce = filtros.conoceColesterol === 'sí';
        const tieneCol = p.colesterol != null && p.colesterol !== '' && p.colesterol !== 'No' && !isNaN(p.colesterol);
        if (conoce && !tieneCol) return false;
        if (!conoce && tieneCol) return false;
      }

      if (filtros.nivelColesterol && p.colesterol != null && p.colesterol !== 'No' && !isNaN(p.colesterol)) {
        const nivelPac = obtenerNivelColesterol(Number(p.colesterol));
        if (nivelPac.toString() !== filtros.nivelColesterol) return false;
      }

      if (filtros.tensionSistolica) {
        const tensionFiltro = parseInt(filtros.tensionSistolica, 10);
        const tensionPaciente = parseInt(p.tensionSistolica, 10);
        if (isNaN(tensionFiltro) || isNaN(tensionPaciente) || tensionPaciente !== tensionFiltro) return false;
      }

      if (filtros.fumador && p.fumaDiario !== filtros.fumador) return false;
      if (filtros.tomaMedicacion && p.tomaMedicacionDiario !== filtros.tomaMedicacion) return false;
      if (filtros.nivelRiesgo && p.nivelRiesgo !== filtros.nivelRiesgo) return false;
      if (filtros.actividadFisica && p.actividadFisica !== filtros.actividadFisica) return false;
      if (filtros.horasSueno && p.horasSueno !== filtros.horasSueno) return false;
      if (filtros.estresCronico && p.estresCronico !== filtros.estresCronico) return false;
      if (filtros.tumoresGinecologicos && p.tumoresGinecologicos !== filtros.tumoresGinecologicos) return false;
      if (filtros.enfermedadesAutoinmunes && p.enfermedadesAutoinmunes !== filtros.enfermedadesAutoinmunes) return false;
      if (filtros.tuvoHijos && p.tuvoHijos !== filtros.tuvoHijos) return false;
      if (filtros.ciclosMenstruales && p.ciclosMenstruales !== filtros.ciclosMenstruales) return false;
      if (filtros.histerectomia && p.histerectomia !== filtros.histerectomia) return false;
      if (filtros.menopausia && p.menopausia !== filtros.menopausia) return false;

      return true;
    });
  }, [pacientes, filtros]);

  if (loading) {
    return <p>Cargando pacientes...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Estadísticas (Formulario Mujer)</h1>

      {/* --- SECCIÓN DE FILTROS COMPLETA --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 border rounded-md bg-gray-50">
        
        <div>
          <label className="text-sm font-medium">Edad</label>
          <select name="edad" value={filtros.edad} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="0-40">0–40</option>
            <option value="41-50">41–50</option>
            <option value="51-60">51–60</option>
            <option value="61-70">61–70</option>
            <option value="71+">71+</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">IMC</label>
          <select name="imc" value={filtros.imc} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Bajo peso">Bajo peso</option>
            <option value="Normopeso">Normopeso</option>
            <option value="Sobrepeso">Sobrepeso</option>
            <option value="Obesidad Grado I">Obesidad Grado I</option>
            <option value="Obesidad Grado II">Obesidad Grado II</option>
            <option value="Obesidad Grado III">Obesidad Grado III</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Conoce colesterol?</label>
          <select name="conoceColesterol" value={filtros.conoceColesterol} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        {filtros.conoceColesterol === 'sí' && (
          <div>
            <label className="text-sm font-medium">Nivel de colesterol</label>
            <select name="nivelColesterol" value={filtros.nivelColesterol} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
              <option value="">Todos</option>
              <option value="4">Muy Bajo</option>
              <option value="5">Bajo</option>
              <option value="6">Moderado</option>
              <option value="7">Alto</option>
              <option value="8">Muy Alto</option>
            </select>
          </div>
        )}

        <div>
          <label className="text-sm font-medium">Tensión Sistólica</label>
          <input type="number" name="tensionSistolica" value={filtros.tensionSistolica} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1" placeholder="ej. 120"/>
        </div>

        <div>
          <label className="text-sm font-medium">Fumador</label>
          <select name="fumador" value={filtros.fumador} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Toma medicación diaria</label>
          <select name="tomaMedicacion" value={filtros.tomaMedicacion} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Nivel de riesgo</label>
          <select name="nivelRiesgo" value={filtros.nivelRiesgo} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="<10% Bajo">&lt;10% Bajo</option>
            <option value=">10% <20% Moderado">&gt;10% &lt;20% Moderado</option>
            <option value=">20% <30% Alto">&gt;20% &lt;30% Alto</option>
            <option value=">30% <40% Muy Alto">&gt;30% &lt;40% Muy Alto</option>
            <option value=">40% Crítico">&gt;40% Crítico</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Actividad física ≥ 150 min/sem</label>
          <select name="actividadFisica" value={filtros.actividadFisica} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Duerme +7h</label>
          <select name="horasSueno" value={filtros.horasSueno} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Estrés crónico</label>
          <select name="estresCronico" value={filtros.estresCronico} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tumores ginecológicos</label>
          <select name="tumoresGinecologicos" value={filtros.tumoresGinecologicos} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Enfermedades autoinmunes</label>
          <select name="enfermedadesAutoinmunes" value={filtros.enfermedadesAutoinmunes} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tuvo hijos</label>
          <select name="tuvoHijos" value={filtros.tuvoHijos} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Ciclos menstruales</label>
          <select name="ciclosMenstruales" value={filtros.ciclosMenstruales} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Histerectomía</label>
          <select name="histerectomia" value={filtros.histerectomia} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Menopausia</label>
          <select name="menopausia" value={filtros.menopausia} onChange={handleFiltroChange} className="block w-full border rounded p-1 mt-1">
            <option value="">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      
      <button onClick={toggleGraficos} className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        {mostrarGraficos ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
      </button>

      {mostrarGraficos && (
        <div className="mb-6 p-4 border rounded-md">
          <EstadisticasGraficos pacientes={pacientesFiltrados} />
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Total de pacientes filtrados: {pacientesFiltrados.length}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pacientesFiltrados.map((p, idx) => (
          <div key={p.id ?? idx} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="font-bold text-lg border-b pb-2 mb-2">Paciente DNI: {p.dni}</h3>
            <div><strong>Teléfono:</strong> {p.telefono}</div>
            <div><strong>Fecha Nacimiento:</strong> {p.fechaNacimiento}</div>
            <div><strong>Edad:</strong> {p.edad}</div>
            <div><strong>Tensión:</strong> {p.tensionSistolica}/{p.tensionDiastolica}</div>
            <div><strong>IMC:</strong> {p.imc}</div>
            <div><strong>Colesterol:</strong> {p.colesterol !== 'No' ? p.colesterol : 'No conoce'}</div>
            <div><strong>Fuma diario:</strong> {p.fumaDiario}</div>
            <div><strong>Toma medicación:</strong> {p.tomaMedicacionDiario} {p.medicacionCondiciones?.length > 0 ? `(${p.medicacionCondiciones.join(', ')})` : ''}</div>
            <div>
              <strong>Riesgo:</strong>{' '}
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white ${obtenerColorRiesgo(p.nivelRiesgo)}`}>
                {p.nivelRiesgo}
              </span>
            </div>
            
            <hr className="my-2"/>
            <p className="font-semibold text-sm text-gray-600">Hábitos:</p>
            <div><strong>Actividad física:</strong> {p.actividadFisica}</div>
            <div><strong>Sueño:</strong> {p.horasSueno}</div>
            <div><strong>Estrés crónico:</strong> {p.estresCronico} {p.estresCronico === 'Sí' ? `(${p.estresTipo})` : ''}</div>
            
            <hr className="my-2"/>
            <p className="font-semibold text-sm text-gray-600">Salud Femenina:</p>
            <div><strong>Tumores ginecológicos:</strong> {p.tumoresGinecologicos} {p.tumoresTipo?.length > 0 ? `(${p.tumoresTipo.join(', ')})` : ''}</div>
            <div><strong>Enf. autoinmunes:</strong> {p.enfermedadesAutoinmunes} {p.autoinmunesTipo?.length > 0 ? `(${p.autoinmunesTipo.join(', ')})` : ''}</div>
            <div><strong>Tuvo hijos:</strong> {p.tuvoHijos}
                {p.tuvoHijos === 'Sí' ? ` (${p.cantidadHijos} hijos, Complicaciones: ${p.complicacionesEmbarazo})` : ` (${p.motivoNoHijos})`}
            </div>
            <div><strong>Ciclos menstruales:</strong> {p.ciclosMenstruales}</div>
            <div><strong>Histerectomía:</strong> {p.histerectomia}</div>
            <div><strong>Menopausia:</strong> {p.menopausia} {p.edadMenopausia ? ` (Edad: ${p.edadMenopausia})` : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estadisticas;