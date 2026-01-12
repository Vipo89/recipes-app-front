import React from "react";
import WatchIcon from "../../images/Clock-Icon.png";
import { useNavigate } from "react-router-dom";

const RecipeComponent = ({ props: recipe }) => {

const navigate = useNavigate()

  const recipeClicked = () => {
    console.log(`Vamos a la receta con id: ${recipe._id}`);
    navigate(`/recipe/${recipe._id}`)
  }
  return (
    <div className="recipe-card" onClick={recipeClicked}>
      <div className="recipe-left">
        <img
          className="recipe-image"
          src={recipe.image}
          alt="Foto de la receta"
        />
      </div>

      <div className="recipe-right">
        <div className="recipe-title-container">
          <h3 className="recipe-title">{recipe.title}</h3>
        </div>

        <div className="recipe-info">
          <p className="recipe-description">{recipe.description}</p>

          <div className="recipe-time">
            <img
              className="recipe-watch-icon"
              src={WatchIcon}
              alt="Icono de un reloj"
            />
            <p>{recipe.time}</p>
          </div>

          <p className="recipe-servings">Raciones: {recipe.servings}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeComponent;
