import React, { useCallback } from "react";
import { Engine } from "tsparticles-engine";
import ReactParticles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { Box } from "@mui/material";

/**
 * Экран с частицами
 */
const Particles = (): React.ReactElement => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100%", zIndex: -1 }} data-testid='particles'>
      <ReactParticles
        id='tsparticles'
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
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
        }}
      />
    </Box>
  );
};

export default Particles;
