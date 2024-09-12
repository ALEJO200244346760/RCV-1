// userService.js
export const getUsers = async () => {
  try {
    const response = await fetch('https://rcv-production.up.railway.app/usuario'); // Actualiza con tu URL
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Expected JSON response');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Lanzar error para que pueda ser manejado por el componente
  }
};

export const updateUserRoleAndLocation = async (userId, updates) => {
  try {
    const response = await fetch(`https://rcv-production.up.railway.app/usuario/${userId}`, { // Actualiza con tu URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Expected JSON response');
    }
  } catch (error) {
    console.error('Error updating user role and location:', error);
    throw error; // Lanzar error para que pueda ser manejado por el componente
  }
};
