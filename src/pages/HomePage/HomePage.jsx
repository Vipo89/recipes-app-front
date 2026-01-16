import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getPaginatedRecipes, searchRecipesByName } from "../../api/recipesApi";
import RecipeComponent from "../../components/RecipeComponent/RecipeComponent";

const HomePage = () => {
  const [homeRecipes, setHomeRecipes] = useState([]);
  const [recipesPage, setRecipesPage] = useState(1);
  const [recipeToFind, setRecipeToFind] = useState("");

  const getHomeRecipes = async () => {
    try {
      const data = await getPaginatedRecipes(recipesPage);
      setHomeRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchRecipesByName = async () => {
    try {
      if (recipeToFind.length >= 4) {
        const data = await searchRecipesByName(recipeToFind, recipesPage);
        setHomeRecipes(data.recipes);
      } else {
        getHomeRecipes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchRecipesByName();
  }, [recipeToFind]);

  useEffect(() => {
    if (recipeToFind.length >= 4) {
      getSearchRecipesByName();
    } else {
      getHomeRecipes();
    }
  }, [recipesPage]);

  return (
    <>
      <Navbar />

      <div className="homePage-Container">
        <h3 className="recipe-main">Recetas:</h3>

        <div>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={(e) => setRecipeToFind(e.target.value)}
          />
        </div>

        {homeRecipes.length === 0 ? (
          <p className="no-recipes">No hay recetas</p>
        ) : (
          homeRecipes.map((recipe, idx) => (
            <RecipeComponent key={idx} props={recipe} />
          ))
        )}

        <div className="pagination-simple">
          <button className="back-pag"
            onClick={() => {
              if (recipesPage > 1) {
                setRecipesPage(recipesPage - 1);
              }
            }}
          >
            Anterior
          </button>

          <span className="page-number">Página {recipesPage}</span>

          <button className="front-page" onClick={() => setRecipesPage(recipesPage + 1)}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
