const API_URL = "http://localhost:3000/api/auth";

export const signupService = async (newUser) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Error en el registro");
  }

  return response.json();
};

export const loginService = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return response.json();
};
