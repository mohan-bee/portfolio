import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <MainContainer>
    <h1 style={{textAlign: 'center'}}>About</h1>
    <AboutContainer>
      <DoodleImage
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
        src="https://opendoodles.s3-us-west-1.amazonaws.com/dancing.svg"
        alt="Doodle"
        />
      <Content>
        <h2>Who Am I?</h2>
        <p>
        I am a Full Stack Web Developer with a fast-learning and growth mindset. Passionate about Game Development and Web Security, I strive to create efficient and scalable solutions while continuously improving my skills.
        </p>
      </Content>
    </AboutContainer>
        </MainContainer>
  );
};

export default About;

const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    h1{
        font-size: 4rem;
    }
`
const AboutContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  position: relative;
`;

const DoodleImage = styled(motion.img)`
  width: 800px;
  margin-bottom: 20px;
`;

const Content = styled(motion.div)`
  max-width: 600px;
  font-size: 1.5rem;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  p{
    font-family: cursive;
  }
`;
