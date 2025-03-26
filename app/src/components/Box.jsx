import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const COLOR_PALETTE = {
    softSageGreen: "#98B4AA",
    dustyRose: "#D4A6A6",
    lavenderSlate: "#8C8CA3",
    warmTerracotta: "#E2725B",
    mutedIndigo: "#6B5B95"
  };

const Box = ({ 
  name, 
  explode, 
  setExplode, 
  bg = COLOR_PALETTE.softSageGreen 
}) => {
    const handleClick = () => {
        if (name === "TheHomieLife") {
          window.location.href = "https://thehomie.life";
        }
        else if(name == "Kepom"){
            window.location.href = "https://kepom.vercel.app";
        }
        else if(name == "RantPlus"){
            window.location.href = "https://rant-plus.vercel.app";
        }
        else if(name == "StickyNotes"){
            window.location.href = "https://mohan-bee.github.io/Sticky-Notes/";
        }
        else if(name == "Kaasu"){
            window.location.href = "https://github.com/kalviumcommunity/S65_Mohan_Capstone_Kaasu";
        }
         else {
          setExplode(true);
        }
      };
  return (
    <Container onClick={handleClick}>
      {!explode ? (
        <BoxContainer
          style={{ backgroundColor: bg }}
          onClick={() => setExplode(true)}
        >
          {name}
        </BoxContainer>
      ) : (
        <ParticleContainer>
          {[...Array(70)].map((_, i) => (
            <Particle
              key={i}
              style={{ 
                backgroundColor: bg,
                filter: `brightness(${1 + Math.random() * 0.5})` 
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: 0,
                scale: [1, (Math.random() - 0.5) * 10],
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 2000,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </ParticleContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 4;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ParticleContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export default Box;