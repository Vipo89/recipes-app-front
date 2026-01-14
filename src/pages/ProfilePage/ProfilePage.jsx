import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/ProfilePage.scss";
import { useParams } from "react-router-dom";
import { editUserById, getUserById, getUserRecipesApi } from "../../api/userApi";
import RecipeComponent from "../../components/RecipeComponent/RecipeComponent";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [userRecipes, setUserRecipes] = useState([]);

  const [editedUser, setEditedUser] = useState({
    name: "",
    lastName: "",
    description: "",
  });

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const getUserRecipes = async () => {
    try {
      const resUserRecipes = await getUserRecipesApi();
      setUserRecipes(resUserRecipes);
    } catch (error) {
      console.log("Error al conseguir las recetas", error);
    }
  };

  useEffect(() => {
    getUserRecipes();
  }, []);

  const editedUserHandle = (propName, propValue) => {
    setEditedUser({
      ...editedUser,
      [propName]: propValue,
    });
  };

  const acceptUserChanged = async () => {
    try {

      const updatedUser = await editUserById(id, editedUser);

      setUserInfo(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.log("Error al actualizar:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!userInfo) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          {loggedUser?._id === userInfo._id && !isEditing && (
            <button
              className="editProfileButton"
              onClick={() => {
                setEditedUser({
                  name: userInfo.name,
                  lastName: userInfo.lastName,
                  description: userInfo.description || "",
                });
                setIsEditing(true);
              }}
            >
              Editar perfil
            </button>
          )}

          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => editedUserHandle("name", e.target.value)}
                placeholder="Nombre"
              />

              <input
                type="text"
                value={editedUser.lastName}
                onChange={(e) => editedUserHandle("lastName", e.target.value)}
                placeholder="Apellidos"
              />

              <textarea
                maxLength={300}
                value={editedUser.description}
                onChange={(e) =>
                  editedUserHandle("description", e.target.value)
                }
                placeholder="Descripción"
              />

              <p className="char-counter">
                {editedUser.description.length}/300
              </p>

              <button className="saveButton" onClick={acceptUserChanged}>
                Guardar cambios
              </button>

              <button
                className="cancelButton"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <h2 className="profile-name">
                {userInfo.name} {userInfo.lastName}
              </h2>

              <hr />

              <div className="profile-section">
                <h3 className="description-section">Descripción</h3>
                <p className="profile-description">
                  {userInfo.description ||
                    "Este usuario aún no tiene descripción."}
                </p>
              </div>

              
              <div className="profile-section recipes-grid">
                <h3 className="recipes-section">Recetas</h3>

                {userRecipes.map((recipe) => (
                  <RecipeComponent key={recipe._id} props={recipe} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
