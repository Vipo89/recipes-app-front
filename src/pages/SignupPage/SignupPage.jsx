  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import CookingLogo from "../../images/CookingLogo.png";
  import { signupService } from "../../api/authApi";

  const SignupPage = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({});
    const [repeatPassword, setRepeatPassword] = useState("");

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const newUserHandler = (propName, propValue) => {
      setNewUser({
        ...newUser,
        [propName]: propValue,
      });
    };

    const goToLogin = () => {
      navigate("/login");
    };

    const handleSignup = async (e) => {
      e.preventDefault();
      if (newUser.password !== repeatPassword) {
        setErrorMessage("Las contraseñas no coinciden.");
        setShowError(true);
        return;
      }
      try {
        const data = await signupService(newUser);
        console.log("El usuario creado:", data);
        goToLogin();
      } catch (error) {
        setErrorMessage("No se pudo crear la cuenta. Revisa los datos.");
        setShowError(true);
      }
    };

    return (
      <div className="signupContainer">
        <div className="signUpForm">
          {showError && (
            <div className="errorModal">
              <p>{errorMessage}</p>
              <button
                className="closeModalBtn"
                onClick={() => setShowError(false)}
              >
                Cerrar
              </button>
            </div>
          )}

          <img
            src={CookingLogo}
            alt="Logo de la empresa"
            className="signupLogo"
          />
          <h1 className="page-name">FuegoLento</h1>

          <form className="signUpInputs" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => newUserHandler("username", e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => newUserHandler("email", e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => newUserHandler("password", e.target.value)}
            />

            <input
              type="password"
              placeholder="Repite la contraseña"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <button type="submit" className="btnCreateAccount">
              Crear cuenta
            </button>
          </form>
        </div>

        <button onClick={goToLogin} className="btnToLogin">
          ¿Ya tienes cuenta?
        </button>
      </div>
    );
  };

  export default SignupPage;
