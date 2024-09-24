// src/services/userService.js

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlJPTEVfQ0FSRElPTE9HTyJdLCJhcGVsbGlkbyI6ImFkbWluIiwiZXhwIjoxNzI3MjIxMTM2LCJub21icmUiOiJhZG1pbiIsImlhdCI6MTcyNzIwMzEzNn0.5l-DFRT6wiXNAKIkqU_3SndMuug9PO0Qgg5rJmvig4E"
// Obtener el token
const getToken = () => localStorage.getItem('token');

// Manejo de errores genérico
const handleErrorResponse = async (response) => {
  const errorDetail = await response.json();
  console.error('Error:', errorDetail);
  throw new Error(JSON.stringify(errorDetail));
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await fetch('/usuario', {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};


// Actualizar rol y/o ubicación de un usuario
export const updateUserRoleAndLocation = async (userId, roleName) => {
  try {
      const response = await fetch(`https://rcv-production.up.railway.app/administracion/users/${userId}/roles`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ rol: roleName }) // o { roleName: roleName }, dependiendo de tu elección anterior
      });

      if (!response.ok) {
          const errorData = await response.json(); // Captura el mensaje de error en formato JSON
          throw new Error(errorData.error || 'Error al actualizar el usuario');
      }
      
      return await response.json();
  } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
  }
};


// Eliminar un usuario
export const deleteUser = async (userId) => {
  const response = await fetch(`/administracion/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Obtener todas las ubicaciones
export const getLocations = async () => {
  const response = await fetch('/ubicaciones', {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Agregar una nueva ubicación
export const addLocation = async (locationName) => {
  if (!locationName || typeof locationName !== 'string') {
    throw new Error('El nombre de la ubicación debe ser un string válido');
  }

  const response = await fetch('/ubicaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ nombre: locationName }), // Cambié "name" a "nombre"
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Actualizar una ubicación existente
export const updateLocation = async (locationId, locationName) => {
  if (!locationName || typeof locationName !== 'string') {
    throw new Error('El nombre de la ubicación debe ser un string válido');
  }

  const response = await fetch(`/ubicaciones/${locationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ nombre: locationName }), // Cambié "name" a "nombre"
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Eliminar una ubicación
export const deleteLocation = async (locationId) => {
  const response = await fetch(`/ubicaciones/${locationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  // No intentes convertir la respuesta a JSON para DELETE
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  // No es necesario hacer return aquí, ya que no hay cuerpo en la respuesta
};

// Obtener todos los roles
export const getRoles = async () => {
  const response = await fetch('/administracion/roles', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Agregar un nuevo rol
export const addRole = async (roleName) => {
  if (!roleName || typeof roleName !== 'string') {
    throw new Error('El nombre del rol debe ser un string válido');
  }

  const response = await fetch('/administracion/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ nombre: roleName }),
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Actualizar un rol existente
export const updateRole = async (roleId, roleName) => {
  if (!roleName || typeof roleName !== 'string') {
    throw new Error('El nombre del rol debe ser un string válido');
  }

  const response = await fetch(`/administracion/roles/${roleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ nombre: roleName }), // Cambié "name" a "nombre"
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
};

// Eliminar un rol
export const deleteRole = async (roleId) => {
  const response = await fetch(`/administracion/roles/${roleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }
  
  // Si la respuesta es 204, no se devuelve contenido
  if (response.status === 204) {
    return; // No se necesita devolver nada
  }
  
  return response.json(); // Para otros casos que retornen datos
};

