
import './index.css'
import About from './components/About'
import BackToTop from './components/BackToTop'
import ContactFooter from './components/ContactFooter'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import VisionMission from './components/VisionMission'
import WhyChooseUs from './components/WhyChooseUs'

const App = () => {
  return (
    <div className="w-full">
    <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <WhyChooseUs />
      <ContactFooter />
      {/* <BackToTop /> */}
    </div>
  )
}

export default App
