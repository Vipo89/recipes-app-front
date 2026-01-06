import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserInfo(storedUser);
    console.log(storedUser);
    
  }, []);

  if (!userInfo) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div>
        <div>
          <h2 className="profile-userName">{userInfo.name} {userInfo.lastName}</h2>
          <hr />
          <h3>Descripción:</h3>
          <p>{userInfo.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
