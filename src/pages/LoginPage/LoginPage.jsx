import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CookingLogo from "../../images/CookingLogo.png";
import { loginService } from "../../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUserHandler = (propName, propValue) => {
    setLoginUser({
      ...loginUser,
      [propName]: propValue,
    });
  };

  const goToSignup = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService(loginUser);

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);

      navigate("/profile");
    } catch (error) {
      setErrorMessage("Credenciales incorrectas.");
      setShowError(true);
    }
  };

  return (
    <div className="loginContainer">
      {showError && (
        <div className="errorModal">
          <p>{errorMessage}</p>
          <button className="closeModalBtn" onClick={() => setShowError(false)}>
            Cerrar
          </button>
        </div>
      )}

      <div className="loginForm">
        <img src={CookingLogo} alt="Logo" className="signupLogo" />

        <form className="loginInputs" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => loginUserHandler("username", e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => loginUserHandler("password", e.target.value)}
          />

          <button type="submit" className="btnLoginUser">
            Iniciar sesión
          </button>
        </form>
      </div>

      <button onClick={goToSignup} className="btnToSignup">
        ¿No tienes cuenta?
      </button>
    </div>
  );
};

export default LoginPage;
