import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import menuHamburguer from "../../assets/menu-hamburguer.svg";

import logo from '../../assets/logo.png';

function Menu() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuAberto(false); 
  };

  return (
    <div className="menu">
      <div className="logo">
        <img src={logo} alt="Logo do Projeto" />
        <h1>Organize-It</h1>
      </div>
      <div className={`options ${menuAberto ? 'open' : ''}`}>
        <button className="nav-button" onClick={() => handleNavigation("/")}>
          Home
        </button>
        <button className="nav-button" onClick={() => handleNavigation("/about")}>
          About
        </button>
        <button className="nav-button" onClick={() => handleNavigation("/Contact")}>
          Contact
        </button>
        <img
          src={menuHamburguer}
          alt="Ícone de Opções"
          className="hamburguer-icon"
          onClick={toggleMenu}
        />
        <div className="dropdown-menu">
          <button className="nav-button" onClick={() => handleNavigation("/")}>
            Home
          </button>
          <button className="nav-button" onClick={() => handleNavigation("/about")}>
            About
          </button>
          <button className="nav-button" onClick={() => handleNavigation("/Contact")}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
