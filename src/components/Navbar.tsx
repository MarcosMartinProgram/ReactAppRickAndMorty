import { Link } from "react-router-dom";
import style from 'styled-components';
import "./Navbar.css";
import logo1 from '../assets/public/fondo10.png';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo1} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/personajes">Personajes</Link>
        </li>
        <li>
          <Link to="/ubicaciones">Ubicaciones</Link>
        </li>
        <li>
          <Link to="/episodios">Episodios</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;