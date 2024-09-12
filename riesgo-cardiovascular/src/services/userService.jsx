// src/services/userService.js

export const getUsers = async () => {
  const response = await fetch('/usuario');
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return response.json();
};

export const updateUserRoleAndLocation = async (userId, updates) => {
  const response = await fetch(`/usuario/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar usuario');
  }
  return response.json();
};
