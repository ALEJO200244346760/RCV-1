import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, updateUserRoleAndLocation } from '../services/userService';

const AdminPanel = () => {
  const { roles } = useAuth(); // Obtener roles del contexto
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Roles y ubicaciones disponibles
  const rolesDisponibles = ['CARDIOLOGO', 'ENFERMERO'];
  const ubicacionesDisponibles = ['DEM NORTE', 'DEM CENTRO', 'DEM OESTE', 'DAPS', 'HPA', 'HU'];

  useEffect(() => {
    // Solo cargar usuarios si el usuario tiene el rol 'ROLE_CARDIOLOGO'
    if (roles.includes('ROLE_CARDIOLOGO')) {
      cargarUsuarios();
    } else {
      console.error('Acceso denegado: Rol insuficiente.');
    }
  }, [roles]);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsers(); // Obtener lista de usuarios desde la API
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const handleRoleChange = async (usuarioId, nuevoRol) => {
    try {
      await updateUserRoleAndLocation(usuarioId, { rol: nuevoRol });
      cargarUsuarios(); // Volver a cargar la lista de usuarios
    } catch (error) {
      console.error('Error actualizando rol:', error);
    }
  };

  const handleLocationChange = async (usuarioId, nuevaUbicacion) => {
    try {
      await updateUserRoleAndLocation(usuarioId, { ubicacion: nuevaUbicacion });
      cargarUsuarios();
    } catch (error) {
      console.error('Error actualizando ubicación:', error);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="admin-panel">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="border px-4 py-2">{usuario.nombre} {usuario.apellido}</td>
              <td className="border px-4 py-2">{usuario.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={usuario.rol?.nombre || ''}
                  onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                >
                  <option value="">Seleccionar Rol</option>
                  {rolesDisponibles.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <select
                  value={usuario.ubicacion?.nombre || ''}
                  onChange={(e) => handleLocationChange(usuario.id, e.target.value)}
                >
                  <option value="">Seleccionar Ubicación</option>
                  {ubicacionesDisponibles.map((ubicacion) => (
                    <option key={ubicacion} value={ubicacion}>
                      {ubicacion}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
