import { Link } from "react-router-dom";
import "../../styles/Navbar.scss";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {token ? (
        <nav className="navbarContainer">
          <div className="navbarSection navbarLeft">
            <Link to="/home" className="navbarLink">Home</Link>
          </div>

          <div className="navbarSection navbarCenter">
            <Link to="/create" className="navbarLink">Crear receta</Link>
          </div>

          <div className="navbarSection navbarRight">
            <Link to="/profile" className="navbarUsername">{user.username}</Link>
            <Link to="/profile" className="navbarEmail">{user.email}</Link>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
