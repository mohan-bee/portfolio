import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <MainContainer>
      <h1>Contact</h1>
      <ContactContainer>
        <DoodleImage
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
          src="https://opendoodles.s3-us-west-1.amazonaws.com/reading.svg"
          alt="Doodle"
        />
       <ContactInfo>
        <p>Email: mohn08052006@gmail.com</p>
        <a href="https://www.linkedin.com/in/mohan-undefined-88b655318/">Linked In</a>
       </ContactInfo>
      </ContactContainer>
    </MainContainer>
  );
};

export default Contact;

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  
  h1 {
    font-size: 3rem;
  }
`;

const ContactContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const DoodleImage = styled(motion.img)`
  width: 800px;
  max-width: 100%;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  font-size: 1.5rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  p {
      margin: 10px 0;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  a {
    color: #ff7eb3;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #ff4f88;
    }
  }
`;
