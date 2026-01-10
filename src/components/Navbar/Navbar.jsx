import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.scss";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {token ? (
        <nav className="navbarContainer">
          <div className="navbarSection navbarLeft">
            <Link to="/home" className="navbarLink">
              Home
            </Link>
          </div>

          <div className="navbarSection navbarCenter">
            <Link to="/create" className="navbarLink">
              Crear receta
            </Link>
          </div>

          <div className="navbarSection navbarRight">
            <Link to={`/profile/${user._id}`} className="navbarUsername">
              {user.username}
            </Link>
            <Link to={`/profile/${user._id}`} className="navbarEmail">
              {user.email}
            </Link>
          </div>
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
