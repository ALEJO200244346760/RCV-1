// src/services/userService.js

const API_BASE_URL = 'https://rcv-production.up.railway.app'; // Actualiza con tu URL base de producción

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario`);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    return response.json();
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error;
  }
};

export const updateUserRoleAndLocation = async (userId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${userId}`, {
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
  } catch (error) {
    console.error('Error en updateUserRoleAndLocation:', error);
    throw error;
  }
};
