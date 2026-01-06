import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <nav className="navbar">
          <Link to="/home" className="navItem">Home</Link>
          <Link to="/create" className="navItem">Crear receta</Link>
          <Link to="/profile" className="navItem">Perfil</Link>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
