import React from "react";
import Menu from '../../components/NavBar/Navbar';
import Background from '../../components/particles/particles';
import GitHubIcon from '../../assets/github.svg'; 
import '../../styles/contact.css';

import Daniel from '../../assets/Daniel.svg';
import Hiago from '../../assets/Hiago.svg';
import Lucas from '../../assets/Lucas.svg';
import Anderson from '../../assets/Anderson.svg';



function Contact() {
    const integrantes = [
        { nome: "Daniel", imagem: Daniel, github: "https://github.com/ren-angel" },
        { nome: "Hiago", imagem: Hiago, github: "https://github.com/HyRss" },
        { nome: "Lucas", imagem: Lucas, github: "https://github.com/LucasVasconcelosDev" },
        { nome: "Anderson", imagem: Anderson, github: "https://github.com/andersonbs96" },
    ];

    return (
        <div className="container">
            <div className="navbar-container">
                <Menu />
            </div>
            <Background />
            <div className="integrantes">
                <h3>Integrantes</h3>
                <div className="icones">
                    {integrantes.map((integrante, index) => (
                        <div className='integrante' key={index}>
                            <img className='imagem' src={integrante.imagem} alt={`Ícone do ${integrante.nome}`} />
                            <p className='nome'>{integrante.nome}</p>
                            <a className='github-link' href={integrante.github} target="_blank" rel="noopener noreferrer">
                                <img className='github-icon' src={GitHubIcon} alt={`GitHub do ${integrante.nome}`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contact;
