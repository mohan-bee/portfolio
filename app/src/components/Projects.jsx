import React, { useState } from 'react';
import Box from './Box';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const COLOR_PALETTE = {
    softSageGreen: "#98B4AA",
    dustyRose: "#D4A6A6",
    lavenderSlate: "#8C8CA3",
    warmTerracotta: "#E2725B",
    mutedIndigo: "#6B5B95"
  };

const Projects = () => {
  const [explode, setExplode] = useState(false);

  return (
    <MainContainer>
      <h1>Projects</h1>
      <div>
        {explode && (
          <BG
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
            }}
            transition={{ duration: 2 }}
          ></BG>
        )}
        {!explode && <BG></BG>}
        <Boxes>
          <Box 
            explode={explode} 
            setExplode={setExplode} 
            name={"Kepom"} 
            bg={COLOR_PALETTE.softSageGreen}
          />
          <Box 
            explode={explode} 
            setExplode={setExplode} 
            name={"RantPlus"} 
            bg={COLOR_PALETTE.dustyRose}
          />
          <Box 
            explode={explode} 
            setExplode={setExplode} 
            name={"TheHomieLife"} 
            bg={COLOR_PALETTE.lavenderSlate}
          />
          <Box 
            explode={explode} 
            setExplode={setExplode} 
            name={"StickyNotes"} 
            bg={COLOR_PALETTE.warmTerracotta}
          />
          <Box 
            explode={explode} 
            setExplode={setExplode} 
            name={"Kaasu"} 
            bg={COLOR_PALETTE.mutedIndigo}
          />
        </Boxes>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled(motion.div)`
  text-align: center;

  h1 {
    font-size: 4rem;
    width: 100vw;
    background-color: black;
    color: white;
    padding: 20px 0;
  }
`;

const BG = styled(motion.div)`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const Boxes = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export default Projects;