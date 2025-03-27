import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const cards = [
  {
    url: "/kaasu.jpg.webp",
    desc: "Currently Working on",
    title: "Kaasu",
    link: 'https://github.com/kalviumcommunity/S65_Mohan_Capstone_Kaasu',
    id: 1,
  },
  {
    url: "/kepom.jpg",
    title: "Kepom",
    link: 'https://kepom.vercel.app',
    id: 2,
  },
  {
    url: "/rantplus.jpg",
    title: "Rant Plus",
    link: 'https://rant-plus.vercel.app',
    id: 3,
  },
  {
    url: "/stickynotes.png",
    title: "Sticky Notes",
    link: 'https://github.com/mohan-bee/Sticky-Notes',
    id: 4,
  },
  {
    url: "/thehomielife.png",
    title: "The Homie Life",
    link: 'https://www.thehomie.life',
    id: 5,
  }
];

const Projects = () => {
  return (
    <PageContainer>
      <ScrollText>Projects</ScrollText>
      <HorizontalScrollCarousel />
      <ScrollText>Github</ScrollText>
    </PageContainer>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <Section ref={targetRef}>
      <StickyContainer>
        <Carousel style={{ x }}>
          {cards.map((card) => (
            <a href={card.link} key={card.id} target="__self">
            <Card >
              <CardImage style={{ backgroundImage: `url(${card.url})` }} />
              <CardTitle>{card.title} <p>{card.desc}</p> </CardTitle>
              {/* <p>{card.desc}</p> */}
            </Card>
            </a>
          ))}
        </Carousel>
      </StickyContainer>
    </Section>
  );
};

export default Projects;

// Styled Components

const PageContainer = styled.div`
  /* background: #262626; */
`;

const ScrollText = styled.div`
  display: flex;
  height: 5rem;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 600;
`;

const Section = styled.section`
  position: relative;
  height: 300vh;
  background: #1a1a1a;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  height: 100vh;
  align-items: center;
  overflow: hidden;
`;

const Carousel = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const Card = styled.div`
  position: relative;
  height: 450px;
  width: 450px;
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  overflow: hidden;
  background: #ddd;
  border-radius: 10px;
`;

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.p`
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  z-index: 1;
  color: #000;
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  backdrop-filter: blur(13px);
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  p{
    font-size: 1rem;
    font-weight: 100;
    text-transform: lowercase;
    color: #001a54;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
