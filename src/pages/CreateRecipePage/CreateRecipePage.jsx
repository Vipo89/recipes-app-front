import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { userCreateRecipe } from "../../api/recipesApi";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    image: "",
    cookingTime: "",
    servings: "",
    ingredients: [""],
    steps: [""],
  });

  const navigate = useNavigate()

  const newRecipeHandler = (propName, propValue) => {
    setNewRecipe({ ...newRecipe, [propName]: propValue });
  };

  const addIngredient = () => {
    newRecipeHandler("ingredients", [...newRecipe.ingredients, ""]);
  };

  const updateIngredient = (index, value) => {
    const updated = [...newRecipe.ingredients];
    updated[index] = value;
    newRecipeHandler("ingredients", updated);
  };

const removeIngredient = (index) => {
  const updatedIngredients = [...newRecipe.ingredients];
  updatedIngredients.splice(index, 1);
  newRecipeHandler("ingredients", updatedIngredients);
};


  const addStep = () => {
    newRecipeHandler("steps", [...newRecipe.steps, ""]);
  };

  const updateStep = (index, value) => {
    const updated = [...newRecipe.steps];
    updated[index] = value;
    newRecipeHandler("steps", updated);
  };

const removeStep = (index) => {
  const updatedSteps = [...newRecipe.steps];
  updatedSteps.splice(index, 1);
  newRecipeHandler("steps", updatedSteps);
};


  const sendNewRecipe = (e) => {
    e.preventDefault();
    const res = userCreateRecipe(newRecipe);
    if (!res === "Sucess") {
        console.log("No, algo ha fallado");
    }
    else navigate("/home")
  };

  return (
    <>
      <Navbar />

      <div className="create-recipe-main-container">
        <h2 className="create-recipe-title">Crea una nueva receta</h2>

        <form className="create-recipe-form" onSubmit={sendNewRecipe}>

          <label className="create-recipe-label">
            Título
            <input
              className="create-recipe-input"
              type="text"
              value={newRecipe.title}
              onChange={(e) => newRecipeHandler("title", e.target.value)}
              required
            />
          </label>

          <label className="create-recipe-label">
            Descripción
            <input
              className="create-recipe-input"
              type="text"
              value={newRecipe.description}
              onChange={(e) => newRecipeHandler("description", e.target.value)}
              required
            />
          </label>

          <label className="create-recipe-label">
            Image URL
            <input
              className="create-recipe-input"
              type="text"
              value={newRecipe.image}
              onChange={(e) => newRecipeHandler("image", e.target.value)}
              required
            />
          </label>

          <label className="create-recipe-label">
            Tiempo de elaboración (minutos)
            <input
              className="create-recipe-input"
              type="number"
              value={newRecipe.time || ""}
              onChange={(e) => newRecipeHandler("time", e.target.value)}
              required
            />
          </label>

          <label className="create-recipe-label">
            Raciones
            <input
              className="create-recipe-input"
              type="number"
              value={newRecipe.servings || ""}
              onChange={(e) => newRecipeHandler("servings", e.target.value)}
              required
            />
          </label>

          <div className="create-recipe-section">
            <h3 className="create-recipe-subtitle">Ingredientes</h3>

            {newRecipe.ingredients.map((ingredient, index) => (
              <div className="create-recipe-dynamic-row" key={index}>
                <input
                  className="create-recipe-input"
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  required
                />

                {newRecipe.ingredients.length > 1 && (
                  <button
                    className="create-recipe-remove-button"
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))}

            <button
              className="create-recipe-add-button"
              type="button"
              onClick={addIngredient}
            >
              Añadir ingrediente
            </button>
          </div>

          <div className="create-recipe-section">
            <h3 className="create-recipe-subtitle">Pasos</h3>

            {newRecipe.steps.map((step, index) => (
              <div className="create-recipe-dynamic-row" key={index}>
                <input
                  className="create-recipe-input"
                  type="text"
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  required
                />

                {newRecipe.steps.length > 1 && (
                  <button
                    className="create-recipe-remove-button"
                    type="button"
                    onClick={() => removeStep(index)}
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))}

            <button
              className="create-recipe-add-button"
              type="button"
              onClick={addStep}
            >
              Añadir paso
            </button>
          </div>

          <button className="create-recipe-submit-button" type="submit">
            Crear receta
          </button>

        </form>
      </div>
    </>
  );
};

export default CreateRecipePage;
