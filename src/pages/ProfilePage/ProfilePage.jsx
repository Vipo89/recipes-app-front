import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/ProfilePage.scss";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";

const ProfilePage = () => {
  
  const [userInfo, setUserInfo] = useState(null);

const { id } = useParams();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = await getUserById(id);
      console.log(user);
      
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
          <h2 className="profile-name">
            {userInfo.name} {userInfo.lastName}
          </h2>

          <hr />

          <div className="profile-section">
            <h3 className="description-section">Descripción</h3>
            <p className="profile-description">
              {userInfo.description || "Este usuario aún no tiene descripción."}
            </p>
          </div>

          <div className="profile-section">
            <h3 className="recipes-section">Recetas</h3>
            <p className="profile-recipes-placeholder">
              (Aquí irán las recetas del usuario)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
