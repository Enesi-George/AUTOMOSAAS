import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import VisionMission from './components/VisionMission'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import ContactFooter from './components/ContactFooter'
import BackToTop from './components/BackToTop'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <WhyChooseUs />
      <ContactFooter />
      <BackToTop />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
