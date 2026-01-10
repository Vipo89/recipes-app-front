export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, 
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  const data = await response.json();
  return data.data;
};
