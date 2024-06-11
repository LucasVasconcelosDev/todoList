import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/NavBar/Navbar';
import Background from '../../components/particles/particles';
import GarotaLendo from '../../assets/Garota lendo.jpg';
import '../../styles/home.css';

function Home() {
    return (
        <div className="home-container">
            <Menu />
            <Background />
            <div className="content-container">
                <div className="content">
                    <div className="text-container">
                        <h2>Gerenciamento de Tarefas<br /> & <br /> To-Do List</h2>
                        <p>Essa ferramenta foi projetada<br /> para tornar a gestão de suas tarefas<br />mais conveniente e eficaz,<br /> especialmente em seus projetos.</p>
                        <Link to='/register'>
                            <button className='home-button'>Vamos começar</button>
                        </Link>
                        <Link to='/login'>
                            <button className='home-button'>Entrar</button>
                        </Link>
                    </div>
                    <div className='garota'>
                        <img src={GarotaLendo} alt="Garota lendo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
