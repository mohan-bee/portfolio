import React, { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Github from './components/Github'
import ReactGA from "react-ga4";
const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-PGZ5V8X0HX");
    ReactGA.send("pageview"); 
  }, []);
  return (
    <div>
      <Hero/>
      <About />
      <Projects />
      <Github />
      <Contact />

    </div>
  )
}

export default App