import { motion, AnimatePresence, useInView } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import splash from '/splash.png';

const Hero = () => {
  const name = 'Mohanraj';
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <HeroContainer>
      <ContentWrapper>
        <div className="info">
          <Title>
            <span>I am</span>
            <h1 ref={ref}>
              <AnimatePresence>
                {name.split('').map((char, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    exit="hidden"
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.div>
                ))}
              </AnimatePresence>
              <Splash
                initial={{ x: 10, y: 0 }}
                animate={{ x: 0, y: 10 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror' }}
              >
                <img className="splash" src={splash} alt="splash" />
              </Splash>
            </h1>
          </Title>
          <Description>A Full Stack Developer</Description>
        </div>
        <div className="image">
          <img
            src="https://opendoodles.s3-us-west-1.amazonaws.com/sitting-reading.svg"
            alt="doodle"
          />
        </div>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  gap: 2rem;

  .image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .image {
      margin-top: 2rem;
    }
  }
`;

const Splash = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 94%;
  width: 20vw;
  max-width: 150px;
  
  .splash {
    width: 100%;
    transform: rotateZ(90deg);
  }

  @media screen and (max-width: 768px) {
    top: 0;
    left: 90%;
  }
`;

const Title = styled(motion.div)`
  position: relative;
  font-size: 5rem;
  font-weight: bolder;
  
  span {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: block;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    
    span {
      font-size: 1.5rem;
    }
  }
`;

const Description = styled(motion.div)`
  font-size: 2rem;
  font-weight: 500;
  font-family: sans-serif;
  padding-left: 10px;
  color: #111111;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;