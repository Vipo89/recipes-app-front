import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import GithubLogo from "../../images/github-logo.png";
import LinkedinLogo from "../../images/linkedin-logo.png";

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <div className="contactPage-container">
        <div className="contact-card">
          <h2 className="contact-title">Contacto</h2>

          <div className="contact-info">
            <p>Nombre: Víctor Jesús</p>
            <p>Apellidos: Parras Rumbado</p>
            <p>Email: vipoo.info@gmail.com</p>
          </div>

        
          <div className="social-info">
            <a
              href="https://github.com/Vipo89?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <img src={GithubLogo} alt="Logo de GitHub" />
            </a>

            <a
              href="https://www.linkedin.com/in/v%C3%ADctor-jes%C3%BAs-parras-rumbado-434853200/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={LinkedinLogo} alt="Logo de LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
