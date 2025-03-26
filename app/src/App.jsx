import React from 'react'
import Box from './components/Box'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Github from './components/Github'

const App = () => {
  return (
    <div>
      <Hero/>
      <About />
      <Projects />
      <Github />
      <Contact />
      {/* <Box />  */}
    </div>
  )
}

export default App