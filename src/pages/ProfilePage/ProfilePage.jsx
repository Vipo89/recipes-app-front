import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserInfo(storedUser);
  }, []);

  if (!userInfo) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Hola, {userInfo.username}</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default ProfilePage;
