import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { editRecipe, getRecipeById } from "../../api/recipesApi";
import { getUserById } from "../../api/userApi";

const RecipePage = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recipeCreator, setRecipeCreator] = useState(null);
  const navigate = useNavigate();

  const [editedRecipe, setEditedRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    image: "",
  });

  const editRecipeHandler = (propName, propValue) => {
    setEditedRecipe({
      ...editedRecipe,
      [propName]: propValue,
    });
  };

  const sendEditedRecipe = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = await editRecipe(recipeId, editedRecipe);
      setRecipe(updatedRecipe);
      setIsEditing(false);
      console.log("Receta actualizada:", updatedRecipe);
    } catch (error) {
      console.log("Error al editar receta:", error);
    }
  };

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const getRecipe = async () => {
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      console.log("Error al obtener la receta", error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    if (recipe?.createdBy) {
      getUserCreator();
    }
  }, [recipe]);
  if (!recipe) return <p>Cargando receta...</p>;

  const getUserCreator = async () => {
    try {
      const creator = await getUserById(recipe.createdBy);
      setRecipeCreator(creator);
    } catch (error) {
      console.log("Error al obtener al dueño de la receta", error);
    }
  };

const goToCreator = () => {

  console.log(`Voy al creador con el id ${recipeCreator._id}`);
  
  navigate(`/profile/${recipeCreator._id}`)
}

  console.log(recipeCreator);

  return (
    <>
      <Navbar />

      <div className="recipeMainContainer">
        <div className="recipeLeftContainer">
          <div className="recipe-image">
            <img src={recipe.image} alt="Foto del plato" />
          </div>

          <div className="recipe-ingredients-container">
            <h3>Ingredientes:</h3>
            <div className="recipe-ingredients">
              {recipe.ingredients?.map((ingredient, idx) => (
                <p key={idx}>{ingredient}</p>
              ))}
            </div>
          </div>

          <div className="recipe-servings-container">
            <p className="single-recipe-servings">{recipe.servings} personas</p>
          </div>
        </div>

        <div className="recipeRightContainer">
          <h2>{recipe.title}</h2>

          {loggedUser?._id === recipe.createdBy && (
            <button
              className="editRecipeButton"
              onClick={() => {
                setEditedRecipe({
                  title: recipe.title,
                  description: recipe.description,
                  ingredients: recipe.ingredients,
                  steps: recipe.steps,
                  image: recipe.image,
                });
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Cerrar edición" : "Editar receta"}
            </button>
          )}

          {isEditing && (
            <form className="editRecipeForm" onSubmit={sendEditedRecipe}>
              <label>Título</label>
              <input
                type="text"
                value={editedRecipe.title}
                onChange={(e) => editRecipeHandler("title", e.target.value)}
              />

              <label>Descripción</label>
              <textarea
                value={editedRecipe.description}
                onChange={(e) =>
                  editRecipeHandler("description", e.target.value)
                }
              />

              <label>Ingredientes (uno por línea)</label>
              <textarea
                value={editedRecipe.ingredients.join("\n")}
                onChange={(e) =>
                  editRecipeHandler("ingredients", e.target.value.split("\n"))
                }
              />

              <label>Pasos (uno por línea)</label>
              <textarea
                value={editedRecipe.steps.join("\n")}
                onChange={(e) =>
                  editRecipeHandler("steps", e.target.value.split("\n"))
                }
              />

              <label>Imagen (URL)</label>
              <input
                type="text"
                value={editedRecipe.image}
                onChange={(e) => editRecipeHandler("image", e.target.value)}
              />

              <button type="submit" className="saveRecipeButton">
                Guardar cambios
              </button>
            </form>
          )}

          <h3>Creado por:  <label className="creator-input" onClick={goToCreator}>{recipeCreator?.name} {recipeCreator?.lastName} </label></h3>

          <div className="recipe-steps">
            {recipe.steps?.map((step, idx) => (
              <div key={idx}>
                <h3>
                  {idx + 1}: {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
