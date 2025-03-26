import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import splash from '/splash.png'

const Hero = () => {
  return (
    <HeroContainer>
        <div className="info">
    <Title> <span>I am</span> <h1>
        Mohanraj 
        <Splash
        initial={{ x: 10, y: 0 }}
        animate={{ x: 0, y: 10 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror' }}
        src={splash}
        alt="splash"
    >
    <img className='splash' src={splash} alt="" />
    </Splash>  </h1>

     </Title>
    <Description>A Full Stack Developer</Description>
    
        </div>

    <div className="image">
        <img src="https://opendoodles.s3-us-west-1.amazonaws.com/sitting-reading.svg" alt="" sizes="" srcset="" />
    </div>

    </HeroContainer>
  )
}

export default Hero

const HeroContainer = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    position: relative;
    align-items: center;
    padding: 0 10px;
    height: 100vh;
    .image{
        img{
            width: 800px;
        }
    }
    .splash {
    position: absolute;
    width: 20vw;
    max-width: 150px;
    transform:rotateZ(90deg);
  }
`
const Splash = styled(motion.div)`
    background-color: red;
    position: absolute;
    top: 38%;
    left: 45%;
`
const Title = styled(motion.div)`
    align-items: center;
    font-size: 5rem;
    font-weight: bolder;
    span {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

`

const Description = styled(motion.div)`
    font-size: 2rem;
    font-weight: 500;
    font-family: sans-serif;
    padding-left: 10px;
    color: #111111;

`