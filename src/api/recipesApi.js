export const getRecipeById = async (recipeId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  if (!response.ok) {
    throw new Error("No se pudo obtener el usuario");
  }
  const data = await response.json();
  return data.data;
};


export const editRecipe = async (recipeId, newRecipe) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/recipes/edit/${recipeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(newRecipe)
  });

  if (!response.ok) {
    throw new Error("No se pudo editar la receta");
  }

  const data = await response.json();
  return data.data;
};
