import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { 
  Zap, 
  Leaf, 
  Users, 
  Globe, 
  Award, 
  Target,
  TrendingUp,
  Shield,
  Heart,
  ChevronRight
} from "lucide-react"

const About = () => {
  const stats = [
    { number: "50+", label: "Projects Completed", icon: <Award className="h-6 w-6" /> },
    { number: "15+", label: "Countries Served", icon: <Globe className="h-6 w-6" /> },
    { number: "100K+", label: "Lives Impacted", icon: <Users className="h-6 w-6" /> },
    { number: "85%", label: "Energy Efficiency", icon: <Zap className="h-6 w-6" /> }
  ]

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainability First",
      description: "Every solution we create prioritizes environmental impact and long-term sustainability for our planet and future generations."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Innovation Driven",
      description: "We leverage cutting-edge technology and innovative thinking to solve complex transportation and energy challenges across Africa."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Reliability & Trust",
      description: "Our commitment to delivering reliable, secure, and trustworthy solutions builds lasting partnerships with our clients and communities."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Community Impact",
      description: "We believe in creating solutions that not only advance technology but also uplift communities and improve quality of life."
    }
  ]

  const journey = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Ticketer Transportations was established with a vision to revolutionize Africa's transportation landscape."
    },
    {
      year: "2024",
      title: "First Major Project",
      description: "Successfully launched our first sustainable transport solution, impacting over 10,000 daily commuters."
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Introduced advanced AI-driven systems for intelligent fleet management and energy optimization."
    },
    {
      year: "2025",
      title: "Continental Expansion",
      description: "Expanding operations across Africa with partnerships in 15+ countries and growing."
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="md:text-5xl text-4xl font-bold text-gray-900 mb-6">About Ticketer Transportations</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We are pioneering the future of sustainable transportation in Africa through innovative energy solutions, 
            smart mobility systems, and transformative technology that connects communities while protecting our environment.
          </p>
        </motion.div>

        {/* Stats Section - Commented out for startup phase */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="flex justify-center mb-4 text-green-600">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        */}

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Ticketer Transportations was founded with a bold vision to transform Africa's transportation landscape, 
                addressing the continent's unique mobility challenges while unlocking its immense potential for sustainable development.
              </p>
              <p>
                As a startup, we recognized that traditional transportation models are inadequate for Africa's rapid 
                urbanization and environmental goals. We're building innovative solutions that bridge the gap 
                between cutting-edge technology and practical, accessible transport systems.
              </p>
              <p>
                We're committed to becoming a key player in Africa's clean mobility revolution, working on everything 
                from AI-powered fleet management systems to comprehensive sustainable energy solutions that will power 
                the future of transportation across the continent.
              </p>
            </div>
            <Button 
              className="mt-8 bg-green-600 hover:bg-green-700"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Us Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 h-full">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Our Impact Areas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-900 mb-1">Smart Energy</h5>
                  <p className="text-sm text-gray-600">Intelligent power management systems</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-900 mb-1">Clean Transport</h5>
                  <p className="text-sm text-gray-600">Zero-emission mobility solutions</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-900 mb-1">Community</h5>
                  <p className="text-sm text-gray-600">Empowering local communities</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-900 mb-1">Global Reach</h5>
                  <p className="text-sm text-gray-600">Connecting Africa to the world</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Journey - Commented out for startup phase */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
            <div className="space-y-8">
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-green-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        */}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Transportation Together?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join us in shaping the future of sustainable mobility across Africa and beyond.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Us Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
