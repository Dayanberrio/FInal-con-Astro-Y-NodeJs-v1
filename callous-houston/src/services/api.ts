export const registerUser = async (username: string, password: string, email: string, depositCode: string) => {
  const response = await fetch('http://localhost:3000/api/registro/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  // Esto es importante para que se envíen las cookies
    body: JSON.stringify({ username, password, email, depositCode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al registrar el usuario');
  }

  return response.json();
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/registro/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  // Esto es importante para que se envíen las cookies
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  return response.json();
};
