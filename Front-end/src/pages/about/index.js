import React from 'react';
import Menu from '../../components/NavBar/Navbar';
import Background from '../../components/particles/particles';
import '../../styles/about.css';

function About() {
    return (
        <div className="about-container">
            <Menu />
            <Background className="background" />

            <div className="about">
                <div className="header">
                    <h2>Lista de tarefas (To-Do List)</h2>
                </div>
                <div className="missao">
                    <h3>Missão</h3>
                    <p>
                        Nossa missão é proporcionar uma experiência de organização e produtividade através de uma lista de tarefas simples e intuitiva, ajudando as pessoas a alcançarem seus objetivos de forma mais eficiente.
                    </p>
                </div>
                <div className="visao">
                    <h3>Visão</h3>
                    <p>
                        Nossa visão é tornar-se a ferramenta de gestão de tarefas preferida, sendo reconhecida pela sua facilidade de uso e impacto positivo na vida das pessoas, tanto pessoal quanto profissionalmente.
                    </p>
                </div>
                <div className="agradecimentos">
                    <h3>Agradecimentos Finais</h3>
                    <p>
                        Então, da próxima vez que se sentir sobrecarregado pelas tarefas do dia-a-dia, experimente fazer
                        uma lista de tarefas. Você ficará surpreso com o quanto isso pode simplificar sua vida.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
