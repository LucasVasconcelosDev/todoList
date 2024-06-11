import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.


// Esses textos de cima são da documentação do coisinha (https://github.com/tsparticles/react). Instala as dependências @tsparticles/react e @tsparticles/slim com o npm install (por mais que nesta pastas eles já estão instalados)
import '../../styles/particles.css';

function Background() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
        background: {
            color: {
                value: "#fff", 
            },
        },
        fpsLimit: 120, // Mais baixo que isso fica meio travando, mas vê ai o que você prefere
    //     interactivity: { Isso daqui é aqueles negócios de clicar e aparecer, da hover e eles fugir do mouse, etc. Faz ai o que você quiser com ou deixa sem se quiser deixar só eles voando no fundo mesmo
    //         events: {
    //             onClick: {
    //                 enable: true,
    //                 mode: "push",
    //             },
    //             onHover: {
    //                 enable: true,
    //                 mode: "repulse",
    //             },
    //         },
    //     modes: { Isso são as configurações das interações acima
    //         push: {
    //             quantity: 4,
    //         },
    //         repulse: {
    //             distance: 200,
    //             duration: 0.1,
    //         },
    //     },
    //   },
        particles: {
            color: {
                value: ["#fff", "#ff0000", "#00ff00", "#0000ff"], // Array de cores para as partículas serem coloridas, mude para as cores que desejar (recomendo cores pastéis)
            },
            // links: { Isso são aquelas linhas lá, eu tirei porque acho que não combina mas você que sabe
            //     color: "#ffffff",
            //     distance: 150,
            //     enable: true,
            //     opacity: 0.5,
            //     width: 1,
            // },
            // Mude as configurações da partículas pro que achar melhor, velocidade, direção que se movem, tamanho, quantidade de partículas, etc
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2, // Altere a velocidade para o que achar que ficar melhor (eu gostei de 2)
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  // return <></>; Isso veio no código da documentção, não sei o que é, mas eu comentei e não mudou nada então né KKKKKK
};

export default Background;