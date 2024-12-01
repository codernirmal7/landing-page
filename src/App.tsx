import React from 'react'
import { Hero } from './components/Hero'
import About from './components/About'
import NavBar from './components/Navbar'
import Features from './components/Features'
import FloatingImage from './components/Story'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <NavBar/>
      <Hero/>
     <About/>
     <Features/>
     <FloatingImage/>
    </main>
  )
}

export default App