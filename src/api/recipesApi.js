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

  const response = await fetch(
    `http://localhost:3000/api/recipes/edit/${recipeId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newRecipe),
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo editar la receta");
  }

  const data = await response.json();
  return data.data;
};

export const userCreateRecipe = async (newRecipe) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/recipes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(newRecipe),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la receta");
  }

  const data = await response.json();
  console.log(data);

  return data.data;
};
export const getPaginatedRecipes = async (page) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/recipes/paginated?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  if (!response.ok) {

    throw new Error("No se pudieron obtener las receta");
  }

  const data = await response.json();
  console.log(data);

  return {recipes:data.data,
    totalRecipes:data.totalRecipes
  };
};

export const searchRecipesByName = async (name, page) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/recipes/search?name=${name}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener las recetas");
  }

  const data = await response.json();
  return {
    recipes: data.data,
    total: data.totalRecipes,
  };
};

export const getUserRecipesApi = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/recipes/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las recetas");
  }

  const data = await response.json();
  return data.data;
};


